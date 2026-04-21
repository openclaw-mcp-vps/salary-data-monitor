export type AccessRequesterType =
  | "LENDER"
  | "LANDLORD"
  | "BACKGROUND_CHECK"
  | "EMPLOYER"
  | "INSURANCE"
  | "OTHER";

export type AlertSeverity = "low" | "medium" | "high";

export interface DataAccessLogEntry {
  id: string;
  requestedAt: string;
  requesterName: string;
  requesterType: AccessRequesterType;
  purpose: string;
  permissiblePurpose: string;
  outcome: "approved" | "denied";
  fieldsAccessed: string[];
  ipAddress: string;
  location: string;
}

export interface DataAccessAlert {
  id: string;
  createdAt: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  acknowledged: boolean;
  accessLogId: string;
}

export interface EmploymentProfile {
  fullName: string;
  primaryEmployer: string;
  workEmail: string;
  monitorSince: string;
  employmentTypes: string[];
  riskLevel: "low" | "medium" | "high";
  isProfileConnected: boolean;
}

export interface UserMonitoringRecord {
  employmentProfile: EmploymentProfile;
  alerts: DataAccessAlert[];
  accessLogs: DataAccessLogEntry[];
}

export interface PaidEntitlement {
  active: boolean;
  source: string;
  updatedAt: string;
  lastEventId?: string;
}

export interface StoredDatabase {
  users: Record<string, UserMonitoringRecord>;
  entitlements: Record<string, PaidEntitlement>;
}

export interface UpdateEmploymentProfileInput {
  primaryEmployer: string;
  workEmail: string;
  employmentTypes: string[];
}
