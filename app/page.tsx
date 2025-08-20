import { ExternalLink, Server, Database, Zap, Shield, Bot, Users } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-600 rounded-full">
              <Bot className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Smart Helpdesk
            <span className="text-blue-600"> with Agentic Triage</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A full-stack MERN application that provides intelligent ticket triage using AI-powered classification,
            knowledge base retrieval, and automated response generation.
          </p>
        </div>

        {/* Architecture Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">System Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">React Client</h3>
              <p className="text-gray-600">Modern React frontend with Vite, Tailwind CSS, and responsive design</p>
              <div className="mt-4 text-sm text-blue-600 font-medium">Port 5173</div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Server className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Express API</h3>
              <p className="text-gray-600">
                RESTful API with JWT authentication, role-based access, and AI agent integration
              </p>
              <div className="mt-4 text-sm text-green-600 font-medium">Port 8080</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Database className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">MongoDB</h3>
              <p className="text-gray-600">Document database for users, tickets, knowledge base, and audit logs</p>
              <div className="mt-4 text-sm text-purple-600 font-medium">Port 27017</div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Bot className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-xl font-semibold">AI-Powered Triage</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Automatic ticket classification (billing/tech/shipping/other)</li>
              <li>• Knowledge base article retrieval</li>
              <li>• Automated response drafting with citations</li>
              <li>• Confidence-based auto-closing or human assignment</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-xl font-semibold">Security & Reliability</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• JWT-based authentication with role-based access</li>
              <li>• Input validation and rate limiting</li>
              <li>• Comprehensive audit logging</li>
              <li>• Error handling and retry mechanisms</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-purple-600 mr-2" />
              <h3 className="text-xl font-semibold">Role-Based Access</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>
                • <strong>Users:</strong> Create tickets, view status and replies
              </li>
              <li>
                • <strong>Agents:</strong> Review triage, edit drafts, resolve tickets
              </li>
              <li>
                • <strong>Admins:</strong> Manage KB, configure agent settings
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Zap className="h-6 w-6 text-yellow-600 mr-2" />
              <h3 className="text-xl font-semibold">Modern Tech Stack</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• React 18 + Vite + Tailwind CSS</li>
              <li>• Node.js + Express + MongoDB</li>
              <li>• Docker containerization</li>
              <li>• Comprehensive testing suite</li>
            </ul>
          </div>
        </div>

        {/* Quick Start */}
        <div className="bg-gray-900 rounded-2xl shadow-xl p-8 text-white mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">🚀 Quick Start</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-400">1. Start the Application</h3>
              <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400"># Clone and start</div>
                <div>docker-compose up -d</div>
                <div className="text-green-400 mt-2"># Seed sample data</div>
                <div>docker-compose exec server npm run seed</div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-400">2. Access the Application</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  <span>Frontend: </span>
                  <code className="bg-gray-800 px-2 py-1 rounded ml-2">http://localhost:5173</code>
                </div>
                <div className="flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  <span>API: </span>
                  <code className="bg-gray-800 px-2 py-1 rounded ml-2">http://localhost:8080</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Test Accounts */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🔑 Test Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Admin</h3>
              <p className="text-sm text-red-600">admin@helpdesk.com</p>
              <p className="text-sm text-red-600">password123</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Agent</h3>
              <p className="text-sm text-blue-600">agent@helpdesk.com</p>
              <p className="text-sm text-blue-600">password123</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">User</h3>
              <p className="text-sm text-green-600">user@helpdesk.com</p>
              <p className="text-sm text-green-600">password123</p>
            </div>
          </div>
        </div>

        {/* Project Structure */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">📁 Project Structure</h2>
          <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm">
            <div className="text-blue-600">smart-helpdesk/</div>
            <div className="ml-4">
              <div className="text-purple-600">├── server/</div>
              <div className="ml-4 text-gray-600">
                <div>├── src/</div>
                <div>│ ├── models/ # MongoDB schemas</div>
                <div>│ ├── routes/ # API endpoints</div>
                <div>│ ├── services/ # AI agent logic</div>
                <div>│ └── middleware/ # Auth & validation</div>
                <div>└── scripts/ # Database seeding</div>
              </div>
              <div className="text-green-600 mt-2">├── client/</div>
              <div className="ml-4 text-gray-600">
                <div>├── src/</div>
                <div>│ ├── pages/ # React components</div>
                <div>│ ├── components/ # Reusable UI</div>
                <div>│ └── context/ # State management</div>
              </div>
              <div className="text-orange-600 mt-2">└── docker-compose.yml</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-600">
          <p className="text-lg">Built with ❤️ using the MERN stack and modern development practices</p>
          <p className="mt-2">
            Ready for production deployment with Docker, comprehensive testing, and security best practices
          </p>
        </div>
      </div>
    </div>
  )
}
