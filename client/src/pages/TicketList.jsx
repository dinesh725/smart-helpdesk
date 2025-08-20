"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import TicketCard from "../components/TicketCard"
import api from "../api/axios"
import { Plus, Search, Filter } from "lucide-react"
import toast from "react-hot-toast"

const TicketList = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [showMyTickets, setShowMyTickets] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    fetchTickets()
  }, [filter, showMyTickets])

  const fetchTickets = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()

      if (filter !== "all") {
        params.append("status", filter)
      }

      if (showMyTickets || user.role === "user") {
        params.append("my", "true")
      }

      const response = await api.get(`/tickets?${params.toString()}`)
      setTickets(response.data)
    } catch (error) {
      toast.error("Failed to fetch tickets")
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
        <Link to="/tickets/new" className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          New Ticket
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <select value={filter} onChange={(e) => handleFilterChange(e.target.value)} className="input py-1 text-sm">
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="triaged">Triaged</option>
              <option value="waiting_human">Waiting for Human</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {(user.role === "admin" || user.role === "agent") && (
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showMyTickets}
                onChange={(e) => setShowMyTickets(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-700">Show only my tickets</span>
            </label>
          )}
        </div>
      </div>

      {/* Tickets */}
      {tickets.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
          <p className="text-gray-500 mb-4">
            {filter === "all" ? "You haven't created any tickets yet." : `No tickets with status "${filter}" found.`}
          </p>
          <Link to="/tickets/new" className="btn-primary">
            Create your first ticket
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TicketList
