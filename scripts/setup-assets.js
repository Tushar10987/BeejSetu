#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

/**
 * Setup script for 3D assets
 * Creates sample GLTF models and generates asset manifest
 */

const ASSETS_DIR = path.join(__dirname, '../3d-assets')
const MODELS_DIR = path.join(ASSETS_DIR, 'models')

// Sample GLTF model templates
const createBasicWarehouse = () => {
  return {
    "asset": {
      "version": "2.0",
      "generator": "Oilseeds Platform"
    },
    "scene": 0,
    "scenes": [
      {
        "nodes": [0]
      }
    ],
    "nodes": [
      {
        "mesh": 0,
        "name": "Warehouse"
      }
    ],
    "meshes": [
      {
        "primitives": [
          {
            "attributes": {
              "POSITION": 0,
              "NORMAL": 1
            },
            "indices": 2,
            "material": 0
          }
        ]
      }
    ],
    "materials": [
      {
        "name": "WarehouseMaterial",
        "pbrMetallicRoughness": {
          "baseColorFactor": [0.6, 0.6, 0.6, 1.0],
          "metallicFactor": 0.0,
          "roughnessFactor": 0.8
        }
      }
    ],
    "accessors": [
      {
        "bufferView": 0,
        "componentType": 5126,
        "count": 24,
        "type": "VEC3"
      },
      {
        "bufferView": 1,
        "componentType": 5126,
        "count": 24,
        "type": "VEC3"
      },
      {
        "bufferView": 2,
        "componentType": 5123,
        "count": 36,
        "type": "SCALAR"
      }
    ],
    "bufferViews": [
      {
        "buffer": 0,
        "byteOffset": 0,
        "byteLength": 288
      },
      {
        "buffer": 0,
        "byteOffset": 288,
        "byteLength": 288
      },
      {
        "buffer": 0,
        "byteOffset": 576,
        "byteLength": 72
      }
    ],
    "buffers": [
      {
        "byteLength": 648
      }
    ]
  }
}

const createBasicTruck = () => {
  return {
    "asset": {
      "version": "2.0",
      "generator": "Oilseeds Platform"
    },
    "scene": 0,
    "scenes": [
      {
        "nodes": [0]
      }
    ],
    "nodes": [
      {
        "mesh": 0,
        "name": "Truck"
      }
    ],
    "meshes": [
      {
        "primitives": [
          {
            "attributes": {
              "POSITION": 0,
              "NORMAL": 1
            },
            "indices": 2,
            "material": 0
          }
        ]
      }
    ],
    "materials": [
      {
        "name": "TruckMaterial",
        "pbrMetallicRoughness": {
          "baseColorFactor": [0.2, 0.2, 0.2, 1.0],
          "metallicFactor": 0.8,
          "roughnessFactor": 0.2
        }
      }
    ],
    "accessors": [
      {
        "bufferView": 0,
        "componentType": 5126,
        "count": 24,
        "type": "VEC3"
      },
      {
        "bufferView": 1,
        "componentType": 5126,
        "count": 24,
        "type": "VEC3"
      },
      {
        "bufferView": 2,
        "componentType": 5123,
        "count": 36,
        "type": "SCALAR"
      }
    ],
    "bufferViews": [
      {
        "buffer": 0,
        "byteOffset": 0,
        "byteLength": 288
      },
      {
        "buffer": 0,
        "byteOffset": 288,
        "byteLength": 288
      },
      {
        "buffer": 0,
        "byteOffset": 576,
        "byteLength": 72
      }
    ],
    "buffers": [
      {
        "byteLength": 648
      }
    ]
  }
}

function createDirectories() {
  const dirs = [
    'models/warehouses',
    'models/trucks',
    'models/farms',
    'models/misc',
    'textures',
    'hdri',
    'compressed'
  ]

  dirs.forEach(dir => {
    const fullPath = path.join(ASSETS_DIR, dir)
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true })
      console.log(`Created directory: ${dir}`)
    }
  })
}

function generateSampleModels() {
  // Generate basic warehouse model
  const warehouseModel = createBasicWarehouse()
  const warehousePath = path.join(MODELS_DIR, 'warehouses', 'warehouse-basic.gltf')
  fs.writeFileSync(warehousePath, JSON.stringify(warehouseModel, null, 2))
  console.log('Generated: warehouse-basic.gltf')

  // Generate basic truck model
  const truckModel = createBasicTruck()
  const truckPath = path.join(MODELS_DIR, 'trucks', 'truck-delivery.gltf')
  fs.writeFileSync(truckPath, JSON.stringify(truckModel, null, 2))
  console.log('Generated: truck-delivery.gltf')
}

function generateAssetManifest() {
  const manifest = {
    version: "1.0.0",
    models: {
      warehouses: {
        "warehouse-basic": {
          file: "models/warehouses/warehouse-basic.gltf",
          size: "2.5KB",
          polygons: 12,
          materials: 1,
          description: "Basic warehouse model"
        }
      },
      trucks: {
        "truck-delivery": {
          file: "models/trucks/truck-delivery.gltf",
          size: "2.5KB",
          polygons: 12,
          materials: 1,
          description: "Basic delivery truck model"
        }
      }
    },
    performance: {
      mobile: {
        maxPolygons: 5000,
        maxTextures: 2,
        maxMaterials: 2
      },
      desktop: {
        maxPolygons: 15000,
        maxTextures: 4,
        maxMaterials: 4
      }
    }
  }

  const manifestPath = path.join(ASSETS_DIR, 'manifest.json')
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
  console.log('Generated: manifest.json')
}

function main() {
  console.log('Setting up 3D assets...')
  
  createDirectories()
  generateSampleModels()
  generateAssetManifest()
  
  console.log('\n✅ 3D assets setup complete!')
  console.log('\nNext steps:')
  console.log('1. Add your own GLTF models to the models/ directories')
  console.log('2. Run "node compress-models.js" to compress models')
  console.log('3. Update manifest.json with your asset information')
}

if (require.main === module) {
  main()
}

module.exports = { createDirectories, generateSampleModels, generateAssetManifest }
