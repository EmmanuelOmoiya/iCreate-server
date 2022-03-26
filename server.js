const express = require('express');
const port = process.env.PORT || 4080;
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./config/db').uri
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');


dotenv.config();

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Mongo Database successfully connected"))
.catch(err => console.log(err));

app.use(cors({
    origin: '*'
}));

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Api is running');
});

app.use('/api/user', userRoutes);
app.use('/api/project', projectRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, console.log(`Server / Api running on port ${port}`));