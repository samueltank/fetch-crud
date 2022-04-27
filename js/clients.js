"use strict";

const url = "https://testeleonid.herokuapp.com/clientes";

export async function getAllClientsData() {
  const opts = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      mode: "no-cors",
    },
  };

  const res = await fetch(url);
  const bodyJson = await res.json();

  return bodyJson;
}

export async function createClient(client) {
  const opt = {
    method: "POST",
    body: JSON.stringify(client),
    headers: {
      "content-type": "application/json",
    },
  };

  const res = await fetch(url, opt);
  console.log(res.ok);
}

export async function deleteClient(id) {
  const opt = {
    method: "DELETE",
  };

  const res = await fetch(`${url}/${id}`, opt);
  console.log(response.ok);
}
