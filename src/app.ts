import express from "express";
import { AvaliacaoController } from "./controller/AvaliacaoController";
import { CarrinhoController } from "./controller/CarrinhoController";
import { CategoriaController } from "./controller/CategoriaController";
import { ClienteController } from "./controller/ClienteController";
import { EnderecoController } from "./controller/EnderecoController";
import { EstoqueController } from "./controller/EstoqueController";
import { FuncionarioController } from "./controller/FuncionarioController";
import { PagamentoController } from "./controller/PagamentoController";
import { PedidoController } from "./controller/PedidoController";
import { ProdutoController } from "./controller/ProdutoController";

export const app = express();

app.use(express.json());

AvaliacaoController();
CarrinhoController();
CategoriaController();
ClienteController();
EnderecoController();
EstoqueController();
FuncionarioController();
PagamentoController();
PedidoController();
ProdutoController();


app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});