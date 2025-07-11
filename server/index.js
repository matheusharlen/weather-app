require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
/* const allowedOrigins = [
    'https://weather-previsao.vercel.app',
    'http://localhost:3000',
    'localhost:3000',
    'https://weatherapp.matheusharlen.com.br',
    'weatherapp.matheusharlen.com.br',
    'https://weather-h40j8c4z9-matheus-projects-9f710d54.vercel.app',
    'weather-app-git-modificacoes-visuais1-matheus-projects-9f710d54.vercel.app
    
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      
      if (!origin) return callback(null, true);
      
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Acesso bloqueado pela política de CORS no back'));
      }
    },
    methods: ['GET'], 
    optionsSuccessStatus: 200 
  })); */
app.use(cors({
  origin: '*'
}));

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

app.get('/api/weather/:city', async (req, res) => {
    try {
        const { city } = req.params;
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=3&aqi=no&alerts=no&lang=pt`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Erro no servidor ao buscar clima" , error);
        res.status(500).json({ error: error.message });
        
    }
}
);

/* app.get('/api/mare/:city', async (req, res) => {
    try {
        const { city } = req.params;
        const url = `https://api.weatherapi.com/v1/marine.json?key=${WEATHER_API_KEY}&q=${city}&days=1&lang=pt`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Erro no servidor ao buscar maré", error);
        res.status(500).json({ error: error.message });
    }
}); */

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodado na porta: ${PORT}`);
});

module.exports = app;
