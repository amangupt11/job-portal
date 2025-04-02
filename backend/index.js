import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicantionRoute from "./routes/application.route.js";
import path from "path";

dotenv.config({});

const PORT = process.env.PORT || 3000;
const app = express();
const _dirname = path.resolve();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'https://jobportal-aman.onrender.com',
    credentials:true
}
app.use(cors(corsOptions));

//Routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicantionRoute);

//Serve frontend
app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})

app.listen(PORT,()=>{
    connectDB();
    console.log(`server is running ${PORT}`);
})