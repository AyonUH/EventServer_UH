// import modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const routeGenericProps = require("./routes/genericPropertyRoutes");
const routeEventData = require("./routes/eventDataRoutes");

require("dotenv").config();

// app
const app = express();

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ CONNECTED TO DATABASE SUCCESSFULLY ✅"))
  .catch((err) => console.log("❌ CONNECTING TO DATABASE FAILED!!! ❌", err));

// middleware
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// port
const port = process.env.port || 8080;

// listener
app.listen(port, () => console.log(`🌐 Server is running on port: ${port} 🌐`));

// routes
app.use("/genericProp", routeGenericProps);
app.use("/eventData", routeEventData);
