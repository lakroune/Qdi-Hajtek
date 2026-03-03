import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X, 
  TrendingUp, 
  TrendingDown, 
  MoreVertical,
  ChevronRight,
  Download,
  Filter,
  Plus
} from 'lucide-react';

// Composant Card pour les métriques
const MetricCard = ({ title, value, change, trend, icon: Icon }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-[#1B4F72]/10 rounded-lg">
        <Icon className="w-6 h-6 text-[#1B4F72]" />
      </div>
      <span className={`flex items-center text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
        {change}
      </span>
    </div>
    <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

// Composant pour le graphique simple (simulation visuelle)
const ChartSection = () => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Analytics Overview</h3>
        <p className="text-sm text-gray-500">Traffic sources and user engagement</p>
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          Weekly
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-[#D35400] rounded-lg hover:bg-[#ba4a00] transition-colors">
          Monthly
        </button>
      </div>
    </div>
    
    {/* Simulation de graphique avec barres */}
    <div className="h-64 flex items-end justify-between gap-2 px-4">
      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((height, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
          <div 
            className="w-full bg-[#1B4F72] rounded-t-lg opacity-80 group-hover:opacity-100 transition-all relative"
            style={{ height: `${height}%` }}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {height}%
            </div>
          </div>
          <span className="text-xs text-gray-500">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}</span>
        </div>
      ))}
    </div>
  </div>
);

// Données du tableau
const recentUsers = [
  { id: 1, name: "Ahmed Benali", email: "ahmed@example.com", status: "Active", role: "Admin", lastActive: "2 min ago" },
  { id: 2, name: "Sara Alami", email: "sara@example.com", status: "Active", role: "Editor", lastActive: "1 hour ago" },
  { id: 3, name: "Karim Fassi", email: "karim@example.com", status: "Offline", role: "User", lastActive: "3 hours ago" },
  { id: 4, name: "Laila Moussaoui", email: "laila@example.com", status: "Active", role: "Moderator", lastActive: "5 min ago" },
  { id: 5, name: "Youssef Tahiri", email: "youssef@example.com", status: "Offline", role: "User", lastActive: "1 day ago" },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'conversations', label: 'Conversations', icon: MessageSquare },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#1B4F72] text-white transition-all duration-300 flex flex-col fixed h-full z-20`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D35400] rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            {sidebarOpen && <span className="font-bold text-xl tracking-tight">Kimi Admin</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id 
                      ? 'bg-[#D35400] text-white shadow-md' 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile Mini */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D35400] to-orange-400 flex items-center justify-center text-white font-bold">
              A
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-gray-400">admin@kimi.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D35400] w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#D35400] rounded-full"></span>
            </button>
            <button className="px-4 py-2 bg-[#D35400] text-white rounded-lg text-sm font-medium hover:bg-[#ba4a00] transition-colors shadow-sm">
              + New Project
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-500">Welcome back! Here's what's happening with your projects.</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard 
              title="Total Users" 
              value="12,345" 
              change="+12.5%" 
              trend="up" 
              icon={Users} 
            />
            <MetricCard 
              title="Active Sessions" 
              value="1,234" 
              change="+8.2%" 
              trend="up" 
              icon={LayoutDashboard} 
            />
            <MetricCard 
              title="Messages" 
              value="45.2K" 
              change="-2.4%" 
              trend="down" 
              icon={MessageSquare} 
            />
            <MetricCard 
              title="Avg. Response" 
              value="1.2s" 
              change="+5.1%" 
              trend="up" 
              icon={TrendingUp} 
            />
          </div>

          {/* Chart Section */}
          <ChartSection />

          {/* Recent Activity Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Recent Users</h3>
                <p className="text-sm text-gray-500">Manage your team members and their permissions</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Active</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1B4F72] to-blue-400 flex items-center justify-center text-white font-bold text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`flex items-center gap-1.5 text-sm font-medium ${user.status === 'Active' ? 'text-green-600' : 'text-gray-500'}`}>
                          <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastActive}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-gray-400 hover:text-[#D35400] transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-gray-100 flex justify-center">
              <button className="flex items-center gap-2 text-sm font-medium text-[#1B4F72] hover:text-[#D35400] transition-colors">
                View All Users
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;