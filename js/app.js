"use strict";

import { openModal, closeModal } from "./modal.js";
import {
  getAllClientsData,
  createClient,
  deleteClient,
  upgradeClient,
  getClient,
} from "./clients.js";

async function updateTable() {
  const clientsTable = document.querySelector(".tableBody");

  // ler a API e armazenar o resultado em uma variável
  const clients = await getAllClientsData();
  // Preencher uma tabela com informações obtidas da API
  const rows = clients.map(({ nome, email, celular, cidade, id }) => {
    // método para criação das linhas da tabela
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${nome}</td>
      <td>${email}</td>
      <td>${celular}</td>
      <td>${cidade}</td>
      <td>
          <button type="button" class="button green" id="editar-${id}">editar</button>
          <button type="button" class="button red" id="excluir-${id}">excluir</button>
      </td>
    `;

    return row;
  });

  clientsTable.replaceChildren(...rows);
}

const saveClient = async function () {
  /* TODO: */
  // cliar um JSON com as informações dos clientes
  const client = {
    id: "",
    nome: document.querySelector("#nome").value,
    email: document.querySelector("#email").value,
    celular: document.querySelector("#celular").value,
    cidade: document.querySelector("#cidade").value,
  };
  // enviar JSON para o servidor da API
  await createClient(client);

  closeModal();

  await updateTable();
};

const clientUpdate = async function (client) {
  openModal();

  document.querySelector("#nome").value = client.nome;
  document.querySelector("#email").value = client.email;
  document.querySelector("#celular").value = client.celular;
  document.querySelector("#cidade").value = client.cidade;
};

await updateTable();

// listeners
document
  .getElementById("cadastrarCliente")
  .addEventListener("click", openModal);

document.getElementById("salvar").addEventListener("click", saveClient);

const tableBody = document.querySelector(".tableBody");
// executa os botões
tableBody.addEventListener("click", async (ev) => {
  if (ev.target.type == "button") {
    const [action, id] = ev.target.id.split("-");
    console.log(action, id);

    if (action == "editar") {
      // fução para editar cliente
      await clientUpdate(getClient(id));
    }

    if (action == "excluir") {
      await deleteClient(id);
      await updateTable();
    }
  }
});
