import React from 'react';
interface StatData {
  value: string;
  title: string;
  subtitle: string;
  colorClasses: string;
  borderClasses: string;
}
interface StatCardProps {
  stat: StatData;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => (
  <div className={`flex items-center space-x-4 p-5 border-l-4 border-gradient-to-br ${stat.borderClasses} bg-gray-50 rounded-xl shadow transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl`}>
    <div className={`text-5xl font-bold ${stat.colorClasses}`}>{stat.value}</div>
    <div>
      <p className="text-lg text-gray-700 font-semibold">{stat.title}</p>
      <p className="text-sm text-gray-500">{stat.subtitle}</p>
    </div>
  </div>
);

export default StatCard;