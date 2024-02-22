
const express = require('express');
const server = express();
const fs = require('fs');


server.use(express.json());

let dadosAvistamentos = require('./data/dadosAvistamentos.json');

server.post('/avistamentos', (req, res) => {
    const novoAvistamento = req.body;

    if (!novoAvistamento.sexo || !novoAvistamento.localizacao || !novoAvistamento.data || !novoAvistamento.tipo) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        novoAvistamento.id = generateId();
        dadosAvistamentos.push(novoAvistamento);
        salvarAvistamentos();
        return res.status(201).json({ mensagem: "Novo avistamento cadastrado com sucesso!", avistamento: novoAvistamento });
    }
});

server.get('/avistamentos', (req, res) => {
    return res.json(dadosAvistamentos);
});

server.get('/avistamentos/:id', (req, res) => {
    const avistamentoId = parseInt(req.params.id);
    const avistamento = dadosAvistamentos.find(a => a.id === avistamentoId);
    if (avistamento) {
        return res.json(avistamento);
    } else {
        return res.status(404).json({ mensagem: "Avistamento não encontrado :/" });
    }
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
        dadosAvistamentos[idAvistamento].tipo = atualizaAvistamento.tipo || dadosAvistamentos[idAvistamento].tipo;

        salvarAvistamentos();

        return res.json({ mensagem: "Avistamento atualizado com sucesso!", avistamento: dadosAvistamentos[idAvistamento] });
    }
});

server.delete("/avistamentos/:id", (req, res) => {
    const avistamentoId = parseInt(req.params.id);

    dadosAvistamentos = dadosAvistamentos.filter(a => a.id !== avistamentoId);

    salvarAvistamentos();

    return res.status(200).json({ mensagem: "Avistamento excluído com sucesso" });
});

function salvarAvistamentos() {
    fs.writeFileSync(__dirname + '/data/dadosAvistamentos.json', JSON.stringify(dadosAvistamentos, null, 2));
}

function generateId() {
    return Math.floor(Math.random() * 1000);
}

module.exports = { server, salvarAvistamentos };








let dadosDesaparecidos = require('./data/dadosDesaparecidos.json');

server.post('/desaparecidos', (req, res) => {
    const novoDesaparecido = req.body;

    if (!novoDesaparecido.nome || !novoDesaparecido.idade || !novoDesaparecido.descricao || !novoDesaparecido.foto) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        novoDesaparecido.id = generateId();
        dadosDesaparecidos.push(novoDesaparecido);
        salvarDesaparecidos();
        return res.status(201).json({ mensagem: "Novo desaparecido cadastrado com sucesso!", desaparecido: novoDesaparecido });
    }
});

server.get('/desaparecidos', (req, res) => {
    return res.json(dadosDesaparecidos);
});

server.get('/desaparecidos/:id', (req, res) => {
    const desaparecidoId = parseInt(req.params.id);
    const desaparecido = dadosDesaparecidos.find(d => d.id === desaparecidoId);
    if (desaparecido) {
        return res.json(desaparecido);
    } else {
        return res.status(404).json({ mensagem: "Desaparecido não encontrado :/" });
    }
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

        salvarDesaparecidos();

        return res.json({ mensagem: "Desaparecido atualizado com sucesso!", desaparecido: dadosDesaparecidos[idDesaparecido] });
    }
});

server.delete("/desaparecidos/:id", (req, res) => {
    const desaparecidoId = parseInt(req.params.id);

    dadosDesaparecidos = dadosDesaparecidos.filter(d => d.id !== desaparecidoId);

    salvarDesaparecidos();

    return res.status(200).json({ mensagem: "Desaparecido excluído com sucesso" });
});

function salvarDesaparecidos() {
    fs.writeFileSync(__dirname + '/data/dadosDesaparecidos.json', JSON.stringify(dadosDesaparecidos, null, 2));
}

function generateId() {
    return Math.floor(Math.random() * 1000);
}

module.exports = { server, salvarDesaparecidos };







let dadosMensagens = require('./data/dadosMensagens.json');

server.post('/mensagens', (req, res) => {
    const novaMensagem = req.body;

    if (!novaMensagem.autor || !novaMensagem.conteudo) {
        return res.status(400).json({ mensagem: "Por favor, forneça autor e conteúdo da mensagem." });
    }

    novaMensagem.id = generateId();
    dadosMensagens.push(novaMensagem);
    salvarMensagens();

    return res.status(201).json({ mensagem: "Mensagem adicionada com sucesso.", mensagem: novaMensagem });
});

server.get('/mensagens', (req, res) => {
    return res.json(dadosMensagens);
});

server.get('/mensagens/:id', (req, res) => {
    const mensagemId = parseInt(req.params.id);
    const mensagem = dadosMensagens.find(m => m.id === mensagemId);
    if (mensagem) {
        return res.json(mensagem);
    } else {
        return res.status(404).json({ mensagem: "Mensagem não encontrada :/" });
    }
});

server.put('/mensagens/:id', (req, res) => {
    const mensagemId = parseInt(req.params.id);
    const atualizaMensagem = req.body;

    const idMensagem = dadosMensagens.findIndex(m => m.id === mensagemId);

    if (idMensagem === -1) {
        return res.status(404).json({ mensagem: "Mensagem não encontrada :/" });
    } else {
        dadosMensagens[idMensagem].autor = atualizaMensagem.autor || dadosMensagens[idMensagem].autor;
        dadosMensagens[idMensagem].conteudo = atualizaMensagem.conteudo || dadosMensagens[idMensagem].conteudo;

        salvarMensagens();

        return res.json({ mensagem: "Mensagem atualizada com sucesso!", mensagem: dadosMensagens[idMensagem] });
    }
});

