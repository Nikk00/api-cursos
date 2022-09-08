const express = require('express')
const app = express()
const cursos = require('./api/cursos')

app.use(express.json({ extended: false}))

app.use('/api/cursos', cursos)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`))