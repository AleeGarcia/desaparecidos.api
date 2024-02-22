const express = require('express')
const server = express()
const avistamentoRouter = require('./controllerAvistamento')
const desaparecidoRouter = require('./controllerDesaparecido')
const mensagemRouter = require('./controllerMensagem')
const respostaRouter = require('./controllerResposta')
const usuarioRouter = require('./controllerUsuario')
const fs = require('fs')
const cors = require('cors')


server.use(express.json())
server.use(cors())

server.use('/api', avistamentoRouter.server)
server.use('/api', desaparecidoRouter.server)
server.use('/api', mensagemRouter.server)
server.use('/api', respostaRouter.server)
server.use('/api', usuarioRouter.server)

server.listen(3000, () =>{
    console.log(`O servidor está funcionando! :D`);
})