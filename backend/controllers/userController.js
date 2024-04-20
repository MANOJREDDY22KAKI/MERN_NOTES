import mongoose from "mongoose";
import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const RegisterUser = async (req,res)=>{
    try{
        const {name,email,password} = req.body
        if (!name || !email || !password) {
            return res.status(400).send('Please fill all the fields');
            console.log("Please fill all the fields");
        }

        const exist = await User.findOne({email});

        if (exist) {
            return res.status(404).send("User already exists");
            console.log("User already exists");
        }
        const passwordHash = await bcrypt.hash(password,10);
        const newUser = new User({
            name : name,
            email : email,
            password:passwordHash});
        console.log("User created successfully");
        await newUser.save();

        res.status(200).send('User created successfully');
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");

    }
}

const LoginUser = async (req,res)=>{
    try{
        const {email,password} = req.body
        if(!email || !password) {
            console.log("Please fill all the fields");
            return res.status(400).send('Please fill all the fields');
        }

        const exist = await User.findOne({email});

        if(!exist) {
            console.log("User does not exist");
            return res.status(404).send('User does not exist');
        }

        const isMatch = await bcrypt.compare(password,exist.password);
        if ( !isMatch) {
            console.log("Incorrect password");
            return res.status(404).send('Incorrect password');
        }

        const token = jwt.sign({ email: exist.email, id: exist._id }, 'SECRET_KEY', { expiresIn: '1h' });
        
        res.json({ result: exist, token });

        console.log("User logged in successfully");
        res.status(200).send('User logged in successfully');
    }

    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

const  verifyToken = async (req,res)=>{
    try{
        const token = req.header("Authorization")
        if (!token) return res.send(false);
        jwt.verify(token,"SECRET_KEY",async(err,verified)=>{
            if (err) return res.send(false);
            const user = await User.findById(verified.id);
            if (!user) return res.send(false);
            return res.send(true);
        })
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

const LogoutUser = async (req,res)=>{
    try{
        console.log("User logged out successfully");
        res.status(200).send('User logged out successfully');
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

export {RegisterUser,LoginUser,LogoutUser,verifyToken}