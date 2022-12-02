// console.log("i'm started!");
import express from "express";
import mongoose from "mongoose";
import goalRouter from "./routes/goal-routes";
import taskRouter from "./routes/task-routes";
import router from "./routes/user-routes";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/task", taskRouter);
app.use("/api/goal", goalRouter);

mongoose
  .connect(
    // Не работает облако =(
    // "mongodb://u0eixv1kkyqg8sbfvisk:p1EJWj0L6duchP3a6jj3@bdvwaoptvhb1z6e-mongodb.services.clever-cloud.com:27017/bdvwaoptvhb1z6e"
    "mongodb://localhost:27017/TaskTracker"
  )
  .then(() => app.listen(port))
  .then(() => console.log(`connected to DB and listening to localhost ${port}`))
  .catch((err) => console.log(err));

// app.use("/api", (req, res) => {
//   // http://localhost:5000/api
//   res.send("Express is started!");
// });

// app.listen(5000);
