import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SensorCardProps {
  type: 'soil' | 'light';
  value: number;
  condition: 'Good' | 'Okay' | 'Bad';
}

export const SensorCard = ({ type, value, condition }: SensorCardProps) => {
  const isSoil = type === 'soil';
  
  const getConditionColor = (cond: string) => {
    switch (cond) {
      case 'Good':
        return 'bg-success text-success-foreground';
      case 'Okay':
        return 'bg-warning text-warning-foreground';
      case 'Bad':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getConditionBorder = (cond: string) => {
    switch (cond) {
      case 'Good':
        return 'border-success/30';
      case 'Okay':
        return 'border-warning/30';
      case 'Bad':
        return 'border-destructive/30';
      default:
        return 'border-border';
    }
  };

  const getIconBg = (cond: string) => {
    switch (cond) {
      case 'Good':
        return 'bg-success/10 text-success';
      case 'Okay':
        return 'bg-warning/10 text-warning';
      case 'Bad':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-lg border-2",
      getConditionBorder(condition)
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {isSoil ? 'Soil Moisture' : 'Light (LDR)'}
        </CardTitle>
        <div className={cn(
          "p-2 rounded-full",
          getIconBg(condition)
        )}>
          {isSoil ? (
            <Droplets className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* ADC Value Display */}
          <div>
            <p className="text-3xl font-bold tracking-tight">
              {value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              ADC Value (0-4095)
            </p>
          </div>
          
          {/* Condition Badge */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status:</span>
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold",
              getConditionColor(condition)
            )}>
              {condition}
            </span>
          </div>
          
          {/* Threshold Info */}
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              {isSoil ? (
                <>
                  Good: ≤1500 | Okay: 1501-2500 | Bad: &gt;2500
                </>
              ) : (
                <>
                  Bad: &lt;1500 | Okay: 1500-2999 | Good: ≥3000
                </>
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
