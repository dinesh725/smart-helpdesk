"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import api from "../api/axios"
import { Plus, Search, Edit, Trash2, Eye, EyeOff, Save, X } from "lucide-react"
import toast from "react-hot-toast"

const KBPage = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tags: "",
    status: "draft",
  })
  const { user } = useAuth()

  useEffect(() => {
    fetchArticles()
  }, [searchQuery])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchQuery) {
        params.append("query", searchQuery)
      }

      const response = await api.get(`/kb?${params.toString()}`)
      setArticles(response.data)
    } catch (error) {
      toast.error("Failed to fetch articles")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const articleData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      }

      if (editingArticle) {
        const response = await api.put(`/kb/${editingArticle._id}`, articleData)
        setArticles(articles.map((article) => (article._id === editingArticle._id ? response.data : article)))
        toast.success("Article updated successfully")
      } else {
        const response = await api.post("/kb", articleData)
        setArticles([response.data, ...articles])
        toast.success("Article created successfully")
      }

      resetForm()
    } catch (error) {
      toast.error("Failed to save article")
    }
  }

  const handleEdit = (article) => {
    setEditingArticle(article)
    setFormData({
      title: article.title,
      body: article.body,
      tags: article.tags.join(", "),
      status: article.status,
    })
    setShowForm(true)
  }

  const handleDelete = async (articleId) => {
    if (!window.confirm("Are you sure you want to delete this article?")) {
      return
    }

    try {
      await api.delete(`/kb/${articleId}`)
      setArticles(articles.filter((article) => article._id !== articleId))
      toast.success("Article deleted successfully")
    } catch (error) {
      toast.error("Failed to delete article")
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      body: "",
      tags: "",
      status: "draft",
    })
    setEditingArticle(null)
    setShowForm(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (user.role !== "admin" && user.role !== "agent") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="text-gray-600 mt-2">You don't have permission to access the knowledge base.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
        {user.role === "admin" && (
          <button onClick={() => setShowForm(true)} className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Article
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

      {/* Article Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{editingArticle ? "Edit Article" : "New Article"}</h2>
                <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                    className="textarea"
                    rows={10}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="input"
                    placeholder="billing, payments, refunds"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="input">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button type="button" onClick={resetForm} className="btn-outline">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    <Save className="h-4 w-4 mr-2" />
                    {editingArticle ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Articles List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-500">
            {searchQuery ? "Try adjusting your search terms." : "Create your first knowledge base article."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <div key={article._id} className="card">
              <div className="card-content">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{article.body.substring(0, 200)}...</p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`badge ${article.status === "published" ? "badge-default" : "badge-secondary"}`}>
                      {article.status === "published" ? (
                        <>
                          <Eye className="h-3 w-3 mr-1" /> Published
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3 mr-1" /> Draft
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>By {article.createdBy?.name}</span>
                    <span>{new Date(article.updatedAt).toLocaleDateString()}</span>
                    {article.tags.length > 0 && (
                      <div className="flex space-x-1">
                        {article.tags.map((tag) => (
                          <span key={tag} className="badge badge-outline text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {user.role === "admin" && (
                    <div className="flex space-x-2">
                      <button onClick={() => handleEdit(article)} className="text-blue-600 hover:text-blue-800">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(article._id)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default KBPage
