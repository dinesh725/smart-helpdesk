"use client"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { LogOut, Settings, FileText, Ticket, Home } from "lucide-react"

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">Smart Helpdesk</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                <Link
                  to="/tickets"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/tickets")
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700 hover:text-primary hover:bg-gray-100"
                  }`}
                >
                  <Ticket className="h-4 w-4" />
                  <span>Tickets</span>
                </Link>

                {(user.role === "admin" || user.role === "agent") && (
                  <Link
                    to="/kb"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                      isActive("/kb")
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-700 hover:text-primary hover:bg-gray-100"
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Knowledge Base</span>
                  </Link>
                )}

                {user.role === "admin" && (
                  <Link
                    to="/settings"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                      isActive("/settings")
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-700 hover:text-primary hover:bg-gray-100"
                    }`}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                )}

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>{user.name}</span>
                  <span className="badge badge-secondary">{user.role}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
