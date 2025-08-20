# 🚀 Smart Helpdesk Installation Guide

## What You Need to Install

### Required Software

1. **Docker & Docker Compose** (Recommended - Easiest Setup)
   - [Docker Desktop](https://www.docker.com/products/docker-desktop/) for Windows/Mac
   - For Linux: Install Docker Engine + Docker Compose separately

2. **For Local Development** (Optional)
   - **Node.js v18+** (LTS recommended) - [Download here](https://nodejs.org/)
   - **MongoDB v7.0+** - [Download here](https://www.mongodb.com/try/download/community)
   - **Git** - [Download here](https://git-scm.com/)

### System Requirements
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space
- **OS**: Windows 10+, macOS 10.15+, or Linux

## 🐳 Quick Start with Docker (Recommended)

This is the **easiest way** to run the project - everything is automated!

\`\`\`bash
# 1. Clone the repository
git clone <your-repo-url>
cd smart-helpdesk

# 2. Start everything with one command
docker-compose up -d

# 3. Wait for services to start (about 30-60 seconds)
# Check status with:
docker-compose ps

# 4. Seed the database with sample data
docker-compose exec server npm run seed

# 5. Open your browser
# Frontend: http://localhost:5173
# API: http://localhost:8080
\`\`\`

### Test Accounts (After Seeding)
- **Admin**: admin@helpdesk.com / password123
- **Agent**: agent@helpdesk.com / password123  
- **User**: user@helpdesk.com / password123

### Docker Commands
\`\`\`bash
# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart a service
docker-compose restart server

# Remove everything (including data)
docker-compose down -v
\`\`\`

## 💻 Local Development Setup

If you prefer to run without Docker:

### 1. Install Dependencies

\`\`\`bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
\`\`\`

### 2. Database Setup

**Option A: Use Docker for MongoDB only**
\`\`\`bash
docker run -d -p 27017:27017 --name helpdesk-mongo mongo:7
\`\`\`

**Option B: Install MongoDB locally**
- Follow [MongoDB installation guide](https://docs.mongodb.com/manual/installation/)
- Start MongoDB service
- Create database: `helpdesk`

### 3. Environment Configuration

\`\`\`bash
# Copy environment template
cd server
cp .env.example .env

# Edit .env file with your settings
nano .env  # or use your preferred editor
\`\`\`

### 4. Start Development Servers

\`\`\`bash
# Terminal 1: Start backend
cd server
npm run dev

# Terminal 2: Start frontend  
cd client
npm run dev

# Terminal 3: Seed database (one time)
cd server
npm run seed
\`\`\`

## 🔧 Environment Variables

### Server (.env)
\`\`\`bash
# Database
MONGO_URI=mongodb://localhost:27017/helpdesk

# Security
JWT_SECRET=your-super-secret-jwt-key-change-this

# Server Config
PORT=8080
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# AI Agent Settings
STUB_MODE=true
AUTO_CLOSE_ENABLED=true
CONFIDENCE_THRESHOLD=0.78
SLA_HOURS=24

# Optional: Real AI Integration
OPENAI_API_KEY=your-openai-key-here
\`\`\`

### Client (.env)
\`\`\`bash
VITE_API_URL=http://localhost:8080/api
\`\`\`

## 📦 Dependencies Status

All dependencies are **current and stable** as of December 2024:

### Backend (Node.js/Express)
- ✅ **Express 4.18.2** - Latest stable
- ✅ **Mongoose 7.6.3** - Latest stable (MongoDB 7.0+ compatible)
- ✅ **JWT 9.0.2** - Latest stable
- ✅ **Bcrypt 2.4.3** - Latest stable
- ✅ **Winston 3.11.0** - Latest logging library
- ✅ **Helmet 7.1.0** - Latest security middleware

### Frontend (React/Vite)
- ✅ **React 18.2.0** - Latest stable
- ✅ **Vite 4.5.0** - Latest stable build tool
- ✅ **Tailwind CSS 3.3.5** - Latest stable
- ✅ **React Router 6.17.0** - Latest stable
- ✅ **Axios 1.6.0** - Latest stable HTTP client

### Database
- ✅ **MongoDB 7.0** - Latest stable version

## 🧪 Testing

\`\`\`bash
# Run all tests
npm test

# Backend tests only
cd server && npm test

# Frontend tests only
cd client && npm test

# Watch mode for development
npm run test:watch
\`\`\`

## 🚨 Troubleshooting

### Common Issues

**Port Already in Use**
\`\`\`bash
# Kill processes on ports
sudo lsof -ti:5173 | xargs kill -9  # Frontend
sudo lsof -ti:8080 | xargs kill -9  # Backend
sudo lsof -ti:27017 | xargs kill -9 # MongoDB
\`\`\`

**Docker Issues**
\`\`\`bash
# Reset Docker completely
docker-compose down -v
docker system prune -a
docker-compose up -d --build
\`\`\`

**Database Connection Failed**
- Check MongoDB is running: `docker-compose ps`
- Verify connection string in `.env`
- Check firewall settings

**Frontend Can't Connect to API**
- Verify backend is running on port 8080
- Check CORS settings in server
- Verify `VITE_API_URL` in client `.env`

### Getting Help

1. Check the logs: `docker-compose logs -f`
2. Verify all services are running: `docker-compose ps`
3. Test API directly: `curl http://localhost:8080/healthz`
4. Check browser console for frontend errors

## 🎯 What's Included

This is a **complete MERN stack application** with:

### ✅ Backend Features
- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- JWT authentication with role-based access
- AI-powered ticket triage (stub mode included)
- Comprehensive audit logging
- Input validation and security middleware
- Rate limiting and CORS protection

### ✅ Frontend Features  
- Modern React 18 with Vite
- Responsive design with Tailwind CSS
- Role-based navigation and access control
- Real-time UI updates
- Form validation and error handling
- Toast notifications

### ✅ DevOps Features
- Docker containerization
- Development and production configurations
- Database seeding scripts
- Comprehensive testing setup
- Health check endpoints

## 🚀 Next Steps

1. **Start with Docker** - Use `docker-compose up -d` for the easiest setup
2. **Seed the database** - Run `docker-compose exec server npm run seed`
3. **Login and explore** - Use the test accounts to try different roles
4. **Read the main README.md** - For detailed feature documentation
5. **Check the code** - Explore the `server/` and `client/` directories

The application is production-ready with security best practices, comprehensive error handling, and modern development patterns!
