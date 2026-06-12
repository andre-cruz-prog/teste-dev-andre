let carros = [];
let motores = [];

fetch("dados.json")
  .then(response => response.json())
  .then(dados => {

    carros = dados.carros;
    motores = dados.motores;

    renderizarTabela();
    carregarMotores();

  });

function renderizarTabela() {

    const tabela = document.getElementById("lista-carros");

    tabela.innerHTML = "";

    carros.forEach(carro => {

        const motor = motores.find(
            m => m.id === carro.motor_id
        );

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${carro.marca}</td>
            <td>${carro.modelo}</td>
            <td>${carro.cor}</td>
            <td>${motor.cilindros} cilindros - ${motor.litragem}</td>
            <td>
                <button onclick="excluirCarro(${carro.id})">
                    Excluir
                </button>
            </td>
        `;

        tabela.appendChild(linha);
    });
}

function excluirCarro(id) {

    carros = carros.filter(
        carro => carro.id !== id
    );

    renderizarTabela();
}

function carregarMotores() {

    const select = document.getElementById("motor");

    select.innerHTML = "";

    motores.forEach(motor => {

        const option = document.createElement("option");

        option.value = motor.id;

        option.textContent =
            `${motor.cilindros} cilindros - ${motor.litragem}`;

        select.appendChild(option);
    });
}

function cadastrarCarro() {

    const marca =
        document.getElementById("marca").value;

    const modelo =
        document.getElementById("modelo").value;

    const cor =
        document.getElementById("cor").value;

    const motor_id =
        Number(document.getElementById("motor").value);

    if (!marca || !modelo || !cor) {
        alert("Preencha todos os campos.");
        return;
    }

    const novoCarro = {
        id: Date.now(),
        marca: marca,
        modelo: modelo,
        cor: cor,
        motor_id: motor_id
    };

    carros.push(novoCarro);

    renderizarTabela();

    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("cor").value = "";
}