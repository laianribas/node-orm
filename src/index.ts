import express, { json } from "express";

import { router } from "./routes"

const server = express();

server.use(json());//nunca aceitar o JSON antes de entrar nas rotas
server.use(router)


server.listen(5000, () => {
  console.log('Servidor on na porta 5000 http://localhost:5000/')
})

//Criar usuário        C
//Selecionar usuário   R
//Editar usuário       U
//Deletar usuário      D

//recurso /usuário

//verbos http
//GET
//PUT/PATCH
//UPDATE
//DELETE

