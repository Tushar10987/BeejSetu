# 3D Assets

This directory contains 3D assets for the Oilseeds Value Chain Platform.

## Structure

```
3d-assets/
├── models/           # GLTF/GLB models
│   ├── warehouses/   # Warehouse building models
│   ├── trucks/       # Vehicle models
│   ├── farms/        # Farm equipment models
│   └── misc/         # Other 3D objects
├── textures/         # Texture files
├── hdri/            # Environment maps
├── compressed/      # Draco-compressed models
└── manifest.json    # Asset manifest
```

## Models

### Warehouses
- `warehouse-basic.gltf` - Basic warehouse model
- `warehouse-modern.gltf` - Modern warehouse with sensors
- `warehouse-large.gltf` - Large storage facility

### Trucks
- `truck-delivery.gltf` - Standard delivery truck
- `truck-refrigerated.gltf` - Temperature-controlled truck
- `truck-large.gltf` - Heavy-duty transport truck

### Farms
- `tractor.gltf` - Farm tractor
- `harvester.gltf` - Crop harvester
- `storage-silo.gltf` - Grain storage silo

## Compression

All models should be compressed using Draco compression for better performance:

```bash
# Compress a model
node compress-models.js warehouse-basic.gltf

# Compress all models
node compress-all.js
```

## Usage

Models are loaded using the asset loader:

```typescript
import { useGLTF } from '@react-three/drei'

function WarehouseModel() {
  const { scene } = useGLTF('/models/warehouses/warehouse-basic.glb')
  return <primitive object={scene} />
}
```

## Performance Guidelines

- Keep polygon count under 10,000 for mobile compatibility
- Use texture atlases to reduce draw calls
- Compress textures using appropriate formats
- Use LOD (Level of Detail) for distant objects
- Optimize materials for real-time rendering
