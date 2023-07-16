import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mainRoutes from "./src/routes/index.js";
import { corsOptions } from "./cors.config.js";
import connectMongoDB from "./src/helpers/mongoose.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// connect mongo db
connectMongoDB();

// apply middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// attach main routes
app.use("/", mainRoutes);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
