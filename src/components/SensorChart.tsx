import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
} from 'recharts';
import { Droplets, Sun } from 'lucide-react';
import { SOIL_MOISTURE_THRESHOLDS, LIGHT_THRESHOLDS } from '@/data/mockData';

interface HistoryDataPoint {
  time: string;
  timestamp: number;
  soilMoisture: number;
  light: number;
}

interface SensorChartProps {
  type: 'soil' | 'light';
  data: HistoryDataPoint[];
}

export const SensorChart = ({ type, data }: SensorChartProps) => {
  const isSoil = type === 'soil';
  const dataKey = isSoil ? 'soilMoisture' : 'light';
  
  // Colors for the chart
  const chartColor = 'hsl(142, 70%, 45%)';
  const chartColorLight = 'hsl(142, 70%, 45%, 0.1)';
  
  // Get thresholds for reference lines
  const thresholds = isSoil 
    ? [
        { value: SOIL_MOISTURE_THRESHOLDS.GOOD, label: 'Good', color: 'hsl(142, 70%, 45%)' },
        { value: SOIL_MOISTURE_THRESHOLDS.OKAY, label: 'Okay', color: 'hsl(45, 95%, 50%)' },
      ]
    : [
        { value: LIGHT_THRESHOLDS.BAD, label: 'Bad', color: 'hsl(0, 75%, 55%)' },
        { value: LIGHT_THRESHOLDS.OKAY, label: 'Good', color: 'hsl(142, 70%, 45%)' },
      ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      let condition = '';
      let conditionColor = '';
      
      if (isSoil) {
        if (value <= SOIL_MOISTURE_THRESHOLDS.GOOD) {
          condition = 'Good';
          conditionColor = 'text-success';
        } else if (value <= SOIL_MOISTURE_THRESHOLDS.OKAY) {
          condition = 'Okay';
          conditionColor = 'text-warning';
        } else {
          condition = 'Bad';
          conditionColor = 'text-destructive';
        }
      } else {
        if (value < LIGHT_THRESHOLDS.BAD) {
          condition = 'Bad';
          conditionColor = 'text-destructive';
        } else if (value < LIGHT_THRESHOLDS.OKAY) {
          condition = 'Okay';
          conditionColor = 'text-warning';
        } else {
          condition = 'Good';
          conditionColor = 'text-success';
        }
      }
      
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-xs text-muted-foreground mb-1">{label}</p>
          <p className="text-lg font-bold">{value}</p>
          <p className={`text-sm font-medium ${conditionColor}`}>
            Status: {condition}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center gap-2 pb-4">
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          {isSoil ? (
            <Droplets className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </div>
        <div>
          <CardTitle className="text-base font-semibold">
            {isSoil ? 'Soil Moisture' : 'Light (LDR)'} History
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Real-time ADC values over time
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))" 
                vertical={false}
              />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis 
                domain={[0, 4095]}
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={false}
                width={45}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Reference lines for thresholds */}
              {thresholds.map((threshold, index) => (
                <ReferenceLine
                  key={index}
                  y={threshold.value}
                  stroke={threshold.color}
                  strokeDasharray="5 5"
                  strokeOpacity={0.6}
                />
              ))}
              
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={chartColor}
                strokeWidth={2}
                fill={`url(#gradient-${type})`}
                dot={false}
                activeDot={{ r: 4, fill: chartColor }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
          {thresholds.map((threshold, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-0.5"
                style={{ backgroundColor: threshold.color }}
              />
              <span className="text-xs text-muted-foreground">
                {threshold.label} ({threshold.value})
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
