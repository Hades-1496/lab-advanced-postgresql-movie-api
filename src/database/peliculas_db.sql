-- c peliculas_db

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
-- La contraseña es "admin123" — el hash lo generaremos desde Node
-- Este paso es solo para verificar la tabla; la crearemos vía API en el paso 6
SELECT 'Tabla usuarios creada' AS resultado;