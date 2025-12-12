export type PetType = 'Dog' | 'Cat' | 'Bird' | 'Other' | 'Unknown';

export interface PetData {
  id: string;
  unitNo: string;
  tower: string;
  petName: string;
  petType: PetType;
  breed: string;
  sex: 'M' | 'F' | '-';
  weightKg: number;
  vaccineExpire: string; // YYYY-MM-DD
  ownerName: string;
  tenantName: string;
  remark: string;
}

export enum ComplianceStatus {
  COMPLIANT = 'Compliant',
  NON_COMPLIANT_LIMIT = 'Non-Compliant (Over Limit/Weight)',
  NON_COMPLIANT_VACCINE = 'Non-Compliant (Vaccine Expired)',
  NON_COMPLIANT_DOCS = 'Non-Compliant (Documents)',
  PENDING_PDF = 'Pending (Missing PDF)',
  PENDING_VERIFICATION = 'Pending Verification',
  UNKNOWN = 'Unknown'
}

export interface EnrichedPetData extends PetData {
  status: ComplianceStatus;
  isPdfSubmitted: boolean;
}