server.delete("/mensagens/:id", (req, res) => {
    const mensagemId = parseInt(req.params.id);

    dadosMensagens = dadosMensagens.filter(m => m.id !== mensagemId);

    salvarMensagens();

    return res.status(200).json({ mensagem: "Mensagem excluída com sucesso" });
});

function salvarMensagens() {
    fs.writeFileSync(__dirname + '/data/dadosMensagens.json', JSON.stringify(dadosMensagens, null, 2));
}

function generateId() {
    return Math.floor(Math.random() * 1000);
}

module.exports = { server, salvarMensagens };






let dadosRespostas = require('./data/dadosRespostas.json');

server.post('/respostas', (req, res) => {
    const novaResposta = req.body;

    if (!novaResposta.autor || !novaResposta.conteudo || !novaResposta.mensagemId) {
        return res.status(400).json({ mensagem: "Por favor, forneça autor, conteúdo da resposta e ID da mensagem." });
    }

    novaResposta.id = generateId();
    dadosRespostas.push(novaResposta);
    salvarRespostas();

    return res.status(201).json({ mensagem: "Resposta adicionada com sucesso.", resposta: novaResposta });
});

server.get('/respostas', (req, res) => {
    return res.json(dadosRespostas);
});

server.get('/respostas/:id', (req, res) => {
    const respostaId = parseInt(req.params.id);
    const resposta = dadosRespostas.find(r => r.id === respostaId);
    if (resposta) {
        return res.json(resposta);
    } else {
        return res.status(404).json({ mensagem: "Resposta não encontrada :/" });
    }
});

server.put('/respostas/:id', (req, res) => {
    const respostaId = parseInt(req.params.id);
    const atualizaResposta = req.body;

    const idResposta = dadosRespostas.findIndex(r => r.id === respostaId);

    if (idResposta === -1) {
        return res.status(404).json({ mensagem: "Resposta não encontrada :/" });
    } else {
        dadosRespostas[idResposta].autor = atualizaResposta.autor || dadosRespostas[idResposta].autor;
        dadosRespostas[idResposta].conteudo = atualizaResposta.conteudo || dadosRespostas[idResposta].conteudo;

        salvarRespostas();

        return res.json({ mensagem: "Resposta atualizada com sucesso!", resposta: dadosRespostas[idResposta] });
    }
});

server.delete("/respostas/:id", (req, res) => {
    const respostaId = parseInt(req.params.id);

    dadosRespostas = dadosRespostas.filter(r => r.id !== respostaId);

    salvarRespostas();

    return res.status(200).json({ mensagem: "Resposta excluída com sucesso" });
});

function salvarRespostas() {
    fs.writeFileSync(__dirname + '/data/dadosRespostas.json', JSON.stringify(dadosRespostas, null, 2));
}

function generateId() {
    return Math.floor(Math.random() * 1000);
}

module.exports = { server, salvarRespostas };





let dadosUsuarios = require('./data/dadosUsuarios.json');

server.post('/usuarios', (req, res) => {
    const novoUsuario = req.body;

    if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha) {
        return res.status(400).json({ mensagem: "Por favor, forneça nome, email e senha do usuário." });
    }

    novoUsuario.id = generateId();
    dadosUsuarios.push(novoUsuario);
    salvarUsuarios();

    return res.status(201).json({ mensagem: "Usuário adicionado com sucesso.", usuario: novoUsuario });
});

server.get('/usuarios', (req, res) => {
    return res.json(dadosUsuarios);
});

server.get('/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id);
    const usuario = dadosUsuarios.find(u => u.id === usuarioId);
    if (usuario) {
        return res.json(usuario);
    } else {
        return res.status(404).json({ mensagem: "Usuário não encontrado :/" });
    }
});

server.put('/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id);
    const atualizaUsuario = req.body;

    const idUsuario = dadosUsuarios.findIndex(u => u.id === usuarioId);

    if (idUsuario === -1) {
        return res.status(404).json({ mensagem: "Usuário não encontrado :/" });
    } else {
        dadosUsuarios[idUsuario].nome = atualizaUsuario.nome || dadosUsuarios[idUsuario].nome;
        dadosUsuarios[idUsuario].email = atualizaUsuario.email || dadosUsuarios[idUsuario].email;
        dadosUsuarios[idUsuario].senha = atualizaUsuario.senha || dadosUsuarios[idUsuario].senha;

        salvarUsuarios();

        return res.json({ mensagem: "Usuário atualizado com sucesso!", usuario: dadosUsuarios[idUsuario] });
    }
});

server.delete("/usuarios/:id", (req, res) => {
    const usuarioId = parseInt(req.params.id);

    dadosUsuarios = dadosUsuarios.filter(u => u.id !== usuarioId);

    salvarUsuarios();

    return res.status(200).json({ mensagem: "Usuário excluído com sucesso" });
});

function salvarUsuarios() {
    fs.writeFileSync(__dirname + '/data/dadosUsuarios.json', JSON.stringify(dadosUsuarios, null, 2));
}

function generateId() {
    return Math.floor(Math.random() * 1000);
}

module.exports = { server, salvarUsuarios };