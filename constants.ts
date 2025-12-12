import { PetData } from './types';

// All units in the master database are considered to have "submitted" something (either fully verified or pending review)
export const PDF_VERIFIED_UNITS = [
  "1559/379", "1559/454", "1559/81", "1559/127", "1559/87", "1559/415", "1559/450", "1559/362", 
  "1559/391", "1559/414", "1559/407", "1559/402", "1559/382", 
  "1559/233", "1559/32", "1559/5", "1559/8", "1559/14", "1559/45", "1559/48", "1559/51", 
  "1559/54", "1559/58", "1559/59", "1559/60", "1559/64", "1559/67", "1559/68", "1559/70", 
  "1559/85", "1559/104", "1559/123", "1559/126", "1559/138", "1559/147", "1559/150", 
  "1559/156", "1559/163", "1559/166", "1559/174", "1559/181", "1559/182", "1559/187", 
  "1559/210", "1559/212", "1559/225", "1559/240", "1559/259", "1559/423"
];

// Master Database derived from the Python script output
export const MOCK_PET_DB: PetData[] = [
    // --- Verified Group ---
    // 1559/379 - 4 Cats
    { id: 'v1-1', unitNo: "1559/379", tower: "-", petName: "Luna", petType: "Cat", breed: "Thai Cat", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "Resident", tenantName: "-", remark: "Over limit (4 cats), Mixed vaccine status" },
    { id: 'v1-2', unitNo: "1559/379", tower: "-", petName: "Scaramouche", petType: "Cat", breed: "Thai Cat", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "Resident", tenantName: "-", remark: "Over limit (4 cats)" },
    { id: 'v1-3', unitNo: "1559/379", tower: "-", petName: "Galileo", petType: "Cat", breed: "Thai Cat", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "Resident", tenantName: "-", remark: "Over limit (4 cats)" },
    { id: 'v1-4', unitNo: "1559/379", tower: "-", petName: "Fandango", petType: "Cat", breed: "Thai Cat", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "Resident", tenantName: "-", remark: "Over limit (4 cats)" },
    
    // Other Verified
    { id: 'v2', unitNo: "1559/454", tower: "A", petName: "JB", petType: "Dog", breed: "Beagle", sex: "-", weightKg: 0, vaccineExpire: "2026-06-01", ownerName: "Resident", tenantName: "-", remark: "Valid until Jun 2026" },
    { id: 'v3', unitNo: "1559/81", tower: "-", petName: "Sparky", petType: "Dog", breed: "Lhasa Apso", sex: "-", weightKg: 0, vaccineExpire: "2025-12-01", ownerName: "Resident", tenantName: "-", remark: "Valid until Dec 2025" },
    { id: 'v4', unitNo: "1559/127", tower: "A", petName: "Ped", petType: "Dog", breed: "Pomeranian", sex: "-", weightKg: 0, vaccineExpire: "2025-07-01", ownerName: "Resident", tenantName: "-", remark: "Vaccine expired Jul 2025" },
    { id: 'v5', unitNo: "1559/87", tower: "B", petName: "Mei Mei", petType: "Dog", breed: "Poodle", sex: "-", weightKg: 0, vaccineExpire: "2025-02-01", ownerName: "Resident", tenantName: "-", remark: "Vaccine expired Feb 2025" },
    { id: 'v6', unitNo: "1559/415", tower: "-", petName: "Zuo Zuo", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "2025-02-01", ownerName: "Resident", tenantName: "-", remark: "Vaccine expired Feb 2025" },
    { id: 'v7', unitNo: "1559/450", tower: "-", petName: "Chao", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "2025-05-01", ownerName: "Resident", tenantName: "-", remark: "Vaccine expired May 2025" },
    { id: 'v8', unitNo: "1559/362", tower: "-", petName: "Tinkle", petType: "Cat", breed: "Thai Cat", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "Resident", tenantName: "-", remark: "Vaccine expired & ID Mismatch" },
    { id: 'v9', unitNo: "1559/391", tower: "-", petName: "Sambo", petType: "Dog", breed: "Chihuahua", sex: "-", weightKg: 0, vaccineExpire: "2025-07-01", ownerName: "Resident", tenantName: "-", remark: "Vaccine expired Jul 2025" },
    { id: 'v10', unitNo: "1559/414", tower: "B", petName: "Sam", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "2025-09-01", ownerName: "Thamnoon", tenantName: "-", remark: "Vaccine expired Sep 2025" },
    { id: 'v11', unitNo: "1559/407", tower: "-", petName: "Stevie", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "2025-03-01", ownerName: "Resident", tenantName: "-", remark: "Vaccine expired Mar 2025" },
    { id: 'v12', unitNo: "1559/402", tower: "B", petName: "Barby", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "2024-08-01", ownerName: "-", tenantName: "Bhanu", remark: "Vaccine expired Aug 2024" },
    { id: 'v13', unitNo: "1559/382", tower: "A", petName: "Nacho", petType: "Dog", breed: "Yorkshire", sex: "M", weightKg: 2.5, vaccineExpire: "2024-12-01", ownerName: "Montri", tenantName: "Robert", remark: "Vaccine expired Dec 2024" },

    // --- Pending Verification Group (Set B-F) ---
    { id: 'p1', unitNo: "1559/233", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: Submitted 2 files (233, 233-1). Check duplicates." },
    { id: 'p2', unitNo: "1559/32", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: Submitted 2 files (32(2), 32(3)). Check duplicates." },
    { id: 'p3', unitNo: "1559/5", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 5 (2).pdf" },
    { id: 'p4', unitNo: "1559/8", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 8 (2).pdf" },
    { id: 'p5', unitNo: "1559/14", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 14 (3).pdf" },
    { id: 'p6', unitNo: "1559/45", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 45 (2).pdf" },
    { id: 'p7', unitNo: "1559/48", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 48 (2).pdf" },
    { id: 'p8', unitNo: "1559/51", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 51 (2).pdf" },
    { id: 'p9', unitNo: "1559/54", tower: "A", petName: "เมฆ (Pending)", petType: "Dog", breed: "Pomeranian", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "นิตยา", tenantName: "-", remark: "Pending Review: File 54 (3).pdf" },
    { id: 'p10', unitNo: "1559/58", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 58 (2).pdf" },
    { id: 'p11', unitNo: "1559/59", tower: "A", petName: "Tank (Pending)", petType: "Bird", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "ปกาศิต", tenantName: "-", remark: "Pending Review: File 59 (2).pdf" },
    { id: 'p12', unitNo: "1559/60", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 60.pdf" },
    { id: 'p13', unitNo: "1559/64", tower: "A", petName: "Dog-01 (Pending)", petType: "Dog", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "Spatchira", tenantName: "-", remark: "Pending Review: File 64.pdf" },
    { id: 'p14', unitNo: "1559/67", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 67.pdf" },
    { id: 'p15', unitNo: "1559/68", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 68.pdf" },
    { id: 'p16', unitNo: "1559/70", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 70.pdf" },
    { id: 'p17', unitNo: "1559/85", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 85.pdf" },
    { id: 'p18', unitNo: "1559/104", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 104.pdf" },
    { id: 'p19', unitNo: "1559/123", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 123.pdf" },
    { id: 'p20', unitNo: "1559/126", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 126.pdf" },
    { id: 'p21', unitNo: "1559/138", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 138.pdf" },
    { id: 'p22', unitNo: "1559/147", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 147.pdf" },
    { id: 'p23', unitNo: "1559/150", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 150.pdf" },
    { id: 'p24', unitNo: "1559/156", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 156.pdf" },
    { id: 'p25', unitNo: "1559/163", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 163.pdf" },
    { id: 'p26', unitNo: "1559/166", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 166.pdf" },
    { id: 'p27', unitNo: "1559/174", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 174.pdf" },
    { id: 'p28', unitNo: "1559/181", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 181.pdf" },
    { id: 'p29', unitNo: "1559/182", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 182.pdf" },
    { id: 'p30', unitNo: "1559/187", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 187.pdf" },
    { id: 'p31', unitNo: "1559/210", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 210.pdf" },
    { id: 'p32', unitNo: "1559/212", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 212.pdf" },
    { id: 'p33', unitNo: "1559/225", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 225.pdf" },
    { id: 'p34', unitNo: "1559/240", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 240.pdf" },
    { id: 'p35', unitNo: "1559/259", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 259.pdf" },
    { id: 'p36', unitNo: "1559/423", tower: "-", petName: "Unknown", petType: "Unknown", breed: "-", sex: "-", weightKg: 0, vaccineExpire: "", ownerName: "-", tenantName: "-", remark: "Pending Review: File 423.pdf" }
];