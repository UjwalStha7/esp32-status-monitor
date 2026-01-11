import { useState, useEffect, useCallback } from 'react';

export interface ESP32Config {
  endpoint: string;
  updateInterval: number; // in seconds
}

export interface ESP32ConnectionState {
  isConnected: boolean;
  lastUpdate: Date | null;
  isChecking: boolean;
  error: string | null;
}

const DEFAULT_CONFIG: ESP32Config = {
  endpoint: '192.168.137.77',
  updateInterval: 5,
};

export const useEsp32Connection = (config: ESP32Config = DEFAULT_CONFIG) => {
  const [connectionState, setConnectionState] = useState<ESP32ConnectionState>({
    isConnected: false,
    lastUpdate: null,
    isChecking: false,
    error: null,
  });

  const checkConnection = useCallback(async () => {
    setConnectionState(prev => ({ ...prev, isChecking: true, error: null }));

    try {
      // Attempt to fetch from ESP32 endpoint with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(`http://${config.endpoint}/`, {
        method: 'GET',
        signal: controller.signal,
        mode: 'no-cors', // ESP32 may not have CORS headers
      });

      clearTimeout(timeoutId);

      // With no-cors mode, we can't read the response, but if we get here without error, connection exists
      setConnectionState({
        isConnected: true,
        lastUpdate: new Date(),
        isChecking: false,
        error: null,
      });
    } catch (error) {
      setConnectionState({
        isConnected: false,
        lastUpdate: connectionState.lastUpdate,
        isChecking: false,
        error: error instanceof Error ? error.message : 'Connection failed',
      });
    }
  }, [config.endpoint, connectionState.lastUpdate]);

  // Auto-check connection on mount and at intervals
  useEffect(() => {
    checkConnection();

    const intervalId = setInterval(checkConnection, config.updateInterval * 1000);

    return () => clearInterval(intervalId);
  }, [config.updateInterval, checkConnection]);

  return {
    ...connectionState,
    config,
    refresh: checkConnection,
  };
};
