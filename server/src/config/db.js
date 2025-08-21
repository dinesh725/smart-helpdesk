const mongoose = require("mongoose")
const logger = require("./logger")

console.log("[debug] Full environment keys available:", Object.keys(process.env))
console.log("[debug] Raw MONGO_URI value:", process.env.MONGO_URI)

const connectDB = async () => {
  try {
    console.log("[v0] Attempting to connect to MongoDB...")

    // Decode first
    const uri = decodeURIComponent(process.env.MONGO_URI)

    console.log("[v0] MONGO_URI exists:", !!process.env.MONGO_URI)
    console.log(
      "[v0] MONGO_URI preview:",
      process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 20) + "..." : "Not set"
    )
    console.log("[v0] Decoded URI preview:", uri.substring(0, 20) + "...")

    // Use decoded URI here
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })

    console.log("[v0] MongoDB connection successful!")
    console.log("[v0] Connected to host:", conn.connection.host)
    console.log("[v0] Database name:", conn.connection.name)
    console.log("[v0] Connection ready state:", conn.connection.readyState)

    logger.info(`MongoDB Connected: ${conn.connection.host}`)
    logger.info(`Database Name: ${conn.connection.name}`)

    mongoose.connection.on("error", (err) => {
      console.error("[v0] MongoDB connection error:", err)
      logger.error("MongoDB connection error:", err)
    })

    mongoose.connection.on("disconnected", () => {
      console.warn("[v0] MongoDB disconnected")
      logger.warn("MongoDB disconnected")
    })

    mongoose.connection.on("reconnected", () => {
      console.log("[v0] MongoDB reconnected")
      logger.info("MongoDB reconnected")
    })
  } catch (error) {
    console.error("[v0] Database connection failed:", error)
    console.error("[v0] Error details:", error.message)
    console.error("[v0] MONGO_URI status:", process.env.MONGO_URI ? "Set" : "Not set")
    logger.error("Database connection failed:", error)
    logger.error("MONGO_URI:", process.env.MONGO_URI ? "Set" : "Not set")
    process.exit(1)
  }
}

module.exports = connectDB
