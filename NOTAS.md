# Reflexión - PostgreSQL Avanzado

1. **¿Cuándo es contraproducente crear un índice?**
Es contraproducente en tablas que sufren un gran volumen de operaciones de escritura (`INSERT`, `UPDATE`, `DELETE`). Cada vez que se modifican los datos de la tabla, el motor de base de datos también debe actualizar los índices asociados. Si hay muchos índices, el rendimiento de las escrituras se reducirá drásticamente. Además, los índices consumen espacio en disco adicional, por lo que no conviene crearlos para columnas que se usan rara vez para realizar filtrados (`WHERE`) o uniones (`JOIN`).

2. **¿Qué diferencia hay entre `RANK()` y `DENSE_RANK()`?**
La diferencia principal radica en cómo gestionan los empates:
- `RANK()` deja "huecos" en la numeración de los siguientes registros si hay un empate. Por ejemplo, si las películas "Dune" y "Blade Runner 2049" empatan en el puesto 1 de su género con una nota de 8.0, la siguiente película ("Arrival", con 7.9) obtendrá la posición 3.
- `DENSE_RANK()` no deja huecos. En el mismo escenario, "Arrival" obtendría la posición 2, garantizando que todos los rangos sean consecutivos.

3. **¿Por qué el trigger usa `AFTER INSERT OR UPDATE OR DELETE` en lugar de `BEFORE`?**
Se usa `AFTER` porque el propósito principal de un trigger de auditoría es registrar los cambios que *efectivamente se han aplicado* en la base de datos. Si usáramos `BEFORE` y la operación llegase a fallar de forma posterior (por ejemplo, debido a una validación, restricción de clave foránea o unicidad), el trigger igualmente habría insertado el registro en la tabla de auditoría, generando un "falso positivo" de una operación que nunca llegó a completarse.
