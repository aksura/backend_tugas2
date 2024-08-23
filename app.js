const express = require('express');
const app = express();
const port = 3000;
const indexRouter = require('./routes/index');

app.use('/', indexRouter);

// Error handling middleware
/*
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
*/

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
