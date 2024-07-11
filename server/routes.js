const express = require('express');
const Router = express.Router();
const asyncHandler = require("express-async-handler");
const todo = require('./todoModel');
Router.route('/').get(asyncHandler(async (req, res) => {
    const to = await todo.find();
    res.json(to);
}))

Router.route('/').post(asyncHandler(async (req,res)=>{
    let {task}=req.body;
    const to= await todo.create({
     task,
    });
    res.json(to);
}))

Router.route('/delete/:id').delete(asyncHandler(async (req,res)=>{
    const del= await todo.findByIdAndDelete(req.params.id);
    res.json(del);
}));
module.exports = Router;