require('dotenv').config();
const express = require('express');
const router = require('./routes/router');
const User = require('./models/Users');
const Task = require('./models/Task');

const app = express();
const port = process.env.PORT || 8000;

const db = require('./models');

db.sequelize.sync().then(() => {
    console.log(`[db] Connected to the database: ${process.env.DB_NAME}`);
});

app.use(express.json());
app.use('/api',router);

app.listen(port, () => {
    console.log(`[server] Server is running at http://localhost:${port}`);
});

