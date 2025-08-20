"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import api from "../api/axios"
import { SettingsIcon, Save } from "lucide-react"
import toast from "react-hot-toast"

const Settings = () => {
  const [config, setConfig] = useState({
    autoCloseEnabled: true,
    confidenceThreshold: 0.78,
    slaHours: 24,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    try {
      const response = await api.get("/config")
      setConfig(response.data)
    } catch (error) {
      toast.error("Failed to fetch configuration")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setSaving(true)
      const response = await api.put("/config", config)
      setConfig(response.data)
      toast.success("Configuration updated successfully")
    } catch (error) {
      toast.error("Failed to update configuration")
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setConfig({
      ...config,
      [name]: type === "checkbox" ? checked : type === "number" ? Number.parseFloat(value) : value,
    })
  }

  if (user.role !== "admin") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="text-gray-600 mt-2">You don't have permission to access settings.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-6">
        <SettingsIcon className="h-8 w-8 text-primary mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold">Agent Configuration</h2>
          <p className="text-gray-600 text-sm mt-1">
            Configure how the AI agent handles ticket triage and auto-resolution.
          </p>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Auto-Close Tickets</label>
                <p className="text-sm text-gray-500 mt-1">
                  Automatically resolve tickets when AI confidence is high enough
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="autoCloseEnabled"
                  checked={config.autoCloseEnabled}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confidence Threshold</label>
              <p className="text-sm text-gray-500 mb-3">
                Minimum confidence level (0-1) required for auto-closing tickets
              </p>
              <input
                type="number"
                name="confidenceThreshold"
                value={config.confidenceThreshold}
                onChange={handleChange}
                min="0"
                max="1"
                step="0.01"
                className="input"
                required
              />
              <p className="text-xs text-gray-400 mt-1">Current: {Math.round(config.confidenceThreshold * 100)}%</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SLA Hours</label>
              <p className="text-sm text-gray-500 mb-3">Service Level Agreement response time in hours</p>
              <input
                type="number"
                name="slaHours"
                value={config.slaHours}
                onChange={handleChange}
                min="1"
                className="input"
                required
              />
            </div>

            <div className="pt-4">
              <button type="submit" disabled={saving} className="btn-primary w-full">
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save Configuration"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* System Information */}
      <div className="card mt-6">
        <div className="card-header">
          <h2 className="text-xl font-semibold">System Information</h2>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Environment:</span>
              <span className="ml-2 text-gray-600">Development</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">AI Mode:</span>
              <span className="ml-2 text-gray-600">Stub Mode</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Version:</span>
              <span className="ml-2 text-gray-600">1.0.0</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Last Updated:</span>
              <span className="ml-2 text-gray-600">{new Date(config.updatedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
