import { RequestHandler } from "express"
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

import UserModel from "../models/user"

export const getAuthenticatedUser: RequestHandler = async(req, res, next) => {
    try {
        const user = await UserModel.findById(req.session.userId).exec();
        res.status(200).json({
            username: user?.username,
            email: user?.email,
            _id: user?._id,
            notebooks: user?.notebooks,
            notebookNames: user?.notebookNames
        });
    } catch (error) {
        next(error);
    }
}


interface SignUpBody {
    username: string,
    email: string,
    password: string
}

export const SignUp:RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const {username, email, password: passwordRaw} = req.body;

    try {
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "parameter missing");
        }

        const existingUsername = await UserModel.findOne({username: username}).exec();

        if (existingUsername) {
            throw createHttpError(409, "Username is already taken please try a different one");
        }

        const existingEmail = await UserModel.findOne({email: email}).exec();

        if (existingEmail) {
            throw createHttpError(409, "Email is already taken please try a different one");
        }

        const hashedPassword = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            username: username, email: email, password: hashedPassword
        })

        // TODO: add the user to session
        req.session.userId = newUser._id;
        req.session.name = newUser.username;

        res.status(200).json({
            username: newUser?.username,
            email: newUser?.email,
            _id: newUser?._id,
            notebooks: newUser?.notebooks,
            notebookNames: newUser?.notebookNames
        });
    } catch (error) {
        next(error);
    }
}

interface LoginBody {
    username: string,
    password: string,
}

export const Login:RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const {username, password} = req.body;
    console.log(username, password);

    try {
        if (!username || !password) {
            throw createHttpError(401, "Parameters missing");
        }

        const user = await UserModel.findOne({username: username}).select("+password").exec();

        if (!user) {
            throw createHttpError(400, "Invalid Credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw createHttpError(400, "Invalid Credentials");
        }
        user['password'] = 'Not Allowed to see';

        // TODO: Add user session here
        req.session.userId = user._id;
        req.session.name = user.username;

        
        res.status(200).json({
            username: user?.username,
            email: user?.email,
            _id: user?._id,
            notebooks: user?.notebooks,
            notebookNames: user?.notebookNames
        });

    } catch (error) {
        next(error);
    }
}