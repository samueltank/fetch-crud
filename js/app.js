"use strict";

import { openModal, closeModal } from "./modal.js";
import { getAllClientsData, createClient, deleteClient } from "./clients.js";

async function updateTable() {
  const clientsTable = document.querySelector(".tableBody");

  // ler a API e armazenar o resultado em uma variável
  const clients = await getAllClientsData();
  // Preencher uma tabela com informações obtidas da API
  const rows = clients.map((client) => {
    // método para criação das linhas da tabela
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${client.nome}</td>
      <td>${client.email}</td>
      <td>${client.celular}</td>
      <td>${client.cidade}</td>
      <td>
          <button type="button" class="button green" id="editar-${client.id}">editar</button>
          <button type="button" class="button red" id="excluir-${client.id}">excluir</button>
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
  // fechar modal
  closeModal();
  // atualizar a tabela
  await updateTable();
};

updateTable();

// listeners
document
  .getElementById("cadastrarCliente")
  .addEventListener("click", openModal);

document.getElementById("salvar").addEventListener("click", saveClient);
document.querySelector(".tableBody").addEventListener("click", async (ev) => {
  if (ev.target.type == "button") {
    const [action, id] = ev.target.id.split("-");
    console.log(action, id);

    if (action == "editar") {
      // fução para editar cliente
    }

    if (action == "excluir") {
      await deleteClient(id);
    }
  }
});
