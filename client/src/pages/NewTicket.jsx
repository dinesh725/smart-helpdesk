"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../api/axios"
import { ArrowLeft, Send } from "lucide-react"
import toast from "react-hot-toast"

const NewTicket = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "other",
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      setSubmitting(true)
      console.log("[v0] Creating ticket with data:", formData)

      const response = await api.post("/tickets", formData)
      console.log("[v0] Ticket created successfully:", response.data)

      toast.success("Ticket created successfully!")
      navigate(`/tickets/${response.data._id}`)
    } catch (error) {
      console.error("[v0] Ticket creation error:", error)
      console.error("[v0] Error response:", error.response?.data)
      toast.error(error.response?.data?.message || "Failed to create ticket")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => navigate("/tickets")} className="btn-outline mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tickets
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Create New Ticket</h1>
      </div>

      {/* Form */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold">Ticket Details</h2>
          <p className="text-sm text-gray-600 mt-1">
            Please provide as much detail as possible to help us assist you quickly.
          </p>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input"
                placeholder="Brief description of your issue"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} className="input">
                <option value="other">Other</option>
                <option value="billing">Billing</option>
                <option value="tech">Technical</option>
                <option value="shipping">Shipping</option>
              </select>
              <p className="text-sm text-gray-500 mt-1">Select the category that best describes your issue</p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="textarea"
                placeholder="Please describe your issue in detail. Include any error messages, steps you've taken, and what you expected to happen."
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                The more details you provide, the faster we can help resolve your issue
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3">
              <button type="button" onClick={() => navigate("/tickets")} className="btn-outline" disabled={submitting}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !formData.title.trim() || !formData.description.trim()}
                className="btn-primary"
              >
                <Send className="h-4 w-4 mr-2" />
                {submitting ? "Creating..." : "Create Ticket"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Help Text */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Tips for faster resolution:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Include specific error messages if any</li>
          <li>• Describe the steps that led to the issue</li>
          <li>• Mention your browser/device if it's a technical issue</li>
          <li>• Include screenshots if they would be helpful</li>
        </ul>
      </div>
    </div>
  )
}

export default NewTicket
