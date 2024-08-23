const express = require('express');
const app = express();
const port = 3000;
const indexRouter = require('./routes/index');
require('dotenv').config();

app.use(express.json());
app.use('/', indexRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    const error = err.name || "ServerError";
    const message = err.message || "Internal server error";
    const status = err.statusCode || 500;
  
    res.status(status).json({ error, message });
  });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
});
