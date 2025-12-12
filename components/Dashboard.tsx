import React from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import { EnrichedPetData, ComplianceStatus } from '../types';
import { AlertCircle, CheckCircle2, FileWarning, Scale, FileSearch, ClipboardX } from 'lucide-react';

interface DashboardProps {
  data: EnrichedPetData[];
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  // Calculate Stats
  const totalPets = data.length;
  const compliantCount = data.filter(p => p.status === ComplianceStatus.COMPLIANT).length;
  const pendingVerificationCount = data.filter(p => p.status === ComplianceStatus.PENDING_VERIFICATION).length;
  const missingPdfCount = data.filter(p => p.status === ComplianceStatus.PENDING_PDF).length;
  const vaccineExpiredCount = data.filter(p => p.status === ComplianceStatus.NON_COMPLIANT_VACCINE).length;
  const limitCount = data.filter(p => p.status === ComplianceStatus.NON_COMPLIANT_LIMIT).length;
  const docIssueCount = data.filter(p => p.status === ComplianceStatus.NON_COMPLIANT_DOCS).length;

  // Data for Pie Chart (Status Distribution)
  const statusData = [
    { name: 'Compliant', value: compliantCount, color: '#10B981' }, // Green
    { name: 'Pending Verification', value: pendingVerificationCount, color: '#8B5CF6' }, // Purple
    { name: 'Missing PDF', value: missingPdfCount, color: '#F59E0B' }, // Amber
    { name: 'Vaccine Expired', value: vaccineExpiredCount, color: '#F97316' }, // Orange
    { name: 'Limit/Weight', value: limitCount, color: '#EF4444' }, // Red
    { name: 'Doc Issues', value: docIssueCount, color: '#EC4899' }, // Pink
  ].filter(d => d.value > 0);

  // Data for Bar Chart (Pet Types)
  const typeCounts = data.reduce((acc, curr) => {
    acc[curr.petType] = (acc[curr.petType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeData = Object.entries(typeCounts).map(([name, value]) => ({ name, value }));

  const StatCard = ({ title, count, total, icon: Icon, colorClass, bgClass }: any) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 mt-2">{count}</h3>
        <p className="text-xs text-gray-400 mt-1">
          {total > 0 ? `${Math.round((count / total) * 100)}% of total` : '0%'}
        </p>
      </div>
      <div className={`p-3 rounded-lg ${bgClass}`}>
        <Icon className={`h-6 w-6 ${colorClass}`} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatCard 
          title="Total Compliant" 
          count={compliantCount} 
          total={totalPets} 
          icon={CheckCircle2} 
          colorClass="text-green-600"
          bgClass="bg-green-50"
        />
        <StatCard 
          title="Pending Verification" 
          count={pendingVerificationCount} 
          total={totalPets} 
          icon={FileSearch} 
          colorClass="text-purple-600"
          bgClass="bg-purple-50"
        />
        <StatCard 
          title="Vaccine Expired" 
          count={vaccineExpiredCount} 
          total={totalPets} 
          icon={AlertCircle} 
          colorClass="text-orange-600"
          bgClass="bg-orange-50"
        />
        <StatCard 
          title="Limit / Weight" 
          count={limitCount} 
          total={totalPets} 
          icon={Scale} 
          colorClass="text-red-600"
          bgClass="bg-red-50"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Breakdown</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pet Type Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pet Type Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={typeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f3f4f6'}} />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;