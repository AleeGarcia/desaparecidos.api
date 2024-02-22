const express = require('express');
const server = express();
const dadosAvistamentos = require('./data/dadosAvistamento.json');
const fs = require('fs');

server.use(express.json());

server.post('/avistamentos', (req, res) => {
    const novoAvistamento = req.body;

    if (!novoAvistamento.sexo || !novoAvistamento.localizacao || !novoAvistamento.data) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        dadosAvistamentos.push(novoAvistamento);
        salvarDados(dadosAvistamentos);
        return res.status(201).json({ mensagem: "Novo avistamento cadastrado com sucesso!" });
    }
});

server.get('/avistamentos', (req, res) => {
    return res.json(dadosAvistamentos);
});

server.put('/avistamentos/:id', (req, res) => {
    const avistamentoId = parseInt(req.params.id);
    const atualizaAvistamento = req.body;

    const idAvistamento = dadosAvistamentos.findIndex(a => a.id === avistamentoId);

    if (idAvistamento === -1) {
        return res.status(404).json({ mensagem: "Avistamento não encontrado :/" });
    } else {
        dadosAvistamentos[idAvistamento].sexo = atualizaAvistamento.sexo || dadosAvistamentos[idAvistamento].sexo;
        dadosAvistamentos[idAvistamento].localizacao = atualizaAvistamento.localizacao || dadosAvistamentos[idAvistamento].localizacao;
        dadosAvistamentos[idAvistamento].data = atualizaAvistamento.data || dadosAvistamentos[idAvistamento].data;

        salvarDados(dadosAvistamentos);

        return res.json({ mensagem: "Avistamento atualizado com sucesso!" });
    }
});

server.delete("/avistamentos/:id", (req, res) => {
    const avistamentoId = parseInt(req.params.id);

    dadosAvistamentos = dadosAvistamentos.filter(a => a.id !== avistamentoId);

    salvarDados();

    return res.status(200).json({ mensagem: "Avistamento excluído com sucesso" });
});

function salvarDados(dadosAvistamentos) {
    fs.writeFileSync(__dirname + '/data/dadosAvistamentos.json', JSON.stringify(dadosAvistamentos, null, 2));
}

module.exports = { server, salvarDados };