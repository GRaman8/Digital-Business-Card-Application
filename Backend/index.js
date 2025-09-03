const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require("../Backend/config");
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/users", userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. http://localhost:${PORT}`);
});
