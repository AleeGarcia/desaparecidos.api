document.addEventListener('DOMContentLoaded', function (){
    
    loadUsuarioList();

    
    document.getElementById('formAdicionarUsuario').addEventListener('submit', function (event){
        event.preventDefault();
        adicionarUsuario();
    });
});

function adicionarUsuario() {
    const id = document.getElementById('idUsuario').value;
    const nome = document.getElementById('nomeUsuario').value;
    const endereco = document.getElementById('enderecoUsuario').value;
    const email = document.getElementById('emailUsuario').value;
    const telefone = document.getElementById('telefoneUsuario').value;

    fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            endereco: endereco,
            email: email,
            telefone: telefone
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        loadUserList();
    })
    .catch(error => console.error("Erro:", error));
}

function loadUsuarioList() {
    fetch('http://localhost:3000/api/usuarios')
        .then(response => response.json())
        .then(data => displayUserList(data))
        .catch(error => console.error("Erro:", error));
}

function displayUsuarioList(data) {
    const listaUsuarios = document.getElementById('usuarioList');
    listaUsuarios.innerHTML = '';

    data.forEach(usuario => {
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${usuario.id} - Nome: ${usuario.nome} - Endereço: ${usuario.endereco} - Email: ${usuario.email} - Telefone: ${usuario.telefone}`;
        listaUsuarios.appendChild(listItem);
    });
}
