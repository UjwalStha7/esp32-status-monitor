// ESP32 API Configuration
// Update this with your ESP32's actual IP address to connect to real sensors
export const API_CONFIG = {
  endpoint: '192.168.137.77',
  updateInterval: 5, // seconds
};

// Mock sensor data for testing
export const mockSensorData = {
  temperature: 25.5,
  humidity: 60,
  pressure: 1013.25,
  light: 750,
};
