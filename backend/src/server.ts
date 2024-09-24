import app from "./app";
import mongoose from "mongoose";

import env from "./utils/ValidateEnv";

const PORT = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING!)
    .then(() => {
        console.log("MongoDb Connected");
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}...`);
        })
    })
    .catch(console.error)