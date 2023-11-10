const dotenv = require('dotenv');

const Database = require('./config/database');
const app = require('./app');
dotenv.config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    Database.connect();
    console.log(`Server is running on port ${PORT}`);
});