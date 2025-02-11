const express = require("express");
const rootRouter = require('./routes/index')
const cors = require("cors")
const { JWT_SECRET } = require('./config.js');

const app = express();
app.use(cors({ origin: '*' }));
app.options('*', cors()); 
app.use(express.json());


app.use("/api/v1", rootRouter);

app.listen(3000,()=>{
    console.log(`Listening at 3000`)
});