import express, { Application, Request, Response } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import compression from "compression";
import authRouter from "./auth/auth.router";
import companyRouter from "./company/company.router";
import jobRouter from "./job/job.router";
import uploadImageRouter from "./image";
import applicationRouter from "./applications/application.router";

const app: Application = express();
const port = process.env.PORT || 1738;

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 150,
  message: { message: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
// app.use(securityMiddleware);

//routes
app.use("/api/auth", limiter, authRouter);
app.use("/api/company", limiter, companyRouter);
app.use("/api/jobs", limiter, jobRouter);
app.use("/api/application", limiter, applicationRouter);

app.use("/uploads", uploadImageRouter);

app.get("/", (_req: Request, res: Response) => {
  res.send("CPS my guy");
});

const start = () => {
  app.listen(port, () => {
    console.log(`CPS live on http://localhost:${port}`);
  });
};

start();
