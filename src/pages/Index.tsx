import { ConnectionStatusBar } from '@/components/ConnectionStatusBar';
import { SystemConfigCard } from '@/components/SystemConfigCard';
import { useEsp32Connection } from '@/hooks/useEsp32Connection';
import { API_CONFIG } from '@/data/mockData';

const Index = () => {
  const {
    isConnected,
    lastUpdate,
    isChecking,
    refresh,
    config,
  } = useEsp32Connection(API_CONFIG);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">ESP32 Dashboard</h1>
            <ConnectionStatusBar
              isConnected={isConnected}
              lastUpdate={lastUpdate}
              isChecking={isChecking}
              onRefresh={refresh}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SystemConfigCard
              isConnected={isConnected}
              endpoint={config.endpoint}
              updateInterval={config.updateInterval}
              lastUpdate={lastUpdate}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
