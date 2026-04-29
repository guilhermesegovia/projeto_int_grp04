<div align="center">

# 🌿 Stellari API

API REST para loja de skincare com gerenciamento completo de produtos, clientes, pedidos e estoque.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

</div>

---

## 📖 Sobre o projeto

Backend completo para uma loja de skincare, desenvolvido com arquitetura em camadas (Model, Repository, Controller, Database). O sistema oferece gerenciamento de produtos, clientes, pedidos, estoque, avaliações e pagamentos — tudo via API REST com persistência em SQLite local, sem necessidade de configuração de banco externo.

---

## 🏗️ Arquitetura

```
src/
├── model/         # Entidades e interfaces TypeScript do domínio
├── repository/    # Criação de tabelas e queries (SELECT, INSERT, UPDATE, DELETE)
├── controller/    # Rotas HTTP, validações e integração com frontend
├── database/      # Configuração e conexão com o SQLite
└── app.ts
```

| Camada | Responsabilidade |
|--------|-----------------|
| **Model** | Define a estrutura e tipagem das entidades do domínio |
| **Repository** | Gerencia a persistência: criação de tabelas e todas as queries SQL |
| **Controller** | Expõe os endpoints REST, valida dados e orquestra as respostas |
| **Database** | Configura e abstrai a conexão com o banco SQLite |

---

## 🛠️ Stack tecnológica

| Tecnologia | Uso |
|-----------|-----|
| Node.js | Ambiente de execução JavaScript no servidor |
| TypeScript | Tipagem estática para maior segurança e manutenibilidade |
| Express | Framework para criação e organização de rotas HTTP |
| Better-SQLite3 | Banco de dados local SQLite sem instalação externa |
| Nodemon | Reinicialização automática do servidor em desenvolvimento |
| ts-node | Execução direta de TypeScript sem compilação prévia |

---

## 📦 Módulos da API

<details>
<summary><strong>Produto</strong></summary>

- `salvar(p)` — cadastra um novo produto
- `listarProdutos()` — retorna todos os produtos
- `buscarPorId(id)` — busca produto pelo ID
- `buscarPorNome(nome)` — busca produto pelo nome
- `AtualizarProduto(id, p)` — atualiza dados do produto
- `DeletarProduto(id)` — remove produto do catálogo

</details>

<details>
<summary><strong>Cliente</strong></summary>

- `salvarCliente(c)` — cadastra um novo cliente
- `listarClientes()` — retorna todos os clientes
- `buscarPorId(id)` — busca cliente pelo ID
- `buscarPorNome(nome)` — busca cliente pelo nome
- `atualizarCliente(id, c)` — atualiza dados do cliente
- `deletarCliente(id)` — remove o cliente

</details>

<details>
<summary><strong>Pedido</strong></summary>

- `salvarPedido(p)` — cria um novo pedido
- `adiconarProdutoAoPedido(id_pedido, id_produto, quantidade)`
- `listarPedidos()` — retorna todos os pedidos
- `buscarPedidoPorId(id)` — detalha um pedido
- `buscarPedidosPorCliente(id_cliente)` — pedidos de um cliente
- `listarItensDoPedido(id_pedido)` — itens do pedido
- `calcularTotalDoPedido(id_pedido)` — calcula o valor total
- `deletarPedido(id)` — cancela o pedido

</details>

<details>
<summary><strong>Carrinho</strong></summary>

- `adicionaraocarrinho(id_cliente, id_produto, quantidade)`
- `RemoverDoCarrinho(id_cliente, id_produto)`
- `AtualizarQuantidade(id_cliente, id_produto, quantidade)`
- `Vercarrinho(id_cliente)` — visualiza o carrinho
- `LimparCarrinho(id_cliente)` — esvazia o carrinho

</details>

<details>
<summary><strong>Estoque</strong></summary>

- `salvar(e)` — registra estoque inicial
- `listarEstoques()` — retorna todos os registros
- `buscarPorProduto(id_produto)` — estoque de um produto
- `RegistrarMovimentacao(id_produto, id_funcionario, tipo, quantidade)`
- `ListarMovimentacoes(id_produto)` — histórico de movimentações
- `VerificarEstoqueBaixo(id_produto, quantidade_minima)`

</details>

<details>
<summary><strong>Pagamento</strong></summary>

- `RegistrarPagamento(p)` — registra um pagamento
- `ListarPagamentos()` — retorna todos os pagamentos
- `BuscarPagamentoPorPedido(id_pedido)` — pagamento de um pedido
- `AtualizarStatusPagamento(id, status_pagamento)`

</details>

<details>
<summary><strong>Avaliação</strong></summary>

- `salvarAvaliacao(a)` — registra avaliação de produto
- `listarAvaliacoes()` — retorna todas as avaliações
- `listarAvaliacoesPorProduto(id_produto)` — avaliações de um produto
- `deletarAvaliacao(id)` — remove avaliação

</details>

<details>
<summary><strong>Funcionário</strong></summary>

- `SalvarFuncionario(f)` — cadastra funcionário
- `listarFuncionarios()` — retorna todos os funcionários
- `buscarPorId(id)` / `buscarPorNome(nome)`
- `atualizarFuncionario(id, f)` — atualiza dados
- `deletarFuncionario(id)` — desativa funcionário

</details>

<details>
<summary><strong>Categoria · Endereço</strong></summary>

- CRUD completo para categorias de produtos
- CRUD completo para endereços de clientes

</details>

---

## 🚀 Como executar

```bash
# clonar o repositório
git clone https://github.com/guilhermesegovia/projeto_int_grp04
cd projeto_int_grp04

# instalar dependências
npm install

# iniciar em modo desenvolvimento
npm run dev
```

> Não é necessário instalar ou configurar nenhum banco de dados. O SQLite cria o arquivo automaticamente na primeira execução.
