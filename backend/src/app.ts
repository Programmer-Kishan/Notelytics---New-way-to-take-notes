import "dotenv/config"
import express, {Request, Response, NextFunction} from "express";
import morgan from "morgan";
import createHttpError, { isHttpError } from 'http-errors';
import session from "express-session";
import MongoStore from 'connect-mongo';
import cors from 'cors';

// import UserModel from "./models/user";
import env from "./utils/ValidateEnv";
import userRoutes from "./routes/user.route";
import notebookRoutes from "./routes/notebook.route";
import noteRoutes from "./routes/note.route";
import uploadRoutes from "./routes/upload.route";

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use("/pdfs", express.static("pdfs"));
app.use("/images", express.static("images"));
app.use("/videos", express.static("videos"));

// app.get("/", async (req, res) => {
//     const users = await UserModel.find().exec();
//     res.status(200).json(users);
// })

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60*60*1000
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    })
}))

app.use("/api/user", userRoutes);
app.use("/api/notebook", notebookRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/upload", uploadRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint Not Found"));
})

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An Unknown Error Occured";
    let errorStatus = 500;
    if (isHttpError(error)) {
        errorMessage = error.message;
        errorStatus = error.status;
    }
    res.status(errorStatus).json({error: errorMessage});
})

export default app;