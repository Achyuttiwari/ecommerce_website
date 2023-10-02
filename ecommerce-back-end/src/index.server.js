const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

//routes
const userRoutes = require('./routes/user');


//environment variable or you can say constant
env.config();


//mongodb connection 
//mongodb+srv://achyuttiwari34:<password>@cluster0.e8slmzr.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.e8slmzr.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
{
    useNewUrlParser : true,
    useUnifiedTopology : true
}
).then(() => {
    console.log('Database Connected');
});


app.use(bodyParser.urlencoded({
    extended :  true
}));
app.use(bodyParser.json());

app.use('/api', userRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});