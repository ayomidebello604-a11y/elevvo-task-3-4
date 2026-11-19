import express from "express";
import type { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors"
import userRoute from "./routes/user.route.ts";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend-domain.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
        //if there is  no origin e.g. postman and thunder client,allow
      if (!origin) return callback(null, true);

      //if the origin matches,let the request pass
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }// or else throw error
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], //Permitted Req. method
    allowedHeaders: ["Content-Type", "Authorization"],  // Allowed headers
    credentials: true, // permitting the sending of cookies or request headers
  })
);
app.use(helmet());


const requestLogger = (req: Request, res: Response, next: NextFunction) => { 
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`); 
  next(); 
}; 
app.use(requestLogger);
app.use(express.json());


app.use("/api/users", userRoute);

export default app;