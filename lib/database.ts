import { promises as fs } from "node:fs";
import path from "node:path";
import { formatISO, subDays, subHours } from "date-fns";
import type {
  DataAccessAlert,
  DataAccessLogEntry,
  EmploymentProfile,
  PaidEntitlement,
  StoredDatabase,
  UpdateEmploymentProfileInput,
  UserMonitoringRecord,
} from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "salary-monitor-db.json");

const DEFAULT_DATABASE: StoredDatabase = {
  users: {},
  entitlements: {},
};

const REQUESTERS = [
  {
    name: "Rocket Mortgage",
    type: "LENDER",
    purpose: "Pre-approval income verification",
    permissiblePurpose: "FCRA section 604(a)(3)(A)",
  },
  {
    name: "Avalon Property Management",
    type: "LANDLORD",
    purpose: "Rental application verification",
    permissiblePurpose: "Tenant screening with written authorization",
  },
  {
    name: "Sterling Background Services",
    type: "BACKGROUND_CHECK",
    purpose: "Employment screening",
    permissiblePurpose: "Background check with candidate consent",
  },
  {
    name: "Great Lakes Credit Union",
    type: "LENDER",
    purpose: "Loan underwriting verification",
    permissiblePurpose: "Credit extension review",
  },
  {
    name: "SafeDrive Insurance",
    type: "INSURANCE",
    purpose: "Coverage eligibility review",
    permissiblePurpose: "Insurance underwriting",
  },
  {
    name: "Northstar Talent",
    type: "EMPLOYER",
    purpose: "Offer-stage compensation validation",
    permissiblePurpose: "Employment decision with disclosure",
  },
] as const;

const FIELD_SETS = [
  ["Current employer", "Employment status", "Annualized salary"],
  ["Employment tenure", "Pay frequency", "Most recent pay date"],
  ["Historical employers", "Base salary history", "Bonus history"],
  ["Employment status", "Department", "Original hire date"],
];

function sanitizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function hashString(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

async function ensureDatabaseFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify(DEFAULT_DATABASE, null, 2), "utf8");
  }
}

async function readDatabase(): Promise<StoredDatabase> {
  await ensureDatabaseFile();
  const raw = await fs.readFile(DB_PATH, "utf8");

  try {
    const parsed = JSON.parse(raw) as StoredDatabase;
    return {
      users: parsed.users ?? {},
      entitlements: parsed.entitlements ?? {},
    };
  } catch {
    return DEFAULT_DATABASE;
  }
}

