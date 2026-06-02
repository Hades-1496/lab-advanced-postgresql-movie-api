const { Router } = require('express')
const router = Router()
const { estadisticasDirectores, estadisticasGeneros } = require('../controllers/peliculasController')

// Rutas para las estadísticas
router.get('/directores', estadisticasDirectores)
router.get('/generos', estadisticasGeneros)

module.exports = router