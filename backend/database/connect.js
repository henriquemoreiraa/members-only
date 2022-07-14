const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster.igvly.mongodb.net/?retryWrites=true&w=majority`)   

        console.log('Database connected');

    } catch (error)  {
        console.log('Error on database:', error);
        process.exit(1);       
    };
};

module.exports = connectDB;