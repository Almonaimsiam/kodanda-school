const app = require('./server.cjs');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 BACKEND ALIVE: http://localhost:${PORT}`);
});