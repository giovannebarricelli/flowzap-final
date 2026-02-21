const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const qrcode = require('qrcode'); // Mudamos para gerar imagem
const app = express();

let qrGrafico = "";

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] 
    }
});

client.on('qr', (qr) => {
    // Transforma o código em uma imagem para o navegador ler fácil
    qrcode.toDataURL(qr, (err, url) => {
        qrGrafico = url;
    });
    console.log('NOVO QR CODE GERADO NO LINK');
});

client.on('ready', () => {
    qrGrafico = "CONECTADO";
    console.log('SISTEMA ONLINE!');
});

app.get('/', (req, res) => {
    if (qrGrafico === "CONECTADO") {
        res.send('<h1>Painel João Pedro: CONECTADO ✅</h1>');
    } else if (qrGrafico) {
        res.send(`<h1>Escaneie para Caldas Novas:</h1><img src="${qrGrafico}" style="width:300px;">`);
    } else {
        res.send('<h1>Iniciando motor... aguarde 30 segundos e atualize.</h1>');
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => console.log(`Rodando na porta ${PORT}`));
client.initialize();
