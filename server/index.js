require("dotenv").config();

const express = require("express");
const port = process.env.PORT || 7000;
const router = require("./routes/router.js");
const cronroutes = require("./routes/cronroutes.js");
const cors = require("cors");
const path = require("path");
const app = express();

const allowedOrigins = ['http://localhost:8080'];

app.use(cors({
  origin: function (origin, callback) {
    console.log("Request Origin:", origin); // Will log null for Postman or same-origin
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use(router);
app.use("/", cronroutes);

// ✅ Static files
app.use('/images', express.static(path.join(__dirname, "../tasteit_gallery")));

// Production static serving (if needed)
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(__dirname + "/dist/"));
//     app.get("*", (req, res) => {
//         res.sendFile(__dirname + "/dist/index.html");
//     });
// }

app.listen(port, () => {
  console.log("server started on port", port);
});
