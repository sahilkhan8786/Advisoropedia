require('dotenv').config({
    path: './config.env'
})
const express = require('express')
const cors = require('cors');
const connectDB = require('./DB/ConnectDB');
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth.route');
const productRouter = require('./routes/products.route');
const PORT = process.env.PORT
const app = express();

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRouter)
app.use('/products', productRouter)


const start = async () => {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
        console.log(`server is listening on port ${PORT} `);
    })
}

start()