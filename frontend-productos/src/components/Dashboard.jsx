import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [statusProductos, setStatusProductos] = useState([]);
    const [totalProductosFamilia, setTotalProductosFamilia] = useState([]);
    const [topLineasPromedioValor, setTopLineasPromedioValor] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/status-productos')
            .then(res => res.json())
            .then(data => setStatusProductos(data));

        fetch('http://localhost:5000/api/total-productos-familia')
            .then(res => res.json())
            .then(data => setTotalProductosFamilia(data));

        fetch('http://localhost:5000/api/top-lineas-promedio-valor')
            .then(res => res.json())
            .then(data => setTopLineasPromedioValor(data));
    }, []);

    const bigChartStyle = {
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        backgroundColor: '#fff'
    };

    const smallChartStyle = {
        maxWidth: '300px',
        margin: '20px auto',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        backgroundColor: '#fff'
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#222' }}>Dashboard de Productos</h2>

            <div style={bigChartStyle}>
                <h3 style={{ textAlign: 'center' }}>Cantidad de Productos por Familia</h3>
                <Bar
                    data={{
                        labels: totalProductosFamilia.map(item => item.familia),
                        datasets: [{
                            label: 'Total Productos',
                            data: totalProductosFamilia.map(item => item.total_productos),
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        }]
                    }}
                />
            </div>

            <div style={bigChartStyle}>
                <h3 style={{ textAlign: 'center' }}>Top 10 Líneas con Mayor Valor Promedio</h3>
                <Line
                    data={{
                        labels: topLineasPromedioValor.map(item => item.linea),
                        datasets: [{
                            label: 'Promedio Valor (USD)',
                            data: topLineasPromedioValor.map(item => item.promedio_valor),
                            borderColor: 'rgba(255, 159, 64, 1)',
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        }]
                    }}
                />
            </div>

            <div style={smallChartStyle}>
                <h3 style={{ textAlign: 'center' }}>Porcentaje de Productos Activo vs No Activo</h3>
                <Pie
                    data={{
                        labels: statusProductos.map(item => item.status),
                        datasets: [{
                            label: 'Total',
                            data: statusProductos.map(item => item.total),
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(255, 99, 132, 0.6)'
                            ],
                        }]
                    }}
                />
            </div>
        </div>
    );
};

export default Dashboard;
