import express from "express";

import { AvaliacaoController } from "./controller/AvaliacaoController";
import { CarrinhoController } from "./controller/CarrinhoController";
import { CategoriaController } from "./controller/CategoriaController";
import { ClienteController } from "./controller/ClienteController";
import { EnderecoController } from "./controller/EnderecoController";
import { EstoqueController } from "./controller/EstoqueController";
import { FuncionarioController } from "./controller/FuncionarioController";
import { MensagemController } from "./controller/MensagemController";
import { PagamentoController } from "./controller/PagamentoController";
import { PedidoController } from "./controller/PedidoController";
import { ProdutoController } from "./controller/ProdutoController";

export const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.sendStatus(200); return; }
  next();
});

app.use(express.json());

AvaliacaoController();
CarrinhoController();
CategoriaController();
ClienteController();
EnderecoController();
EstoqueController();
FuncionarioController();
MensagemController();
PagamentoController();
PedidoController();
ProdutoController();

app.listen(3104, () => {
  console.log("Servidor rodando em http://localhost:3104");
});
