"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../api/axios"
import { ArrowLeft, Clock, User, Tag, MessageSquare, Bot, CheckCircle, AlertCircle, Send } from "lucide-react"
import toast from "react-hot-toast"

const TicketDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [ticket, setTicket] = useState(null)
  const [suggestion, setSuggestion] = useState(null)
  const [auditLogs, setAuditLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [replyContent, setReplyContent] = useState("")
  const [replyStatus, setReplyStatus] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (id === "new") {
      navigate("/tickets/new")
      return
    }

    if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
      fetchTicketDetails()
      fetchAuditLogs()
    } else {
      setLoading(false)
      toast.error("Invalid ticket ID")
      navigate("/tickets")
    }
  }, [id, navigate])

  useEffect(() => {
    if (ticket?.agentSuggestionId) {
      fetchSuggestion()
    }
  }, [ticket])

  const fetchTicketDetails = async () => {
    try {
      if (!id || id === "new" || !id.match(/^[0-9a-fA-F]{24}$/)) {
        navigate("/tickets")
        return
      }

      const response = await api.get(`/tickets/${id}`)
      setTicket(response.data)
    } catch (error) {
      console.log("[v0] Fetch ticket error:", error)
      toast.error("Failed to fetch ticket details")
      navigate("/tickets")
    } finally {
      setLoading(false)
    }
  }

  const fetchSuggestion = async () => {
    try {
      const response = await api.get(`/agent/suggestion/${id}`)
      setSuggestion(response.data)
    } catch (error) {
      // Suggestion might not exist yet
      console.log("No suggestion found")
    }
  }

  const fetchAuditLogs = async () => {
    try {
      if (!id || id === "new" || !id.match(/^[0-9a-fA-F]{24}$/)) {
        return
      }

      const response = await api.get(`/tickets/${id}/audit`)
      setAuditLogs(response.data)
    } catch (error) {
      console.log("[v0] Audit logs error:", error)
    }
  }

  const handleReply = async (e) => {
    e.preventDefault()
    if (!replyContent.trim()) return

    try {
      setSubmitting(true)
      const response = await api.post(`/tickets/${id}/reply`, {
        content: replyContent,
        status: replyStatus || undefined,
      })

      setTicket(response.data)
      setReplyContent("")
      setReplyStatus("")
      toast.success("Reply sent successfully")

      // Refresh audit logs
      fetchAuditLogs()
    } catch (error) {
      toast.error("Failed to send reply")
    } finally {
      setSubmitting(false)
    }
  }

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

  const formatDate = (date) => {
    return new Date(date).toLocaleString()
  }

  const getActionIcon = (action) => {
    switch (action) {
      case "TICKET_CREATED":
        return <MessageSquare className="h-4 w-4" />
      case "AGENT_CLASSIFIED":
      case "KB_RETRIEVED":
      case "DRAFT_GENERATED":
        return <Bot className="h-4 w-4" />
      case "AUTO_CLOSED":
      case "REPLY_SENT":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Ticket not found</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => navigate("/tickets")} className="btn-outline mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tickets
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{ticket.title}</h1>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{ticket.createdBy?.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatDate(ticket.createdAt)}</span>
            </div>
            <span className={`badge ${getStatusColor(ticket.status)}`}>{ticket.status.replace("_", " ")}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ticket Description */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Description</h2>
            </div>
            <div className="card-content">
              <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
            </div>
          </div>

          {/* AI Suggestion */}
          {suggestion && (user.role === "admin" || user.role === "agent") && (
            <div className="card">
              <div className="card-header">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-blue-600" />
                  <h2 className="text-lg font-semibold">AI Suggestion</h2>
                  <span className="badge badge-secondary">{Math.round(suggestion.confidence * 100)}% confidence</span>
                </div>
              </div>
              <div className="card-content space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Predicted Category</h3>
                  <span className="badge badge-outline">{suggestion.predictedCategory}</span>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Suggested Reply</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-700 whitespace-pre-wrap">{suggestion.draftReply}</p>
                  </div>
                </div>

                {suggestion.articleIds?.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Referenced Articles</h3>
                    <div className="space-y-2">
                      {suggestion.articleIds.map((article) => (
                        <div key={article._id} className="bg-blue-50 p-3 rounded-md">
                          <h4 className="font-medium text-blue-900">{article.title}</h4>
                          <p className="text-blue-700 text-sm mt-1">{article.body.substring(0, 150)}...</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Conversation */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold">Conversation</h2>
            </div>
            <div className="card-content">
              {ticket.replies?.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No replies yet</p>
              ) : (
                <div className="space-y-4">
                  {ticket.replies.map((reply, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        reply.isAgent
                          ? "bg-blue-50 border-l-4 border-blue-400"
                          : "bg-gray-50 border-l-4 border-gray-400"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {reply.isAgent ? (
                            <Tag className="h-4 w-4 text-blue-600" />
                          ) : (
                            <User className="h-4 w-4 text-gray-600" />
                          )}
                          <span className="font-medium">{reply.author?.name || "System"}</span>
                          {reply.isAgent && <span className="badge badge-secondary text-xs">Agent</span>}
                        </div>
                        <span className="text-sm text-gray-500">{formatDate(reply.timestamp)}</span>
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Reply Form (for agents/admins) */}
          {(user.role === "admin" || user.role === "agent") && (
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold">Send Reply</h2>
              </div>
              <div className="card-content">
                <form onSubmit={handleReply} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reply</label>
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="textarea"
                      rows={4}
                      placeholder="Type your reply here..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Update Status (optional)</label>
                    <select value={replyStatus} onChange={(e) => setReplyStatus(e.target.value)} className="input">
                      <option value="">Keep current status</option>
                      <option value="waiting_human">Waiting for Human</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  <button type="submit" disabled={submitting || !replyContent.trim()} className="btn-primary">
                    <Send className="h-4 w-4 mr-2" />
                    {submitting ? "Sending..." : "Send Reply"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ticket Info */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Ticket Information</h3>
            </div>
            <div className="card-content space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Category</span>
                <p className="text-gray-900 capitalize">{ticket.category}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Status</span>
                <p className="text-gray-900 capitalize">{ticket.status.replace("_", " ")}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Created By</span>
                <p className="text-gray-900">{ticket.createdBy?.name}</p>
              </div>
              {ticket.assignee && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Assigned To</span>
                  <p className="text-gray-900">{ticket.assignee.name}</p>
                </div>
              )}
              <div>
                <span className="text-sm font-medium text-gray-500">Created</span>
                <p className="text-gray-900">{formatDate(ticket.createdAt)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Last Updated</span>
                <p className="text-gray-900">{formatDate(ticket.updatedAt)}</p>
              </div>
            </div>
          </div>

          {/* Audit Timeline */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Activity Timeline</h3>
            </div>
            <div className="card-content">
              {auditLogs.length === 0 ? (
                <p className="text-gray-500 text-sm">No activity logged</p>
              ) : (
                <div className="space-y-3">
                  {auditLogs.map((log) => (
                    <div key={log._id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">{getActionIcon(log.action)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{log.action.replace(/_/g, " ").toLowerCase()}</p>
                        <p className="text-xs text-gray-500">{formatDate(log.timestamp)}</p>
                        {log.meta && Object.keys(log.meta).length > 0 && (
                          <div className="text-xs text-gray-400 mt-1">
                            {log.meta.confidence && <span>Confidence: {Math.round(log.meta.confidence * 100)}%</span>}
                            {log.meta.articleCount && <span>Articles: {log.meta.articleCount}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetail
