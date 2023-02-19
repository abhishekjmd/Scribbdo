const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://Scribbdo:LbWnFi2cwKax48FF@cluster0.vljuwxv.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB!');
});