async function writeDatabase(db: StoredDatabase) {
  await ensureDatabaseFile();
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

function buildDefaultProfile(email: string): EmploymentProfile {
  const localPart = email.split("@")[0] ?? "Member";
  const normalizedName = localPart
    .replace(/[._-]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

  return {
    fullName: normalizedName,
    primaryEmployer: "Connect your employer profile",
    workEmail: email,
    monitorSince: formatISO(new Date(), { representation: "date" }),
    employmentTypes: ["Full-time"],
    riskLevel: "medium",
    isProfileConnected: false,
  };
}

function buildMockAccessLogs(email: string): DataAccessLogEntry[] {
  const seed = hashString(email);
  const total = 9;
  const logs: DataAccessLogEntry[] = [];

  for (let index = 0; index < total; index += 1) {
    const requester = REQUESTERS[(seed + index) % REQUESTERS.length];
    const fields = FIELD_SETS[(seed + index) % FIELD_SETS.length];
    const happenedAt = subHours(subDays(new Date(), index * 2), (seed + index * 7) % 16);
    const wasDenied = index % 4 === 0;

    logs.push({
      id: `log_${seed}_${index + 1}`,
      requestedAt: happenedAt.toISOString(),
      requesterName: requester.name,
      requesterType: requester.type,
      purpose: requester.purpose,
      permissiblePurpose: requester.permissiblePurpose,
      outcome: wasDenied ? "denied" : "approved",
      fieldsAccessed: fields,
      ipAddress: `198.51.100.${((seed + index) % 200) + 20}`,
      location: ["New York, NY", "Austin, TX", "Chicago, IL", "Seattle, WA"][(seed + index) % 4],
    });
  }

  return logs;
}

function buildAlertsFromLogs(logs: DataAccessLogEntry[]): DataAccessAlert[] {
  return logs
    .slice(0, 5)
    .map((log, index) => {
      const severity: DataAccessAlert["severity"] =
        log.outcome === "denied" ? "high" : index % 2 === 0 ? "medium" : "low";

      return {
        id: `alert_${log.id}`,
        createdAt: log.requestedAt,
        title:
          log.outcome === "denied"
            ? "Potential unauthorized salary access blocked"
            : "Employment data accessed",
        message:
          log.outcome === "denied"
            ? `${log.requesterName} attempted to access your Work Number profile but the request was denied.`
            : `${log.requesterName} successfully accessed your salary and employment data for ${log.purpose.toLowerCase()}.`,
        severity,
        acknowledged: severity === "low",
        accessLogId: log.id,
      };
    })
    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
}

async function getOrCreateRecord(email: string): Promise<UserMonitoringRecord> {
  const key = sanitizeEmail(email);
  const db = await readDatabase();

  if (db.users[key]) {
    return db.users[key];
  }

  const accessLogs = buildMockAccessLogs(key);
  const alerts = buildAlertsFromLogs(accessLogs);
  const employmentProfile = buildDefaultProfile(key);

  db.users[key] = {
    employmentProfile,
    alerts,
    accessLogs,
  };

  await writeDatabase(db);
  return db.users[key];
}

export async function getDashboardData(email: string) {
  return getOrCreateRecord(email);
}

export async function listAlerts(email: string): Promise<DataAccessAlert[]> {
  const record = await getOrCreateRecord(email);
  return [...record.alerts].sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
}

export async function acknowledgeAlert(email: string, alertId: string) {
  const key = sanitizeEmail(email);
  const db = await readDatabase();
  const record = db.users[key] ?? (await getOrCreateRecord(key));

  const nextAlerts = record.alerts.map((alert) =>
    alert.id === alertId ? { ...alert, acknowledged: true } : alert,
  );

  db.users[key] = {
    ...record,
    alerts: nextAlerts,
  };

  await writeDatabase(db);

  return db.users[key].alerts.find((alert) => alert.id === alertId) ?? null;
}

export async function updateEmploymentProfile(email: string, input: UpdateEmploymentProfileInput) {
  const key = sanitizeEmail(email);
  const db = await readDatabase();
  const record = db.users[key] ?? (await getOrCreateRecord(key));

  const hasContractor = input.employmentTypes.some((entry) =>
    entry.toLowerCase().includes("contract"),
  );

  db.users[key] = {
    ...record,
    employmentProfile: {
      ...record.employmentProfile,
      primaryEmployer: input.primaryEmployer,
      workEmail: input.workEmail,
      employmentTypes: input.employmentTypes,
      riskLevel: hasContractor ? "high" : "medium",
      isProfileConnected: true,
    },
  };

  await writeDatabase(db);
  return db.users[key].employmentProfile;
}

export async function setPaidEntitlement(email: string, entitlement: Partial<PaidEntitlement> = {}) {
  const key = sanitizeEmail(email);
  const db = await readDatabase();

  db.entitlements[key] = {
    active: true,
    source: entitlement.source ?? "stripe_payment_link",
    updatedAt: new Date().toISOString(),
    lastEventId: entitlement.lastEventId,
  };

  await writeDatabase(db);
  return db.entitlements[key];
}

export async function hasPaidEntitlement(email: string) {
  const key = sanitizeEmail(email);
  const db = await readDatabase();
  return Boolean(db.entitlements[key]?.active);
}

export async function getEntitlement(email: string) {
  const key = sanitizeEmail(email);
  const db = await readDatabase();
  return db.entitlements[key] ?? null;
}
