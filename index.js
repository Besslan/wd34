require("dotenv/config");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const { authRouter } = require("./routes/auth");
const { userRouter } = require("./routes/users");
const { postRouter } = require("./routes/posts");
const { commentRouter } = require("./routes/comments");
const { errorHandler } = require("./middlewares/errorHandler");

require("./db");

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "client", "build")));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
