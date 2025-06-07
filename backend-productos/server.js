const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bd1_dawii'
});

//  Porcentaje de productos ACTIVO vs NO ACTIVO
app.get('/api/status-productos', (req, res) => {
    db.query(`
        SELECT status, COUNT(*) AS total
        FROM product
        GROUP BY status
    `, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

//  Cantidad de productos por familia
app.get('/api/total-productos-familia', (req, res) => {
    db.query(`
        SELECT \`family.code\` AS familia, COUNT(*) AS total_productos
        FROM product
        GROUP BY \`family.code\`
        ORDER BY total_productos DESC
    `, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

// Top 10 líneas con mayor valor promedio
app.get('/api/top-lineas-promedio-valor', (req, res) => {
    db.query(`
        SELECT \`line.code\` AS linea, AVG(value) AS promedio_valor
        FROM product
        WHERE value IS NOT NULL
        GROUP BY \`line.code\`
        ORDER BY promedio_valor DESC
        LIMIT 10
    `, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
