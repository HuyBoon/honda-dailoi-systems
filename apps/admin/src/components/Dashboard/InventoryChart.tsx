import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { AreaChart, Area, ResponsiveContainer, Tooltip as ChartTooltip } from 'recharts';
import { TrendingUp, Car } from 'lucide-react';

const areaData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 45 },
  { name: 'Mar', value: 35 },
  { name: 'Apr', value: 80 },
  { name: 'May', value: 45 },
  { name: 'Jun', value: 60 },
  { name: 'Jul', value: 40 },
];

export const InventoryChart = () => {
  return (
    <Card className="border-none shadow-md shadow-gray-200/50 rounded-2xl flex flex-col items-stretch col-span-1 lg:col-span-2">
      <CardHeader className="p-6 flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
           <TrendingUp size={18} className="text-red-600" />
           Biểu đồ biến động kho
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col justify-between">
        <div className="px-6 mb-2 flex items-baseline gap-2">
          <span className="text-4xl font-black text-gray-900">+24%</span>
          <span className="text-sm font-bold text-green-500 flex items-center gap-1">Tuần này</span>
        </div>
        
        <div className="w-full h-[280px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#cc0000" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#cc0000" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <ChartTooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="value" stroke="#cc0000" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 border-t border-gray-50 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/20"><Car size={20}/></div>
             <div className="flex flex-col">
               <span className="text-sm font-bold text-gray-800">Dòng xe hot nhất</span>
               <span className="text-[12px] text-gray-500">Air Blade 2023 (125cc)</span>
             </div>
           </div>
           <Button variant="ghost" className="text-red-600 font-bold hover:bg-red-50 rounded-lg">Xem chi tiết</Button>
        </div>
      </CardContent>
    </Card>
  );
};
