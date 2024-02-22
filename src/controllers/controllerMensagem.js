const express = require('express');
const server = express();
const fs = require('fs');

server.use(express.json());

let dadosMensagens = require('./data/dadosMensagem.json');

server.post('/mensagens', (req, res) => {
    const novaMensagem = req.body;

    if (!novaMensagem.autor || !novaMensagem.conteudo) {
        return res.status(400).json({ mensagem: "Por favor, forneça autor e conteúdo da mensagem." });
    }

    novaMensagem.id = generateId();
    dadosMensagens.push(novaMensagem); 
    salvarMensagens(); 

    return res.status(201).json({ mensagem: "Mensagem adicionada com sucesso." });
});

server.get('/mensagens', (req, res) => {
     return res.json(dadosMensagens); 
});


function salvarMensagens() {
    fs.writeFileSync(__dirname + '/data/dadosMensagens.json', JSON.stringify(dadosMensagens, null, 2));
}

function generateId() {
    return Math.floor(Math.random() * 1000);
}

module.exports = { server, salvarMensagens };
