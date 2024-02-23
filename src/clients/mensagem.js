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
    const imagem = document.getElementById('imagemMensagem').value; // Adicione o campo da imagem

    fetch('http://localhost:3000/api/mensagens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            autor: autor,
            conteudo: conteudo,
            imagem: imagem // Adicione a imagem ao corpo da mensagem
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
            <img src="${mensagem.imagem}" alt="Imagem da mensagem">
            <button onclick="editarMensagem(${mensagem.id})">Editar</button>
            <button onclick="excluirMensagem(${mensagem.id})">Excluir</button>
            <hr>
        `;
        listaMensagens.appendChild(mensagemItem);
    });
}

function editarMensagem(id) {
    const novoConteudo = prompt("Editar mensagem:");
    if (novoConteudo !== null) {
        fetch(`http://localhost:3000/api/mensagens/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ conteudo: novoConteudo }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            loadMensagens();
        })
        .catch(error => console.error("Erro:", error));
    }
}

function excluirMensagem(id) {
    if (confirm("Tem certeza que deseja excluir esta mensagem?")) {
        fetch(`http://localhost:3000/api/mensagens/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                loadMensagens();
            } else {
                console.error("Erro ao excluir mensagem.");
            }
        })
        .catch(error => console.error("Erro:", error));
    }
}
