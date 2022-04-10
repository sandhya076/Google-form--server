import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import form from "./ROutes/form.js";
import multer from "multer";
import formDetails from "./models/form.js";
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
export const upload = multer({
  storage: storage,
});

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.post("/form", upload.single("resume"), (req, res) => {
  const newform = new formDetails({
    fullname: req.body.fullname,
    phonenum: req.body.phonenum,
    email: req.body.email,
    university: req.body.university,
    aboutyou: req.body.aboutyou,
    skills: req.body.skills,
    intersted: req.body.intersted,
    others: req.body.others,
    resume: req.body.resume,
  });
  newform
    .save()
    .then(() => {
      res.json("response submitted successfully");
    })
    .catch((error) => console.log(error.message));
});
app.use("/form", form);
// mongoose connection

const CONNECTION_URL =
  "mongodb+srv://sandhya:Sandhya@cluster0.trov7.mongodb.net/mySecondDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port : ${PORT}`))
  )
  .catch((error) => console.log(error.message));
