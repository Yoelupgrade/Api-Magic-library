const express = require('express')
const cors = require('cors')
const cloudinary = require('cloudinary').v2
const UserRoutes = require('./src/api/users_sorcerer/user.routes')
const CardsRoutes = require('./src/api/cards/cards.routes')
const MalletsRoutes = require('./src/api/mallets/mallet.routes')
const { setError } = require('./src/utils/error/error')
const documentation = require('./src/utils/documentation/index.json')
const { connectDb } = require('./src/utils/database/db')

const PORT = process.env.PORT || 8080

const app = express()

connectDb()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(cors({
    origin: ['https://mtg-front-angular.vercel.app', 'http://localhost:4200'],
    credentials: true
}))

app.use(express.json({
    limit: '5mb'
}))

app.use(express.urlencoded({ limit: '5mb', extended: true }))

app.use('/api/users', UserRoutes)
app.use('/api/cards', CardsRoutes)
app.use('/api/mallets', MalletsRoutes)
app.use('/documentation', (req, res, next) => {
    return res.json(documentation)})

app.use('*', (req, res, next) => {
    return next(setError(404, 'Route not found'))
})
app.use('/', (req, res, next) => {
    return res.json(documentation)})

// app.use('/', (req, res, next) => {
//     return res.json(documentation)
// })

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error')
})

app.disable('x-powered-by')

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
