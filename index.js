require('dotenv').config()
const express = require('express')
const app = express()

const authRouter = require('./src/routes/auth')
const peliculasRouter = require('./src/routes/peliculas')
const estadisticasRouter = require('./src/routes/estadisticas')

app.use(express.json()) // Middleware para que Express entienda el body en formato JSON

app.use('/api/auth', authRouter)
app.use('/api/peliculas', peliculasRouter)
app.use('/api/estadisticas', estadisticasRouter)

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Error interno del servidor'
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})