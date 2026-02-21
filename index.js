const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const app = express();

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { 
        headless: true, 
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] 
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('--- ESCANEIE O QR CODE ABAIXO ---');
});

client.on('ready', () => console.log('SISTEMA ONLINE E CONECTADO!'));

app.get('/', (req, res) => res.send('Motor Online'));
const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => console.log(`Rodando na porta ${PORT}`));

client.initialize();
