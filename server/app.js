const express = require('express');
const router = require('./routes/routes');
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());

app.use('/', router);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})