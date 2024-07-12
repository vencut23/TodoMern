const mongoose = require('mongoose');

async function connectdb() {
    try {
        const connect = await mongoose.connect("mongodb+srv://venkatesh:9865271790a@venkatcluster.jw7fata.mongodb.net/?retryWrites=true&w=majority&appName=venkatcluster");
        console.log('connected man');
    } catch (e) {
        console.log(e);
    }
}

module.exports = connectdb