// src/app.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jobRoutes = require('./router/web');
const authRouter = require('./router/authRouter');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/v1/auth/", authRouter);
app.use(jobRoutes);

module.exports = app;
