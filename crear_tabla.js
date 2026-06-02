const pool = require('./db')

const crearTabla = async () => {
  try {
    await pool.query(`
      CREATE TABLE usuarios (
        id            SERIAL PRIMARY KEY,
        nombre        VARCHAR(100) NOT NULL,
        email         VARCHAR(150) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        rol           VARCHAR(20) NOT NULL DEFAULT 'usuario'
                      CHECK (rol IN ('usuario', 'admin')),
        activo        BOOLEAN DEFAULT true,
        created_at    TIMESTAMPTZ DEFAULT NOW()
      );
    `)
    console.log('¡Tabla usuarios creada exitosamente!')
  } catch (err) {
    console.error('Error al crear la tabla:', err.message)
  } finally {
    pool.end()
  }
}

crearTabla()