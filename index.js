const express = require("express");
const app = express();
const router = require('./router');
const PORT = 3001;


app.use(router);
app.listen(process.env.PORT || PORT, ()=> {
    console.log(`Listening at port ${PORT}`);
});