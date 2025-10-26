import { BatchData } from '../types'

export const suggestedBatchIds = [
  'SB001',
  'WT002',
  'RC003',
  'CN004',
  'PL005'
]

export const mockBatchData: Record<string, BatchData> = {
  'SB001': {
    batchNumber: 'SB001',
    cropType: 'Soybean',
    farmer: 'R. Patel',
    farm: 'Green Fields, GJ',
    harvestDate: '2024-01-15',
    quantity: '75 t',
    quality: 'Premium',
    currentTemperature: 23.5,
    currentHumidity: 62,
    qrCode: 'data:image/png;base64,abc123',
    events: [
      {
        id: 1,
        eventType: 'harvest',
        actor: 'R. Patel',
        location: 'Green Fields, Vadodara',
        timestamp: '01/15 06:30',
        status: 'completed',
        temperature: 22,
        humidity: 65
      },
      {
        id: 2,
        eventType: 'collection',
        actor: 'GJ Farmers Co-op',
        location: 'Center B2',
        timestamp: '01/15 14:00',
        status: 'completed',
        temperature: 24,
        humidity: 63
      },
      {
        id: 3,
        eventType: 'processing',
        actor: 'Premium Foods',
        location: 'Unit 3',
        timestamp: '01/18 10:00',
        status: 'completed',
        temperature: 24,
        humidity: 58
      }
    ]
  },
  'WT002': {
    batchNumber: 'WT002',
    cropType: 'Wheat',
    farmer: 'A. Singh',
    farm: 'Golden Fields, PB',
    harvestDate: '2024-01-10',
    quantity: '120 t',
    quality: 'A Grade',
    currentTemperature: 22.0,
    currentHumidity: 55,
    qrCode: 'data:image/png;base64,def456',
    events: [
      {
        id: 1,
        eventType: 'harvest',
        actor: 'A. Singh',
        location: 'Golden Fields, Ludhiana',
        timestamp: '01/10 05:30',
        status: 'completed',
        temperature: 21,
        humidity: 58
      },
      {
        id: 2,
        eventType: 'storage',
        actor: 'State Storage',
        location: 'Silo A',
        timestamp: '01/11 08:00',
        status: 'completed',
        temperature: 22,
        humidity: 54
      },
      {
        id: 3,
        eventType: 'processing',
        actor: 'Modern Mills',
        location: 'Mill 2',
        timestamp: '01/14 07:00',
        status: 'in_progress',
        temperature: 22,
        humidity: 55
      }
    ]
  },
  'RC003': {
    batchNumber: 'RC003',
    cropType: 'Basmati',
    farmer: 'V. Kumar',
    farm: 'River Valley, HR',
    harvestDate: '2024-01-12',
    quantity: '90 t',
    quality: 'Export',
    currentTemperature: 24.0,
    currentHumidity: 68,
    qrCode: 'data:image/png;base64,ghi789',
    events: [
      {
        id: 1,
        eventType: 'harvest',
        actor: 'V. Kumar',
        location: 'River Valley, Karnal',
        timestamp: '01/12 07:00',
        status: 'completed',
        temperature: 23,
        humidity: 70
      },
      {
        id: 2,
        eventType: 'collection',
        actor: 'Rice Exporters',
        location: 'Hub 3',
        timestamp: '01/12 16:00',
        status: 'completed',
        temperature: 24,
        humidity: 69
      },
      {
        id: 3,
        eventType: 'processing',
        actor: 'Rice Processors',
        location: 'Center 4',
        timestamp: '01/16 08:00',
        status: 'in_progress',
        temperature: 24,
        humidity: 68
      }
    ]
  }
}