# 3D Features Demo Guide

This guide will help you explore the 3D visualizations in the Oilseeds Value Chain Platform.

## Getting Started

1. **Start the Development Server**
   ```bash
   npm run dev
   ```

2. **Open the 3D Map**
   - Navigate to http://localhost:3000/3d-map
   - Wait for the 3D assets to load (progress indicator shows loading percentage)

## Features to Demo

### 1. Interactive 3D Map

**Warehouses**
- Click on any warehouse marker to view:
  - Current inventory count
  - Temperature and humidity sensors
  - Storage details
  - Inventory items

**Farms**
- Farm polygons are extruded based on NDVI (Normalized Difference Vegetation Index)
- Height represents crop health
- Color coding:
  - Green: Healthy (NDVI > 0.7)
  - Yellow: Moderate (NDVI 0.3-0.7)
  - Red: Poor health (NDVI < 0.3)
- Click farms to see detailed NDVI history

**Animated Trucks**
- Watch trucks follow their assigned routes
- Color-coded status indicators:
  - Green: In transit
  - Blue: Available
  - Yellow: Maintenance
  - Gray: Offline
- Click trucks for route details

### 2. Performance Modes

Toggle between performance modes (top-right corner):
- **High**: 60 FPS target, all effects enabled
- **Balanced**: 45 FPS target, some effects
- **Low**: 30 FPS target, minimal effects

### 3. Batch Traceability

1. Navigate to **Traceability** page
2. Enter a batch ID (e.g., `BATCH-001`)
3. View the complete journey:
   - Harvest timeline
   - Collection points
   - Storage locations
   - Processing stages
   - Final delivery

### 4. 3D Controls

**Mouse Controls**
- Left-click + drag: Rotate view
- Right-click + drag: Pan
- Scroll: Zoom in/out
- Left-click objects: Select and view details

**Keyboard Controls**
- Arrow keys: Pan view
- +/- : Zoom in/out
- Space: Reset camera

## Demo Script

### Scene 1: Overview
1. Show the 3D map with all elements
2. Explain color coding and indicators
3. Demonstrate camera controls
4. Switch performance modes

### Scene 2: Warehouse Inspection
1. Click on "Warehouse A"
2. Show inventory metrics
3. Display sensor readings
4. Explain real-time monitoring

### Scene 3: Farm Analysis
1. Hover over farm polygons
2. Show NDVI health indicators
3. Display growth animation
4. Explain predictive analytics

### Scene 4: Logistics Tracking
1. Follow an animated truck
2. Show route progress
3. Display status updates
4. Explain real-time tracking

### Scene 5: Batch Traceability
1. Search for a batch
2. View complete timeline
3. Show all stakeholders involved
4. Demonstrate blockchain integration

## Sample Data

The demo includes:
- 2 Warehouses with sensors
- 2 Farms with NDVI data
- 1 Animated truck on route
- Sample batch traceability records

## Troubleshooting

**Low FPS?**
- Switch to "Low" performance mode
- Close other browser tabs
- Disable browser extensions

**Models Not Loading?**
- Check browser console for errors
- Ensure WebGL is enabled
- Try a different browser

**No Visual Output?**
- Check browser compatibility
- Enable hardware acceleration
- Clear browser cache

## Next Steps

1. Add your own GLTF models
2. Configure real data sources
3. Customize visualizations
4. Set up production deployment

## Support

For issues or questions:
- Check the README.md
- Review performanceAudit.md
- Open an issue on GitHub

