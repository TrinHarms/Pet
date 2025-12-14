import React, { useState, useMemo, useRef } from 'react';
import { EnrichedPetData, ComplianceStatus, PetData } from '../types';
import { Search, Filter, Download, X, PawPrint, Calendar, User, Scale, FileText, Building2, Plus, Pencil, Clock, Upload } from 'lucide-react';

interface PetTableProps {
  data: EnrichedPetData[];
  onAddPet?: () => void;
  onEditPet?: (pet: EnrichedPetData) => void;
  onImportPets?: (pets: PetData[]) => void;
}

const PetTable: React.FC<PetTableProps> = ({ data, onAddPet, onEditPet, onImportPets }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedPet, setSelectedPet] = useState<EnrichedPetData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredData = useMemo(() => {
    return data.filter((pet) => {
      const matchesSearch = 
        pet.unitNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || pet.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter]);

  // Helper to check for upcoming expiration (within 30 days) based on simulated system date
  const getExpiryWarning = (dateStr: string) => {
    if (!dateStr || dateStr === '-' || dateStr === 'N/A') return null;

    // Using the same simulated date as App.tsx for consistency with the mock dataset
    const today = new Date('2025-12-12');
    const expDate = new Date(dateStr);

    if (isNaN(expDate.getTime())) return null;

    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Check if date is in the future but within 30 days
    if (diffDays >= 0 && diffDays <= 30) {
      return diffDays;
    }
    return null;
  };

  const getStatusColor = (status: ComplianceStatus) => {
    switch (status) {
      case ComplianceStatus.COMPLIANT:
        return 'bg-green-100 text-green-800 border-green-200';
      case ComplianceStatus.NON_COMPLIANT_LIMIT:
        return 'bg-red-100 text-red-800 border-red-200';
      case ComplianceStatus.NON_COMPLIANT_VACCINE:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case ComplianceStatus.NON_COMPLIANT_DOCS:
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case ComplianceStatus.PENDING_VERIFICATION:
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case ComplianceStatus.PENDING_PDF:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleExport = () => {
    const headers = ["Pet ID", "Unit No", "Tower", "Floor", "Pet Name", "Type", "Breed", "Sex", "Weight (kg)", "Vaccine Exp", "Owner", "Status", "Remark"];
    const csvContent = [
        headers.join(","),
        ...filteredData.map(row => [
            `"${row.id}"`,
            row.unitNo, 
            row.tower, 
            row.floor,
            row.petName, 
            row.petType, 
            row.breed, 
            row.sex,
            row.weightKg, 
            row.vaccineExpire, 
            `"${row.ownerName}"`,
            `"${row.status}"`, 
            `"${row.remark}"`
        ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "wtm_pet_master_db.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      parseCSV(text);
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset
  };

  const parseCSV = (csvText: string) => {
    const lines = csvText.split(/\r\n|\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return;

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());
    
    // Mapping helper
    const getIndex = (possibleNames: string[]) => headers.findIndex(h => possibleNames.includes(h));

    const idxUnit = getIndex(['unit no', 'unit', 'unitno']);
    const idxTower = getIndex(['tower', 'building']);
    const idxFloor = getIndex(['floor']);
    const idxPetName = getIndex(['pet name', 'petname', 'name']);
    const idxType = getIndex(['type', 'pet type']);
    const idxBreed = getIndex(['breed']);
    const idxSex = getIndex(['sex', 'gender']);
    const idxWeight = getIndex(['weight (kg)', 'weight', 'weightkg']);
    const idxVaccineExp = getIndex(['vaccine exp', 'vaccine expire', 'vaccine expiry']);
    const idxOwner = getIndex(['owner', 'owner name']);
    const idxRemark = getIndex(['remark', 'remarks']);

    const newPets: PetData[] = [];

    for (let i = 1; i < lines.length; i++) {
        // Regex to split CSV respecting quotes
        const rowData = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(val => val.trim().replace(/^"|"$/g, ''));

        if (rowData.length < 2) continue;

        const pet: PetData = {
            id: `import-${Date.now()}-${i}`,
            unitNo: idxUnit > -1 ? rowData[idxUnit] : 'Unknown',
            tower: idxTower > -1 ? rowData[idxTower] : '-',
            floor: idxFloor > -1 ? rowData[idxFloor] : '-',
            ownerName: idxOwner > -1 ? rowData[idxOwner] : '-',
            residentType: 'Owner', 
            petName: idxPetName > -1 ? rowData[idxPetName] : 'Unknown',
            petType: idxType > -1 ? rowData[idxType] : 'Other',
            breed: idxBreed > -1 ? rowData[idxBreed] : '-',
            sex: (idxSex > -1 ? rowData[idxSex] : '-') as any,
            dob: '-',
            ageYears: 0,
            weightKg: idxWeight > -1 ? parseFloat(rowData[idxWeight]) || 0 : 0,
            vaccineLastDate: '-',
            vaccineExpire: idxVaccineExp > -1 ? rowData[idxVaccineExp] : '-',
            vaccineStatus: 'NO RECORD',
            documentsComplete: true,
            remark: idxRemark > -1 ? rowData[idxRemark] : ''
        };
        newPets.push(pet);
    }

    if (onImportPets && newPets.length > 0) {
        onImportPets(newPets);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col xl:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
             <h2 className="text-lg font-semibold text-gray-900">Pet Registry</h2>
             {onAddPet && (
                <button onClick={onAddPet} className="hidden sm:flex items-center gap-1 text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 shadow-sm transition-colors">
                    <Plus className="h-4 w-4" />
                    Add Pet
                </button>
             )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
             {/* Mobile Add Button */}
             {onAddPet && (
                <button onClick={onAddPet} className="sm:hidden flex items-center justify-center gap-2 text-sm bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 shadow-sm transition-colors w-full">
                    <Plus className="h-4 w-4" />
                    Add Pet
                </button>
             )}

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search Unit, Pet, Owner..." 
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select 
                className="pl-9 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white w-full sm:w-auto"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value={ComplianceStatus.COMPLIANT}>Compliant</option>
                <option value={ComplianceStatus.PENDING_VERIFICATION}>Pending Verification</option>
                <option value={ComplianceStatus.NON_COMPLIANT_VACCINE}>Expired Vaccine</option>
                <option value={ComplianceStatus.NON_COMPLIANT_LIMIT}>Limit/Weight Issue</option>
                <option value={ComplianceStatus.NON_COMPLIANT_DOCS}>Document Issues</option>
              </select>
            </div>
            
            {onImportPets && (
                <>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept=".csv" 
                        className="hidden" 
                    />
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                        <Upload className="h-4 w-4" />
                        Import
                    </button>
                </>
            )}

            <button 
              onClick={handleExport}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3">Pet ID</th>
                <th className="px-6 py-3">Unit / Tower</th>
                <th className="px-6 py-3">Pet Info</th>
                <th className="px-6 py-3">Breed / Sex</th>
                <th className="px-6 py-3">Vaccine Exp.</th>
                <th className="px-6 py-3">Owner/Remark</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((pet) => {
                   const daysRemaining = getExpiryWarning(pet.vaccineExpire);
                   
                   return (
                    <tr 
                        key={pet.id} 
                        onClick={() => setSelectedPet(pet)}
                        className="bg-white border-b hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                        <td className="px-6 py-4 text-xs font-mono text-gray-500">
                            #{pet.id}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                        <div>{pet.unitNo}</div>
                        <div className="text-xs text-gray-500">Tower {pet.tower} • Fl {pet.floor}</div>
                        </td>
                        <td className="px-6 py-4">
                        <div className={`font-medium ${pet.petName === 'Unknown' ? 'text-gray-400 italic' : 'text-gray-900'}`}>
                            {pet.petName}
                        </div>
                        <div className="text-xs text-gray-500">{pet.petType} ({pet.ageYears}y)</div>
                        </td>
                        <td className="px-6 py-4">
                        <div>{pet.breed}</div>
                        <div className="text-xs text-gray-500">{pet.sex} • {pet.weightKg}kg</div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                                <span>{pet.vaccineExpire && pet.vaccineExpire !== '-' ? pet.vaccineExpire : <span className="text-gray-400 italic">N/A</span>}</span>
                                {daysRemaining !== null && (
                                    <div 
                                        className="relative group cursor-help"
                                        title={`Expiring in ${daysRemaining} days (${pet.vaccineExpire})`}
                                    >
                                        <Clock className="h-4 w-4 text-amber-500" />
                                    </div>
                                )}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                        <div>{pet.ownerName !== '-' ? pet.ownerName : <span className="text-gray-400">Unknown</span>}</div>
                        {pet.residentType !== '-' && <div className="text-xs text-indigo-500 font-medium mb-1">{pet.residentType}</div>}
                        <div className="text-xs text-gray-500 truncate max-w-[200px]" title={pet.remark}>
                            {pet.remark}
                        </div>
                        </td>
                        <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(pet.status)}`}>
                            {pet.status}
                        </span>
                        </td>
                    </tr>
                )})
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No pets found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t bg-gray-50 text-xs text-gray-500 flex justify-between">
          <span>Showing {filteredData.length} entries</span>
          <span>Generated by WTM Compliance System V6.2</span>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedPet(null)}>
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200" 
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Unit {selectedPet.unitNo}</h3>
                  <p className="text-xs text-gray-500 font-medium">
                      Tower {selectedPet.tower === '-' ? 'N/A' : selectedPet.tower} • Floor {selectedPet.floor}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPet(null)} 
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              
              {/* Pet Identity */}
              <div className="flex items-start gap-4">
                 <div className="h-16 w-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600 flex-shrink-0">
                    <PawPrint className="h-8 w-8" />
                 </div>
                 <div className="flex-1">
                    <h4 className="text-2xl font-bold text-gray-900 leading-tight mb-1">
                      {selectedPet.petName}
                    </h4>
                    <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                       <span className="font-mono text-xs text-gray-400 bg-gray-100 px-1 rounded">#{selectedPet.id}</span>
                       <span>•</span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-700">{selectedPet.petType}</span>
                      <span>•</span>
                      <span>{selectedPet.breed}</span>
                    </p>
                 </div>
              </div>

              {/* Status Banner */}
              <div className={`p-4 rounded-xl border flex items-start gap-3 ${getStatusColor(selectedPet.status)}`}>
                  <div className="flex-1">
                      <p className="text-sm font-bold uppercase tracking-wide opacity-90">Compliance Status</p>
                      <p className="text-base font-semibold mt-0.5">{selectedPet.status}</p>
                      {!selectedPet.isPdfSubmitted && (
                        <p className="text-xs mt-2 font-medium flex items-center gap-1.5 opacity-80">
                           <FileText className="h-3 w-3" /> PDF Documentation Missing
                        </p>
                      )}
                  </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <Scale className="h-3.5 w-3.5" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Weight / Age</span>
                      </div>
                      <p className="font-medium text-gray-900">
                          {selectedPet.weightKg > 0 ? `${selectedPet.weightKg} kg` : 'N/A'} • {selectedPet.ageYears > 0 ? `${selectedPet.ageYears} yrs` : '-'}
                      </p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <User className="h-3.5 w-3.5" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Sex</span>
                      </div>
                      <p className="font-medium text-gray-900">{selectedPet.sex === '-' ? 'N/A' : (selectedPet.sex === 'M' ? 'Male' : 'Female')}</p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Vaccine Exp</span>
                      </div>
                      <p className={`font-medium ${selectedPet.status.includes('Vaccine') ? 'text-red-600' : 'text-gray-900'}`}>
                          {selectedPet.vaccineExpire || 'N/A'}
                      </p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <User className="h-3.5 w-3.5" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Owner ({selectedPet.residentType})</span>
                      </div>
                      <p className="font-medium text-gray-900 truncate">
                        {selectedPet.ownerName !== '-' ? selectedPet.ownerName : 'Unknown'}
                      </p>
                  </div>
              </div>

              {/* Remarks */}
              {selectedPet.remark && (
                <div className="pt-2">
                   <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Remarks</h5>
                   <p className="text-sm text-gray-700 bg-yellow-50/50 p-3 rounded-lg border border-yellow-100 italic">
                     "{selectedPet.remark}"
                   </p>
                </div>
              )}
            </div>
            
             {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                {onEditPet && (
                    <button 
                        onClick={() => {
                            onEditPet(selectedPet);
                            setSelectedPet(null);
                        }}
                        className="mr-3 px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg text-sm font-semibold hover:bg-indigo-100 hover:text-indigo-800 transition-all flex items-center gap-2"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit Details
                    </button>
                )}
                <button 
                    onClick={() => setSelectedPet(null)}
                    className="px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 shadow-sm transition-all active:scale-95"
                >
                    Close
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PetTable;