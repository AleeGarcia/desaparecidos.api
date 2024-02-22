const express = require('express');
const server = express();
const dadosDesaparecidos = require('./data/dadosDesaparecido.json');
const fs = require('fs');

server.use(express.json());

server.post('/desaparecidos', (req, res) => {
    const novoDesaparecido = req.body;

    if (!novoDesaparecido.nome || !novoDesaparecido.idade || !novoDesaparecido.descricao || !novoDesaparecido.foto) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        novoDesaparecido.id = generateId();
        dadosDesaparecidos.push(novoDesaparecido);
        salvarDados(dadosDesaparecidos);
        return res.status(201).json({ mensagem: "Novo desaparecido cadastrado com sucesso!" });
    }
});

server.get('/desaparecidos', (req, res) => {
    return res.json(dadosDesaparecidos);
});

server.put('/desaparecidos/:id', (req, res) => {
    const desaparecidoId = parseInt(req.params.id);
    const atualizaDesaparecido = req.body;

    const idDesaparecido = dadosDesaparecidos.findIndex(d => d.id === desaparecidoId);

    if (idDesaparecido === -1) {
        return res.status(404).json({ mensagem: "Desaparecido não encontrado :/" });
    } else {
        dadosDesaparecidos[idDesaparecido].nome = atualizaDesaparecido.nome || dadosDesaparecidos[idDesaparecido].nome;
        dadosDesaparecidos[idDesaparecido].idade = atualizaDesaparecido.idade || dadosDesaparecidos[idDesaparecido].idade;
        dadosDesaparecidos[idDesaparecido].descricao = atualizaDesaparecido.descricao || dadosDesaparecidos[idDesaparecido].descricao;
        dadosDesaparecidos[idDesaparecido].foto = atualizaDesaparecido.foto || dadosDesaparecidos[idDesaparecido].foto;

        salvarDados(dadosDesaparecidos);

        return res.json({ mensagem: "Desaparecido atualizado com sucesso!" });
    }
});

server.delete("/desaparecidos/:id", (req, res) => {
    const desaparecidoId = parseInt(req.params.id);

    dadosDesaparecidos = dadosDesaparecidos.filter(d => d.id !== desaparecidoId);

    salvarDados();

    return res.status(200).json({ mensagem: "Desaparecido excluído com sucesso" });
});

function salvarDados() {
    fs.writeFileSync(__dirname + '/data/dadosDesaparecidos.json', JSON.stringify(dadosDesaparecidos, null, 2));
}

function generateId() {
   
    return Math.floor(Math.random() * 1000);
}

server.post('/desaparecidos', (req, res) => {
    const novoDesaparecido = req.body;

    if (!novoDesaparecido.nome || !novoDesaparecido.idade || !novoDesaparecido.descricao || !novoDesaparecido.foto) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        novoDesaparecido.id = generateId();
        dadosDesaparecidos.push(novoDesaparecido);
        salvarDados(dadosDesaparecidos);
        return res.status(201).json({ mensagem: "Novo desaparecido cadastrado com sucesso!" });
    }
});

server.get('/desaparecidos', (req, res) => {
    return res.json(dadosDesaparecidos);
});

server.put('/desaparecidos/:id', (req, res) => {
    const desaparecidoId = parseInt(req.params.id);
    const atualizaDesaparecido = req.body;

    const idDesaparecido = dadosDesaparecidos.findIndex(d => d.id === desaparecidoId);

    if (idDesaparecido === -1) {
        return res.status(404).json({ mensagem: "Desaparecido não encontrado :/" });
    } else {
        dadosDesaparecidos[idDesaparecido].nome = atualizaDesaparecido.nome || dadosDesaparecidos[idDesaparecido].nome;
        dadosDesaparecidos[idDesaparecido].idade = atualizaDesaparecido.idade || dadosDesaparecidos[idDesaparecido].idade;
        dadosDesaparecidos[idDesaparecido].descricao = atualizaDesaparecido.descricao || dadosDesaparecidos[idDesaparecido].descricao;
        dadosDesaparecidos[idDesaparecido].foto = atualizaDesaparecido.foto || dadosDesaparecidos[idDesaparecido].foto;

        salvarDados(dadosDesaparecidos);

        return res.json({ mensagem: "Desaparecido atualizado com sucesso!" });
    }
});

server.delete("/desaparecidos/:id", (req, res) => {
    const desaparecidoId = parseInt(req.params.id);

    const novoArrayDesaparecidos = dadosDesaparecidos.filter(d => d.id !== desaparecidoId);

    if (novoArrayDesaparecidos.length === dadosDesaparecidos.length) {
        return res.status(404).json({ mensagem: "Desaparecido não encontrado :/" });
    }

    dadosDesaparecidos = novoArrayDesaparecidos;

    salvarDados();

    return res.status(200).json({ mensagem: "Desaparecido excluído com sucesso" });
});

function salvarDados(dadosDesaparecidos) {
    fs.writeFileSync(__dirname + '/data/dadosDesaparecidos.json', JSON.stringify(dadosDesaparecidos, null, 2));
}

function generateId() {
    return Math.floor(Math.random() * 1000);
}

module.exports = { server, salvarDados };
