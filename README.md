# Smart Helpdesk with Agentic Triage

A full-stack MERN application that provides intelligent ticket triage using AI-powered classification, knowledge base retrieval, and automated response generation.

## 🏗️ Architecture

\`\`\`
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │────│  Express API    │────│   MongoDB       │
│   (Port 5173)   │    │  (Port 8080)    │    │  (Port 27017)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                       ┌─────────────────┐
                       │  Agent Service  │
                       │  (Stub/LLM)     │
                       └─────────────────┘
\`\`\`

### Key Components

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Authentication**: JWT-based with role-based access control
- **AI Agent**: Deterministic stub with LLM integration support
- **Real-time**: Audit logging and activity timeline

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local development)
- MongoDB (if running locally)

### One-Command Setup

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd smart-helpdesk

# Start the entire stack
docker-compose up -d

# Seed the database with sample data
docker-compose exec server npm run seed
\`\`\`

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **MongoDB**: localhost:27017

### Test Accounts

After seeding, you can login with:

- **Admin**: admin@helpdesk.com / password123
- **Agent**: agent@helpdesk.com / password123  
- **User**: user@helpdesk.com / password123

## 🎯 Features

### Core Functionality

- ✅ **Authentication & Authorization**: JWT-based auth with Admin/Agent/User roles
- ✅ **Knowledge Base Management**: CRUD operations for articles (Admin only)
- ✅ **Ticket Lifecycle**: Create, view, reply, assign, and resolve tickets
- ✅ **Agentic Triage**: Automated classification, KB retrieval, and response drafting
- ✅ **Audit Logging**: Complete activity timeline with trace IDs
- ✅ **Configuration Management**: Admin settings for auto-close thresholds

### AI Agent Workflow

1. **Classification**: Categorizes tickets (billing/tech/shipping/other) using keyword matching
2. **KB Retrieval**: Finds relevant articles using text search and category matching  
3. **Response Drafting**: Generates suggested replies with article citations
4. **Decision Making**: Auto-closes high-confidence tickets or assigns to humans
5. **Audit Trail**: Logs every step with timestamps and metadata

### User Interface

- 📱 **Responsive Design**: Mobile-first with Tailwind CSS
- 🎨 **Role-based Navigation**: Different views for Admin/Agent/User
- ⚡ **Real-time Updates**: Optimistic UI updates and error handling
- 🔍 **Search & Filtering**: Ticket and KB article search functionality
- 📊 **Activity Timeline**: Visual audit log with action icons

## 🛠️ Development

### Local Development Setup

\`\`\`bash
# Install dependencies
npm install

# Server setup
cd server
npm install
cp .env.example .env
# Edit .env with your configuration

# Client setup  
cd ../client
npm install

# Start development servers
npm run dev
\`\`\`

### Environment Variables

\`\`\`bash
# Server (.env)
PORT=8080
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/helpdesk
JWT_SECRET=your-super-secret-jwt-key
AUTO_CLOSE_ENABLED=true
CONFIDENCE_THRESHOLD=0.78
SLA_HOURS=24
STUB_MODE=true
OPENAI_API_KEY=  # Optional
CLIENT_URL=http://localhost:5173
\`\`\`

### Testing

\`\`\`bash
# Run backend tests
cd server && npm test

# Run frontend tests  
cd client && npm test

# Run all tests
npm test
\`\`\`

## 🤖 Agent Configuration

### Stub Mode (Default)

The system runs in stub mode by default, using deterministic keyword-based classification:

- **Billing**: refund, invoice, payment, charge, billing, money
- **Tech**: error, bug, crash, stack, login, password, technical  
- **Shipping**: delivery, shipment, package, tracking, shipping, order
- **Other**: Everything else

### LLM Integration

To use real LLM providers, set `STUB_MODE=false` and configure API keys:

\`\`\`bash
STUB_MODE=false
OPENAI_API_KEY=your-openai-key
\`\`\`

### Confidence Scoring

- Confidence calculated based on keyword matches and text length
- Configurable threshold (default: 0.78) for auto-closing tickets
- Admin can adjust thresholds via Settings page

## 📊 API Documentation

### Authentication

\`\`\`bash
POST /api/auth/register  # Register new user
POST /api/auth/login     # Login user
\`\`\`

### Tickets

\`\`\`bash
GET    /api/tickets           # List tickets (filtered)
POST   /api/tickets           # Create ticket  
GET    /api/tickets/:id       # Get ticket details
POST   /api/tickets/:id/reply # Add reply (Agent/Admin)
POST   /api/tickets/:id/assign # Assign ticket (Agent/Admin)
\`\`\`

### Knowledge Base

\`\`\`bash
GET    /api/kb        # Search articles
POST   /api/kb        # Create article (Admin)
PUT    /api/kb/:id    # Update article (Admin)  
DELETE /api/kb/:id    # Delete article (Admin)
\`\`\`

### Configuration

\`\`\`bash
GET /api/config       # Get system config (Admin)
PUT /api/config       # Update config (Admin)
\`\`\`

### Audit Logs

\`\`\`bash
GET /api/tickets/:id/audit  # Get ticket audit trail
\`\`\`

## 🔒 Security Features

- **Input Validation**: Joi/express-validator on all endpoints
- **Rate Limiting**: Configurable limits on auth and API endpoints
- **CORS Protection**: Restricted to allowed origins
- **JWT Security**: Short-lived tokens with proper validation
- **Role-based Access**: Granular permissions for different user types
- **No Secret Logging**: Sensitive data excluded from logs

## 📈 Observability

### Logging

- **Structured JSON logs** with Winston
- **Request logging** with Morgan
- **Trace IDs** for request correlation
- **Error tracking** with stack traces (dev only)

### Health Checks

\`\`\`bash
GET /healthz   # Basic health check
GET /readyz    # Readiness check
\`\`\`

### Monitoring

- Request latency tracking
- Agent performance metrics
- Audit trail for all actions
- Error rate monitoring

## 🚢 Deployment

### Docker Production

\`\`\`bash
# Build and deploy
docker-compose -f docker-compose.prod.yml up -d

# Scale services
docker-compose up -d --scale server=3
\`\`\`

### Environment Setup

1. Set production environment variables
2. Configure MongoDB connection string
3. Set secure JWT secret
4. Configure CORS origins
5. Set up SSL/TLS certificates

## 🧪 Testing Strategy

### Backend Tests (Jest)

- Authentication flows
- KB search functionality  
- Ticket creation and triage
- Agent decision logic
- Audit logging

### Frontend Tests (Vitest + RTL)

- Component rendering
- Form validation
- User interactions
- Error handling
- Role-based access

### Integration Tests

- End-to-end ticket workflows
- Agent triage pipeline
- Authentication flows
- API error handling

## 📋 Acceptance Criteria

✅ **User Registration & Login**: JWT-based authentication working
✅ **Ticket Creation**: Users can create tickets that trigger triage  
✅ **Auto-Resolution**: High-confidence tickets auto-close with AI replies
✅ **Human Assignment**: Low-confidence tickets assigned to agents
✅ **Agent Review**: Agents can review, edit, and send replies
✅ **Audit Timeline**: Complete activity log with trace IDs
✅ **KB Search**: Relevant article retrieval for queries
✅ **Stub Mode**: Fully functional without external API keys
✅ **Docker Setup**: One-command deployment with docker-compose

## 🎥 Demo

[Video Walkthrough](link-to-demo-video) - 5-minute demonstration of:
- KB article creation
- Ticket submission and triage
- Agent review and resolution
- Audit timeline visualization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ using the MERN stack and modern development practices**
