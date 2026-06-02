const { Router } = require('express')
const router = Router()
const verificarToken = require('../middleware/verificarToken')
const verificarRol = require('../middleware/verificarRol')

// Estas son rutas de ejemplo. Deberías tener un peliculasController para manejarlas.
// Por ahora, devuelven un JSON para que el servidor pueda arrancar.

router.get('/', (req, res) => {
  res.json({ message: 'Endpoint de obtener todas las películas' })
})

router.post('/', verificarToken, (req, res) => {
  res.status(201).json({ message: 'Endpoint de crear una película (protegido)' })
})

router.put('/:id', verificarToken, verificarRol('admin'), (req, res) => {
  res.json({ message: `Endpoint de actualizar película ${req.params.id} (protegido, solo admin)` })
})

router.delete('/:id', verificarToken, verificarRol('admin'), (req, res) => {
  res.json({ message: `Endpoint de eliminar película ${req.params.id} (protegido, solo admin)` })
})

module.exports = router