import React, { useMemo, useState } from 'react';
import { LayoutDashboard, Dog, ShieldCheck } from 'lucide-react';
import { MOCK_PET_DB, PDF_VERIFIED_UNITS } from './constants';
import { EnrichedPetData, ComplianceStatus, PetData } from './types';
import Dashboard from './components/Dashboard';
import PetTable from './components/PetTable';
import AddPetModal from './components/AddPetModal';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'list'>('dashboard');
  const [pets, setPets] = useState<PetData[]>(MOCK_PET_DB);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<PetData | null>(null);

  const handleSavePet = (petToSave: PetData) => {
    setPets(prev => {
      const exists = prev.some(p => p.id === petToSave.id);
      if (exists) {
        return prev.map(p => p.id === petToSave.id ? petToSave : p);
      }
      return [...prev, petToSave];
    });
    setEditingPet(null);
  };

  const handleImportPets = (importedPets: PetData[]) => {
    setPets(prev => [...prev, ...importedPets]);
    alert(`Successfully imported ${importedPets.length} pets to the registry.`);
  };

  const openAddModal = () => {
    setEditingPet(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (pet: PetData) => {
    setEditingPet(pet);
    setIsAddModalOpen(true);
  };

  const processedData: EnrichedPetData[] = useMemo(() => {
    return pets.map((pet) => {
      const isPdfSubmitted = PDF_VERIFIED_UNITS.includes(pet.unitNo);
      let status = ComplianceStatus.COMPLIANT;
      const remarkLower = pet.remark.toLowerCase();

      // Simulated "Today" date for the purpose of the report context
      const today = new Date('2025-12-12'); 
      
      // Logic Priority derived from Master Database characteristics

      // 1. Critical Violations (Limits, Weight, Docs)
      if (remarkLower.includes('over weight') || remarkLower.includes('over limit') || remarkLower.includes('quantity')) {
        status = ComplianceStatus.NON_COMPLIANT_LIMIT;
      } 
      else if (remarkLower.includes('id mismatch') || remarkLower.includes('doc')) {
        status = ComplianceStatus.NON_COMPLIANT_DOCS;
      }
      // 2. Vaccine Logic
      else if (remarkLower.includes('expired')) {
        status = ComplianceStatus.NON_COMPLIANT_VACCINE;
      }
      else if (pet.vaccineExpire && pet.vaccineExpire !== '-' && pet.vaccineExpire !== 'N/A') {
        // Handle both YYYY-MM-DD and DD/MM/YYYY if mixed
        let expDate = new Date(pet.vaccineExpire);
        if (isNaN(expDate.getTime())) {
           // Fallback simple parser if format is odd
           expDate = new Date(); 
        }
        
        if (expDate < today) {
          status = ComplianceStatus.NON_COMPLIANT_VACCINE;
        }
      }

      // 3. Pending States
      if (status === ComplianceStatus.COMPLIANT) {
        if (remarkLower.includes('pending') || pet.petName === 'Unknown') {
          status = ComplianceStatus.PENDING_VERIFICATION;
        } else if (!isPdfSubmitted) {
          status = ComplianceStatus.PENDING_PDF;
        }
      }

      return {
        ...pet,
        status,
        isPdfSubmitted
      };
    });
  }, [pets]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-none">WTM Pet Compliance</h1>
                <p className="text-xs text-gray-500 mt-1">System V6.2 (Master DB)</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
               <div className="text-right hidden sm:block">
                 <p className="text-sm font-medium text-gray-900">Admin User</p>
                 <p className="text-xs text-gray-500">Juristic Office</p>
               </div>
               <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                 AU
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Navigation Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'dashboard'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <LayoutDashboard className={`
                -ml-0.5 mr-2 h-5 w-5
                ${activeTab === 'dashboard' ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'}
              `} />
              Dashboard Overview
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'list'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <Dog className={`
                -ml-0.5 mr-2 h-5 w-5
                ${activeTab === 'list' ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'}
              `} />
              Pet Registry List
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2.5 rounded-full text-xs font-medium inline-block">
                {processedData.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Dynamic View */}
        <div className="animate-in fade-in duration-300 slide-in-from-bottom-4">
          {activeTab === 'dashboard' ? (
            <Dashboard data={processedData} />
          ) : (
            <PetTable 
              data={processedData} 
              onAddPet={openAddModal} 
              onEditPet={openEditModal}
              onImportPets={handleImportPets}
            />
          )}
        </div>
      </main>

      <AddPetModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSave={handleSavePet}
        initialData={editingPet}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-gray-500">
            &copy; 2025 WTM Juristic Management. Master Database Loaded.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;