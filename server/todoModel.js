const mongoose=require("mongoose");

const todoschema = mongoose.Schema({
    task:{
        type:String
    }
});

module.exports=mongoose.model('Todos',todoschema);