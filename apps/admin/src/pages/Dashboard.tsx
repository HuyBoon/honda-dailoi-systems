import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts';
import { Briefcase, Users, ShoppingCart, Percent, MoreHorizontal, Settings, Home, ChevronRight, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';

const areaData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 45 },
  { name: 'Mar', value: 35 },
  { name: 'Apr', value: 80 },
  { name: 'May', value: 45 },
  { name: 'Jun', value: 60 },
  { name: 'Jul', value: 40 },
];

const barData = [
  { name: '1', clicks: 800, views: -500 },
  { name: '2', clicks: 400, views: -700 },
  { name: '3', clicks: 500, views: -400 },
  { name: '4', clicks: 900, views: -600 },
  { name: '5', clicks: 400, views: -400 },
  { name: '6', clicks: 600, views: -900 },
  { name: '7', clicks: 400, views: -500 },
];

const countryData = [
  { country: 'United states', flag: '🇺🇸', value: '$84.5K', trend: 25, up: true },
  { country: 'India', flag: '🇮🇳', value: '$750', trend: 18, up: true },
  { country: 'China', flag: '🇨🇳', value: '$38.5', trend: -14, up: false },
  { country: 'France', flag: '🇫🇷', value: '$88.0K', trend: 28, up: true },
  { country: 'Australia', flag: '🇦🇺', value: '$78.3K', trend: -16, up: false },
  { country: 'Brazil', flag: '🇧🇷', value: '$10.5K', trend: 25, up: true },
];

export const Dashboard = () => {
  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span className="text-gray-800 font-semibold text-xl md:text-2xl mr-2">Dashboard</span>
          <Home size={16} className="cursor-pointer hover:text-gray-900" />
          <ChevronRight size={16} />
          <span>eCommerce</span>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-honda-red font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer outline-none shadow-sm">
          Settings <ChevronDown size={14}/>
        </button>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        
        {/* Metric 1 */}
        <Card className="border-gray-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-5 flex justify-between items-start">
            <div>
              <p className="text-[14px] font-medium text-gray-600 mb-2">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900">$92,854</h3>
            </div>
            <div className="flex flex-col items-end justify-between h-full gap-4">
              <div className="w-9 h-9 rounded-full bg-honda-red/10 flex items-center justify-center text-honda-red">
                <Briefcase size={16} />
              </div>
              <span className="text-xs font-semibold text-green-500">+6.32%</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 2 */}
        <Card className="border-gray-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-5 flex justify-between items-start">
            <div>
              <p className="text-[14px] font-medium text-gray-600 mb-2">Total Customer</p>
              <h3 className="text-2xl font-bold text-gray-900">48,789</h3>
            </div>
            <div className="flex flex-col items-end justify-between h-full gap-4">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Users size={16} />
              </div>
              <span className="text-xs font-semibold text-green-500">+12.45%</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 3 */}
        <Card className="border-gray-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-5 flex justify-between items-start">
            <div>
              <p className="text-[14px] font-medium text-gray-600 mb-2">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-900">88,234</h3>
            </div>
            <div className="flex flex-col items-end justify-between h-full gap-4">
              <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                <ShoppingCart size={16} />
              </div>
              <span className="text-xs font-semibold text-green-500">+3.12%</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 4 */}
        <Card className="border-gray-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-5 flex justify-between items-start">
            <div>
              <p className="text-[14px] font-medium text-gray-600 mb-2">Conversion Rate</p>
              <h3 className="text-2xl font-bold text-gray-900">48.76%</h3>
            </div>
            <div className="flex flex-col items-end justify-between h-full gap-4">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Percent size={16} />
              </div>
              <span className="text-xs font-semibold text-green-500">+8.52%</span>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Main Analytics Grid - 3 Columns (similar to demo) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales by Countries List */}
        <Card className="border-gray-200 shadow-sm rounded-xl col-span-1 border">
          <CardHeader className="p-5 flex flex-row items-center justify-between pb-2 border-none">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Sales by Countries</CardTitle>
            <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="flex flex-col gap-4 mt-2">
              {countryData.map((data, index) => (
                <div key={index} className="flex justify-between items-center group">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl opacity-90 group-hover:scale-110 transition-transform">{data.flag}</div>
                    <div className="flex flex-col">
                      <span className="text-[15px] font-semibold text-gray-900">{data.value}</span>
                      <span className="text-xs text-gray-500">{data.country}</span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-[13px] font-bold ${data.up ? 'text-green-500' : 'text-red-500'}`}>
                    {data.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {Math.abs(data.trend)}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Total Earning Area Chart */}
        <Card className="border-gray-200 shadow-sm rounded-xl flex flex-col items-stretch col-span-1">
          <CardHeader className="p-5 flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Total Earning</CardTitle>
            <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col justify-between">
            <div className="px-5 mb-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">68%</span>
              <span className="text-sm font-semibold text-green-500 flex items-center gap-1"><TrendingUp size={14}/> 25%</span>
            </div>
            
            {/* Area Chart visual replacing the generic wave */}
            <div className="w-full h-[220px] mt-4 mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#cc0000" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#cc0000" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip wrapperClassName="hidden" />
                  <Area type="monotone" dataKey="value" stroke="#cc0000" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Bottom Summaries */}
            <div className="p-5 border-t border-gray-100 flex flex-col gap-4">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600"><Briefcase size={18}/></div>
                 <div className="flex flex-col">
                   <span className="text-[15px] font-bold text-gray-900">$545.69</span>
                   <span className="text-[12px] text-gray-500">Last Month Sales</span>
                 </div>
                 <span className="ml-auto text-green-500 text-sm font-bold flex items-center"><TrendingUp size={14}/>35%</span>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Traffic Bar Chart */}
        <Card className="border-gray-200 shadow-sm rounded-xl col-span-1 relative">
          <CardHeader className="p-5 flex flex-row items-center justify-between pb-0">
            <CardTitle className="text-[15px] font-semibold text-gray-800">Total Traffic</CardTitle>
            <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
          </CardHeader>
          <CardContent className="p-5 pt-3">
             <div className="flex gap-4 mb-4">
               <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                 <span className="w-2.5 h-2.5 rounded-full bg-blue-500 block"></span> Clicks
               </div>
               <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                 <span className="w-2.5 h-2.5 rounded-full bg-green-500 block"></span> Views
               </div>
             </div>
             
             <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} layout="horizontal" stackOffset="sign">
                    <Bar dataKey="clicks" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={12} />
                    <Bar dataKey="views" fill="#22c55e" radius={[0, 0, 4, 4]} maxBarSize={12} />
                  </BarChart>
                </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};
