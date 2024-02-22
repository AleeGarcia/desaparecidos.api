document.addEventListener('DOMContentLoaded', function (){
    
    loadDesaparecidoList();

    
    document.getElementById('formAdicionarDesaparecido').addEventListener('submit', function (event){
        event.preventDefault();
        adicionarDesaparecido();
    });
});

function adicionarDesaparecido() {
    const id = document.getElementById('idDesaparecido').value;
    const nome = document.getElementById('nomeDesaparecido').value;
    const idade = document.getElementById('idadeDesaparecido').value;
    const descricao = document.getElementById('descricaoDesaparecido').value;
    const foto = document.getElementById('fotoDesaparecido').value;

    fetch('http://localhost:3000/api/desaparecidos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            idade: idade,
            descricao: descricao,
            foto: foto
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        loadDesaparecidoList();
    })
    .catch(error => console.error("Erro:", error));
}

function loadDesaparecidoList() {
    fetch('http://localhost:3000/api/desaparecidos')
        .then(response => response.json())
        .then(data => displayDesaparecidoList(data))
        .catch(error => console.error("Erro:", error));
}

function displayDesaparecidoList(data) {
    const listaDesaparecidos = document.getElementById('desaparecidoList');
    listaDesaparecidos.innerHTML = '';

    data.forEach(desaparecido => {
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${desaparecido.id} - Nome: ${desaparecido.nome} - Idade: ${desaparecido.idade} - Descrição: ${desaparecido.descricao} - Foto: ${desaparecido.foto}`;
        listaDesaparecidos.appendChild(listItem);
    });
}
