const express = require('express');
const app = express();
const bcrypt = require("bcrypt");
const { z } = require('zod');
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');

const userRouter = express.Router();

   //Input Validation using ZOD
   const signupBody = z.object({
    firstname:z.string().min(3).max(50),
    lastname:z.string().min(3).max(50),
    username:z.string()
    .regex(/^[a-z0-9_]{3,20}$/,{message:"Username must be 3-20 characters long and contain only letters, numbers, or underscores"}),
    //^ and $ represents the start and end of the string//
    password:z.string()
    .min(8, { message: "Must be 8 or more characters long" })
    .regex(/[A-Z]/,{ message: "Must include at least one uppercase letter" })
    .regex(/[0-9]/,{ message: "Must include at least one digit" })
}) 

userRouter.post("/signup",async (req,res)=>{

       const result = signupBody.safeParse(req.body);   
        if(!result.success){
            return res.status(411).json({
                message: "Incorrect Details."
            })
        }

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;

    //Hashing the pass
    const hashedPassword = await bcrypt.hash(password, 5)

    //Duplicate user check
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken!"
        })
    }

    const userfortoken = await User.create({
        username:username,
        firstname:firstname,
        lastname:lastname,
        password:hashedPassword
    })

    //Creating a token
    const userId = userfortoken._id;

    const UserAccount = await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const balance = UserAccount.balance;
    // console.log("Balance:",balance)
    const token = jwt.sign({
        userId
    },JWT_SECRET)

    res.status(200).json({
        message:"Signed up successfully!",
        UserId:userId,
        token:token,
        balance:balance
    })
})

//ZOD
const signinBody = z.object({
    username: z.string(),
	password: z.string()
})

userRouter.post("/signin",async (req,res)=>{
    const parseResult = signinBody.safeParse(req.body);
    
    if (!parseResult.success) {
        return res.status(400).json({
            message: "Incorrect details."
        });
    }

    const { username, password } = req.body;

    const userfound = await User.findOne({ username });

    const hashedPassword = userfound.password;   
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    } 

    if (userfound) {
        const userId = userfound._id;

        //Fetching the account details of the user
        const account = await Account.findOne({
            userId
        })

        const balance = account.balance;
        // console.log("Balance:",balance)

        const token = jwt.sign({
            userId
        },JWT_SECRET);

        res.status(200).json({
        message:"Signed in successfully",
        token:token,
        userId:userId,
        balance:balance
        // HashedPassword:hashedPassword,
        // realPassword:password
    })
    } else {
        res.status(411).json({
            message:"Error while signing in/No user found"
        })
    }
})

//ZOD 
const updateBody = z.object({
	password: z.string().optional(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
})

userRouter.put("/updateinfo",authMiddleware,async (req,res)=>{
    const result = updateBody.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "Error while updating information"
        })
    }

    const changedData = result.data; //Extracting the updated data//

    try {
        await User.updateOne({ _id: req.userId },changedData);

        return res.json({
            message: "Updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while updating information"
        })
    }  
})

userRouter.get("/bulk",async (req,res)=>{
    const queryparam = req.query.filter?.trim() || "";

    console.log("Query parameter:", queryparam); //To log the query sent by the user//

    const foundUser = await User.find({
        $or: [
            { firstname: { "$regex": queryparam, "$options": "i" } },
            { lastname: { "$regex": queryparam, "$options": "i" } }
        ]
    })

    res.json({
        user: foundUser.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    });
})

module.exports  = userRouter;
