document.addEventListener('DOMContentLoaded', function (){
    loadMensagens(); 
    
    document.getElementById('formEnviarMensagem').addEventListener('submit', function (event){
        event.preventDefault();
        enviarMensagem();
    });
});

function enviarMensagem() {
    const autor = document.getElementById('autorMensagem').value;
    const conteudo = document.getElementById('conteudoMensagem').value;

    fetch('http://localhost:3000/api/mensagens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            autor: autor,
            conteudo: conteudo
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        loadMensagens();
    })
    .catch(error => console.error("Erro:", error));
}

function loadMensagens() {
    fetch('http://localhost:3000/api/mensagens')
        .then(response => response.json())
        .then(data => displayMensagens(data))
        .catch(error => console.error("Erro:", error));
}

function displayMensagens(data) {
    const listaMensagens = document.getElementById('listaMensagens');
    listaMensagens.innerHTML = '';

    data.forEach(mensagem => {
        const mensagemItem = document.createElement('div');
        mensagemItem.classList.add('mensagem-item');
        mensagemItem.innerHTML = `
            <p><strong>Autor:</strong> ${mensagem.autor}</p>
            <p><strong>Mensagem:</strong> ${mensagem.conteudo}</p>
            <hr>
        `;
        listaMensagens.appendChild(mensagemItem);
    });
}
