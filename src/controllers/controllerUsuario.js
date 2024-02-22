const express = require('express');
const server = express();
const dadosUsuarios = require('./data/dadosUsuario.json');
const fs = require('fs');

server.use(express.json());

server.post('/usuarios', (req, res) => {
    const novoUsuario = req.body;

    if (!novoUsuario.nome || !novoUsuario.endereco || !novoUsuario.email || !novoUsuario.telefone) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        dadosUsuarios.push(novoUsuario);
        salvarDados();
        return res.status(201).json({ mensagem: "Novo usuário cadastrado com sucesso!" });
    }
});

server.get('/usuarios', (req, res) => {
    return res.json(dadosUsuarios);
});

server.put('/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id);
    const atualizaUsuario = req.body;

    const idUsuario = dadosUsuarios.findIndex(u => u.id === usuarioId);

    if (idUsuario === -1) {
        return res.status(404).json({ mensagem: "Usuário não encontrado :/" });
    } else {
        dadosUsuarios[idUsuario].nome = atualizaUsuario.nome || dadosUsuarios[idUsuario].nome;
        dadosUsuarios[idUsuario].endereco = atualizaUsuario.endereco || dadosUsuarios[idUsuario].endereco;
        dadosUsuarios[idUsuario].email = atualizaUsuario.email || dadosUsuarios[idUsuario].email;
        dadosUsuarios[idUsuario].telefone = atualizaUsuario.telefone || dadosUsuarios[idUsuario].telefone;

        salvarDados();

        return res.json({ mensagem: "Usuário atualizado com sucesso!" });
    }
});

server.delete("/usuarios/:id", (req, res) => {
    const usuarioId = parseInt(req.params.id);

    dadosUsuarios = dadosUsuarios.filter(u => u.id !== usuarioId);

    salvarDados();

    return res.status(200).json({ mensagem: "Usuário excluído com sucesso" });
});

function salvarDados() {
    fs.writeFileSync(__dirname + '/data/dadosUsuarios.json', JSON.stringify(dadosUsuarios, null, 2));
}

module.exports = { server, salvarDados };
