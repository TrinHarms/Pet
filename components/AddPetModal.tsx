import React, { useEffect, useState } from 'react';
import { X, Save, Dog, Cat, Bird, HelpCircle } from 'lucide-react';
import { PetData } from '../types';

interface AddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pet: PetData) => void;
  initialData?: PetData | null;
}

const AddPetModal: React.FC<AddPetModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const initialFormState: Partial<PetData> = {
    unitNo: '',
    tower: 'A',
    floor: '',
    ownerName: '',
    residentType: 'Owner',
    petName: '',
    petType: 'Dog',
    breed: '',
    sex: '-',
    ageYears: 0,
    weightKg: 0,
    vaccineExpire: '',
    remark: ''
  };

  const [formData, setFormData] = useState<Partial<PetData>>(initialFormState);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData(initialFormState);
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Default values for a brand new pet
    const defaults: Partial<PetData> = {
      id: `new-${Date.now()}`,
      vaccineLastDate: '-',
      vaccineStatus: 'NO RECORD',
      documentsComplete: true,
      dob: '-'
    };

    // Use initialData as base if editing, otherwise defaults
    const baseData = initialData || defaults;

    // Merge base data with form data
    const newPet: PetData = {
      ...baseData,
      id: baseData.id || `new-${Date.now()}`, // Ensure ID exists
      unitNo: formData.unitNo || 'Unknown',
      tower: formData.tower || 'A',
      floor: formData.floor || '-',
      ownerName: formData.ownerName || '-',
      residentType: (formData.residentType as any) || '-',
      petName: formData.petName || 'Unknown',
      petType: formData.petType || 'Other',
      breed: formData.breed || '-',
      sex: (formData.sex as any) || '-',
      // Preserve DOB if it exists in baseData, else '-'
      dob: (baseData as any).dob || '-', 
      ageYears: Number(formData.ageYears) || 0,
      weightKg: Number(formData.weightKg) || 0,
      // Preserve other fields
      vaccineLastDate: (baseData as any).vaccineLastDate || '-',
      vaccineExpire: formData.vaccineExpire || '-',
      vaccineStatus: (baseData as any).vaccineStatus || 'NO RECORD',
      documentsComplete: (baseData as any).documentsComplete ?? true,
      remark: formData.remark || ''
    };

    onSave(newPet);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200" 
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">
            {initialData ? `Edit Details: ${initialData.petName}` : 'Add New Pet to Registry'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Unit & Owner Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider border-b pb-2">Unit & Owner</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit No *</label>
                    <input required name="unitNo" value={formData.unitNo} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" placeholder="e.g. 1559/5" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tower</label>
                    <select name="tower" value={formData.tower} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2">
                        <option value="A">A</option>
                        <option value="B">B</option>
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
                    <input name="floor" value={formData.floor} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" placeholder="e.g. 12" />
                </div>
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
                    <input name="ownerName" value={formData.ownerName} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resident Type</label>
                    <select name="residentType" value={formData.residentType} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2">
                        <option value="Owner">Owner</option>
                        <option value="Tenant">Tenant</option>
                    </select>
                </div>
            </div>
          </div>

          {/* Pet Details Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider border-b pb-2">Pet Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name *</label>
                    <input required name="petName" value={formData.petName} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select name="petType" value={formData.petType} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2">
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Bird">Bird</option>
                        <option value="Rabbit">Rabbit</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                    <input name="breed" value={formData.breed} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                    <select name="sex" value={formData.sex} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2">
                        <option value="-">-</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    <input type="number" step="0.1" name="weightKg" value={formData.weightKg} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vaccine Expiry Date</label>
                    <input type="date" name="vaccineExpire" value={formData.vaccineExpire} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" />
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Age (Years)</label>
                     <input type="number" step="0.1" name="ageYears" value={formData.ageYears} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" />
                </div>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea name="remark" value={formData.remark} onChange={handleChange} rows={2} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" placeholder="e.g. Non-Compliant issues..." />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetModal;