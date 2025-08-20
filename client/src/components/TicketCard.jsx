import { Link } from "react-router-dom"
import { Clock, User, Tag } from "lucide-react"

const TicketCard = ({ ticket }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800"
      case "triaged":
        return "bg-yellow-100 text-yellow-800"
      case "waiting_human":
        return "bg-orange-100 text-orange-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "billing":
        return "bg-purple-100 text-purple-800"
      case "tech":
        return "bg-red-100 text-red-800"
      case "shipping":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Link to={`/tickets/${ticket._id}`} className="block">
      <div className="card hover:shadow-md transition-shadow cursor-pointer">
        <div className="card-content">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{ticket.title}</h3>
            <div className="flex space-x-2 ml-4">
              <span className={`badge ${getStatusColor(ticket.status)}`}>{ticket.status.replace("_", " ")}</span>
              <span className={`badge ${getCategoryColor(ticket.category)}`}>{ticket.category}</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{ticket.description}</p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{ticket.createdBy?.name || "Unknown"}</span>
              </div>
              {ticket.assignee && (
                <div className="flex items-center space-x-1">
                  <Tag className="h-4 w-4" />
                  <span>Assigned to {ticket.assignee.name}</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatDate(ticket.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TicketCard
