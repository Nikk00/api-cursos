const express = require('express')
const app = express()
const cursos = require('./api/cursos')
const cors = require('cors')


app.use(cors())
app.use(express.json({ extended: false}))

app.get('/api/cursos', cursos.getAllCurse)
app.get('/api/cursos/:id', cursos.getOneCurse)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`))