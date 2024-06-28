const express = require('express');
const cors = require('cors');
const db = require('./conn/db');
const authRouter = require('./routes/authRouter');
const testRouter = require('./routes/testRoutes');
const questionRouter = require('./routes/questionRoutes');
const submissionRouter = require('./routes/submissionRoutes');

const app = express();

require('dotenv').config();
app.use(cors());
app.use(express.json());


app.use("/user", authRouter);
app.use("/test", testRouter);
app.use("/question", questionRouter);
app.use("/submission", submissionRouter);





db.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});

app.listen(process.env.PORT, () => {
    console.log(`server is started with PORT ${process.env.PORT}`);
})