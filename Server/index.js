// express server import
const express = require("express");
const app = express();

// env import

// All routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");


// databse import
const databse = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

// import Port
dotenv.config();
const PORT = process.env.PORT || 4000;

// database connect
databse.connect();
// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", //frontend connect with backend
    credentials: true,
  })
);

// when we upload any file on server
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp",
  })
);

// cloudinary connection
cloudinaryConnect();

// route
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/contact", require("./routes/Contact"));
app.use("/api/v1/reach", contactUsRoute);

// default routes
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running......",
  });
});

// activate server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
