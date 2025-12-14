export type PetType = 'Dog' | 'Cat' | 'Bird' | 'Rabbit' | 'Other' | 'Unknown';

export interface PetData {
  id: string;
  unitNo: string;
  tower: string; // 'Building' in CSV
  floor: string;
  ownerName: string;
  residentType: 'Owner' | 'Tenant' | '-';
  petName: string;
  petType: string; // Changed to string to accommodate specific types if needed, or mapped to PetType
  breed: string;
  sex: 'M' | 'F' | '-';
  dob: string;
  ageYears: number;
  weightKg: number;
  vaccineLastDate: string;
  vaccineExpire: string; // YYYY-MM-DD
  vaccineStatus: string;
  documentsComplete: boolean;
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