const dotenv = require('dotenv');
const app = require('./app');
const Database = require('./config/database');


dotenv.config();
const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
    Database.connect();
});