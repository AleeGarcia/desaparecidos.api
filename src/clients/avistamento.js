document.addEventListener('DOMContentLoaded', function () {

    loadAvistamentosList();

    document.getElementById('formAdicionarAvistamento').addEventListener('submit', function (event) {
        event.preventDefault();
        adicionarAvistamento();
    });
});

function adicionarAvistamento() {
    const id = document.getElementById('idAvistamento').value;
    const sexo = document.getElementById('sexoAvistamento').value;
    const localizacao = document.getElementById('localizacaoAvistamento').value;
    const data = document.getElementById('dataAvistamento').value;

    fetch('http://localhost:3000/api/avistamentos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_avistamento: id,
            sexo_avistamento: sexo,
            localizacao_avistamento: localizacao,
            data_avistamento: data
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        loadAvistamentosList();
    })
    .catch(error => console.error("Erro:", error));
}

function loadAvistamentosList() {
    fetch('http://localhost:3000/api/avistamentos')
        .then(response => response.json())
        .then(data => displayAvistamentosList(data))
        .catch(error => console.error("Erro:", error));
}

function displayAvistamentosList(data) {
    const listaAvistamentos = document.getElementById('listaAvistamentos');
    listaAvistamentos.innerHTML = '';

    data.forEach(avistamento => {
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${avistamento.id_avistamento} - Sexo: ${avistamento.sexo_avistamento} - Localização: ${avistamento.localizacao_avistamento} - Data: ${avistamento.data_avistamento}`;
        listaAvistamentos.appendChild(listItem);
    });
}
