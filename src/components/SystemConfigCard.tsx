import { Settings, Server, Clock, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SystemConfigCardProps {
  isConnected: boolean;
  endpoint: string;
  updateInterval: number;
  lastUpdate: Date | null;
}

export const SystemConfigCard = ({
  isConnected,
  endpoint,
  updateInterval,
  lastUpdate,
}: SystemConfigCardProps) => {
  const formatLastUpdate = (date: Date | null): string => {
    if (!date) return 'N/A';
    return date.toLocaleString();
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold">
          <Settings className="h-5 w-5 text-muted-foreground" />
          System Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-0">
        {/* Connection Status */}
        <div className="flex items-center justify-between py-4 border-b">
          <span className="text-muted-foreground">Connection Status</span>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'h-2.5 w-2.5 rounded-full status-pulse',
                isConnected ? 'bg-success' : 'bg-destructive'
              )}
            />
            <span
              className={cn(
                'font-medium',
                isConnected ? 'text-success' : 'text-destructive'
              )}
            >
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        {/* ESP32 Endpoint */}
        <div className="flex items-center justify-between py-4 border-b">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Server className="h-4 w-4" />
            <span>ESP32 Endpoint</span>
          </div>
          <code className="px-3 py-1 bg-muted rounded text-sm font-mono">
            {endpoint}
          </code>
        </div>

        {/* Update Interval */}
        <div className="flex items-center justify-between py-4 border-b">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Update Interval</span>
          </div>
          <span className="font-medium">{updateInterval}s</span>
        </div>

        {/* Last Data Update */}
        <div className="flex items-center justify-between py-4 border-b">
          <span className="text-muted-foreground">Last Data Update</span>
          <span className="font-medium">{formatLastUpdate(lastUpdate)}</span>
        </div>

        {/* Note */}
        <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex gap-2 text-sm">
            <Info className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
            <p>
              <span className="font-medium text-accent">Note:</span>{' '}
              <span className="text-muted-foreground">
                Currently using mock data. Update{' '}
                <code className="px-1.5 py-0.5 bg-muted rounded text-xs">API_CONFIG</code> in{' '}
                <code className="px-1.5 py-0.5 bg-muted rounded text-xs">src/data/mockData.ts</code>{' '}
                with your ESP32's IP address to connect to real sensors.
              </span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
