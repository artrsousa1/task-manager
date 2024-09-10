require('dotenv').config();
const express = require('express');
const router = require('./routes/router');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

const db = require('./models');

const settings = {
    origin: ['http://localhost:3000'],
    credentials: true
}

db.sequelize.sync().then(() => {
    console.log(`[db] Connected to the database: ${process.env.MYSQL_DATABASE}`);
});

app.use(cors(settings));
app.use(express.json());
app.use('/api',router);

app.listen(port, () => {
    console.log(`[server] Server is running at http://localhost:${port}`);
});

module.exports = app;

