const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

class Database{
    static async connect(){
        try {
            
            await mongoose.connect(process.env.MONGODB_URI,{
                useNewUrlParser:true,
                useUnifiedTopology:true
            });
            console.log("Database connected successfully");
        }
        catch(error){
            console.log(error)
            throw error;
            
            
        }
    }
}

module.exports = Database;