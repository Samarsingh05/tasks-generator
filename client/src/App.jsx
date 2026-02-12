import { useState } from "react"
import { generateSpec } from "./utils/api"
import { Sparkles, Users, Target, AlertTriangle, Clock, CheckCircle, Loader2, History, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [form, setForm] = useState({
    goal: "",
    users: "",
    constraints: "",
    template: "web",
    risks: ""
  })

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showHistory, setShowHistory] = useState(false)
  const [history, setHistory] = useState([])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  const handleGenerate = async () => {
    if (!form.goal.trim() || !form.users.trim()) {
      setError("Please fill in the required fields")
      return
    }

    setLoading(true)
    setError("")
    
    try {
      const data = await generateSpec(form)
      setResult(data)
    } catch (err) {
      setError("Failed to generate tasks. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const loadHistory = async () => {
    try {
      const data = await getHistory()
      setHistory(data)
      setShowHistory(true)
    } catch (err) {
      console.error("Failed to load history:", err)
    }
  }

  const getHistory = async () => {
    const res = await fetch("http://localhost:5001/api/specs/history")
    return res.json()
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 w-full overflow-x-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Tasks Generator
            </h1>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          <p className="text-gray-400 text-base sm:text-lg lg:text-xl px-4">
            Transform your ideas into actionable user stories and engineering tasks
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full">
          {/* Form Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:sticky lg:top-8 lg:h-fit"
          >
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-800/50 shadow-2xl w-full">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-white">
                  Project Details
                </h2>
              </div>

              <div className="space-y-5 sm:space-y-6">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Feature Goal <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="goal"
                    placeholder="What do you want to build? (e.g., user authentication system)"
                    onChange={handleChange}
                    value={form.goal}
                    className="w-full p-3 sm:p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none h-20 sm:h-24"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target Users <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    <input
                      name="users"
                      placeholder="Who will use this? (e.g., end users, administrators)"
                      onChange={handleChange}
                      value={form.users}
                      className="w-full p-3 sm:p-4 pl-10 sm:pl-12 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Type
                  </label>
                  <select
                    name="template"
                    onChange={handleChange}
                    value={form.template}
                    className="w-full p-3 sm:p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="web" className="bg-gray-900">🌐 Web Application</option>
                    <option value="mobile" className="bg-gray-900">📱 Mobile App</option>
                    <option value="internal" className="bg-gray-900">🏢 Internal Tool</option>
                  </select>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Constraints
                  </label>
                  <textarea
                    name="constraints"
                    placeholder="Any limitations or requirements? (e.g., budget, timeline, technology stack)"
                    onChange={handleChange}
                    value={form.constraints}
                    className="w-full p-3 sm:p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none h-16 sm:h-20"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    Risks & Unknowns
                  </label>
                  <textarea
                    name="risks"
                    placeholder="What are the potential risks or unknown variables?"
                    onChange={handleChange}
                    value={form.risks}
                    className="w-full p-3 sm:p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none h-16 sm:h-20"
                  />
                </motion.div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base sm:text-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      Generating Tasks...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                      Generate Tasks
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full min-h-0"
          >
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-gray-900/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-gray-800/30 min-h-[400px] flex items-center justify-center w-full"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="w-8 h-8 text-blue-400" />
                    </div>
                    <p className="text-gray-300 text-lg sm:text-xl mb-2">Ready to generate your tasks</p>
                    <p className="text-gray-500 text-sm sm:text-base">Fill in the form to see your user stories and engineering tasks</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6 w-full"
                >
                  {/* User Stories */}
                  <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-800/50 w-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        User Stories
                      </h3>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      {result.stories.map((story, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 sm:gap-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
                        >
                          <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-3 h-3 text-blue-400" />
                          </div>
                          <p className="text-gray-200 text-sm sm:text-base leading-relaxed">{story}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Engineering Tasks */}
                  <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-800/50 w-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-green-400 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        Engineering Tasks
                      </h3>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      {result.tasks.map((task, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 + 0.2 }}
                          className="flex items-start gap-3 sm:gap-4 p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl"
                        >
                          <div className="w-6 h-6 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-teal-400 text-xs font-bold">{i + 1}</span>
                          </div>
                          <p className="text-gray-200 text-sm sm:text-base leading-relaxed">{task}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* History Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={loadHistory}
          className="fixed bottom-6 right-6 p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40"
        >
          <History className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>

        {/* History Modal */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowHistory(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-gray-800"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">Recent Generations</h3>
                  <button
                    onClick={() => setShowHistory(false)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div className="space-y-4">
                  {history.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No history yet</p>
                  ) : (
                    history.map((item, i) => (
                      <div key={item.id} className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium text-white text-sm sm:text-base">{item.goal}</h4>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">Users: {item.users}</p>
                        <div className="flex gap-2 flex-wrap">
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                            {item.template}
                          </span>
                          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">
                            {item.stories?.length || 0} stories
                          </span>
                          <span className="px-3 py-1 bg-teal-500/20 text-teal-300 text-xs rounded-full">
                            {item.tasks?.length || 0} tasks
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
