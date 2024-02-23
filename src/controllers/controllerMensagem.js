const express = require('express');
const fs = require('fs');

const server = express();
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

server.put('/mensagens/:id', (req, res) => {
    const id = req.params.id;
    const mensagemAtualizada = req.body;

    const index = dadosMensagens.findIndex(mensagem => mensagem.id == id);
    if (index === -1) {
        return res.status(404).json({ mensagem: "Mensagem não encontrada." });
    }

    dadosMensagens[index] = { ...dadosMensagens[index], ...mensagemAtualizada };
    salvarMensagens();

    return res.status(200).json({ mensagem: "Mensagem atualizada com sucesso." });
});

server.delete('/mensagens/:id', (req, res) => {
    const id = req.params.id;

    const index = dadosMensagens.findIndex(mensagem => mensagem.id == id);
    if (index === -1) {
        return res.status(404).json({ mensagem: "Mensagem não encontrada." });
    }

    dadosMensagens.splice(index, 1);
    salvarMensagens();

    return res.status(200).json({ mensagem: "Mensagem excluída com sucesso." });
});

function salvarMensagens() {
    fs.writeFileSync(__dirname + '/data/dadosMensagens.json', JSON.stringify(dadosMensagens, null, 2));
}

function generateId() {
    return Math.floor(Math.random() * 1000);
}

module.exports = { server, salvarMensagens };
