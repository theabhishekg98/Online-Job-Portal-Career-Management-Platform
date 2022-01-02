const mongoose = require('mongoose');
// const uri = 'mongodb+srv://root:root@cluster0.n7afn.mongodb.net/indeedDb?retryWrites=true&w=majority';
// const uri = 'mongodb+srv://root:root@cluster0.n7afn.mongodb.net/ubereatsdb?retryWrites=true&w=majority';
const uri = 'mongodb+srv://root:root@cluster0.qrjew.mongodb.net/indeedDb?retryWrites=true&w=majority';

var options = {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(uri, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});