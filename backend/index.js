const dotenv = require('dotenv');
const app = require('./app');
const Database = require('./config/database');


dotenv.config();
<<<<<<< HEAD

const app = express();


// Middleware
app.use(cors());
// middleware for parsing request body
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
    res.send('Welcome to The Tale Realm Backend!');
});

=======
>>>>>>> e87faf5f88b45346f7ad16f6397e1d825b790857
const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
    Database.connect();
});