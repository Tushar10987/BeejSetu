# Oilseeds Value-Chain Platform

A production-ready, end-to-end AI-enabled value-chain platform for oilseeds that connects farmers, FPOs, processors and retailers, supporting predictive analytics, advisories, real-time procurement/storage visibility, farmer→market linkages, and credit & insurance facilitation.

## 🚀 Features

### Core Platform
- **Multi-stakeholder Management**: Farmers, FPOs, Processors, Retailers
- **Predictive Analytics**: Weather forecasting, pest advisories, yield prediction
- **Real-time Visibility**: Procurement tracking, storage monitoring, inventory management
- **Farmer-Market Linkages**: Direct connections between farmers and buyers
- **Credit & Insurance**: Facilitation module for financial services

### 3D Visualizations
- **Interactive 3D Map**: Warehouse markers, farm extrusions, animated truck routes
- **Traceability Timeline**: 3D animation of batch journey from farm to retailer
- **Real-time Monitoring**: Live inventory overlays, temperature monitoring
- **Performance Modes**: High/Balanced/Low graphics settings
- **Mobile Fallback**: Responsive 2D views for mobile devices

## 🏗️ Architecture

```
├── apps/
│   ├── frontend/          # React + TypeScript + R3F
│   ├── backend/           # Node.js + Express + PostgreSQL
│   └── ml-service/        # Python + FastAPI + ML models
├── packages/
│   ├── shared/            # Shared types and utilities
│   └── ui-components/     # Reusable UI components
├── 3d-assets/             # GLTF models, textures, HDRI
└── scripts/               # Build and setup scripts
```

## 🛠️ Tech Stack

### Frontend
- **React 18** + **TypeScript** + **Tailwind CSS**
- **3D**: React Three Fiber (R3F) + @react-three/drei
- **Animation**: Framer Motion + React Spring
- **Maps**: Mapbox GL JS + Deck.gl
- **Charts**: Recharts + Chart.js

### Backend
- **Node.js** + **Express** + **TypeScript**
- **Database**: PostgreSQL + Prisma ORM
- **Cache**: Redis
- **Authentication**: JWT
- **File Upload**: Multer + AWS S3

### ML Service
- **Python** + **FastAPI**
- **ML Libraries**: scikit-learn, pandas, numpy
- **Weather API**: OpenWeatherMap
- **Computer Vision**: OpenCV (for pest detection)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### Local Development

1. **Clone and setup**:
   ```bash
   git clone <repository-url>
   cd oilseeds-value-chain-platform
   npm run setup
   ```

2. **Start development environment**:
   ```bash
   # Option 1: Docker (recommended)
   npm run docker:dev

   # Option 2: Local development
   npm run dev
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - ML Service: http://localhost:3002
   - 3D Demo: http://localhost:3000/3d-map

### 3D Assets Setup

1. **Generate sample assets**:
   ```bash
   npm run setup:assets
   ```

2. **Compress GLTF models**:
   ```bash
   cd 3d-assets
   node compress-models.js
   ```

## 🎮 3D Features Demo

### Interactive 3D Map
- Navigate to http://localhost:3000/3d-map
- Click on warehouse markers to view inventory
- Watch animated truck routes in real-time
- Toggle between High/Balanced/Low performance modes

### Batch Traceability
1. Create a test batch in the system
2. Navigate to traceability section
3. Enter batch ID to see 3D journey animation
4. View ledger events and timestamps

### Performance Testing
- Use the performance toggle in the UI
- Monitor FPS with browser dev tools
- Test on different devices and networks

## 📱 Mobile Support

The platform includes:
- **Progressive Web App (PWA)** capabilities
- **Offline functionality** for farmers
- **Responsive design** with mobile-first approach
- **Graceful degradation** on low-power devices
- **Touch-friendly 3D controls**

## 🔧 Development Commands

```bash
# Development
npm run dev                 # Start all services
npm run dev:frontend       # Frontend only
npm run dev:backend        # Backend only
npm run dev:3d            # 3D development mode

# Building
npm run build             # Build all services
npm run build:frontend    # Frontend only
npm run build:backend     # Backend only

# Testing
npm run test              # Run all tests
npm run test:frontend     # Frontend tests
npm run test:backend      # Backend tests

# Docker
npm run docker:dev        # Development containers
npm run docker:prod       # Production containers
```

## 🌍 Environment Variables

Create `.env` files in each app directory:

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_MAPBOX_TOKEN=your_mapbox_token
REACT_APP_GOOGLE_MAPS_KEY=your_google_maps_key
```

### Backend (.env)
```env
DATABASE_URL=postgresql://oilseeds:oilseeds123@localhost:5432/oilseeds_dev
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
```

### ML Service (.env)
```env
DATABASE_URL=postgresql://oilseeds:oilseeds123@localhost:5432/oilseeds_dev
OPENWEATHER_API_KEY=your_openweather_key
```

## 📊 Sample Data

The platform includes sample data for:
- 50+ farms with geolocation data
- 10+ warehouses with inventory
- 100+ procurement records
- Weather and pest advisory data
- ML model predictions

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run specific test suites
npm run test:frontend
npm run test:backend

# Run 3D component tests
cd apps/frontend
npm run test:3d
```

## 📈 Performance

### 3D Performance Targets
- **Desktop**: 60 FPS target
- **Mobile**: 30 FPS target
- **Low-power mode**: Simplified rendering

### Optimization Features
- Level-of-Detail (LOD) system
- Instanced rendering for repeated objects
- Frustum culling
- Progressive asset loading
- Draco compression for GLTF models

## 🚀 Deployment

### Production Deployment

1. **Build for production**:
   ```bash
   npm run build
   ```

2. **Deploy with Docker**:
   ```bash
   npm run docker:prod
   ```

3. **Configure environment variables** for production

### Cloud Deployment

The platform is designed to deploy on:
- **AWS**: ECS, RDS, ElastiCache
- **Google Cloud**: GKE, Cloud SQL, Memorystore
- **Azure**: Container Instances, SQL Database, Redis Cache

## 📚 Documentation

- [3D Features Demo](./DEMO_3D.md)
- [Performance Audit](./performanceAudit.md)
- [API Documentation](./docs/API.md)
- [Component Library](./docs/COMPONENTS.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the demo guides

## 🔮 Roadmap

- [ ] Advanced ML models for yield prediction
- [ ] Blockchain integration for traceability
- [ ] IoT sensor integration
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

