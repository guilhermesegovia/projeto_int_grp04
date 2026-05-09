import { app } from "../app";
import { Request, Response } from "express";
import { CarrinhoRepository } from "../repositories/CarrinhoRepository";

export function CarrinhoController() {
  const repository = new CarrinhoRepository();

  app.get("/carrinho/:id_cliente", (req, res) => {
    const id_cliente = parseInt(req.params.id_cliente);
    res.json(repository.Vercarrinho(id_cliente));
  });

  app.post("/carrinho", (req, res) => {
    try {
      const { id_cliente, id_produto, quantidade } = req.body;

      if (!id_cliente) throw new Error("Cliente e obrigatorio");
      if (!id_produto) throw new Error("Produto e obrigatorio");
      if (!quantidade || quantidade <= 0) throw new Error("Quantidade invalida");

      repository.adicionaraocarrinho(id_cliente, id_produto, quantidade);
      res.status(201).json({ mensagem: "Produto adicionado ao carrinho" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  function atualizarQuantidade(req: Request, res: Response) {
    try {
      const id_cliente = Number(req.params.id_cliente ?? req.body.id_cliente);
      const id_produto = Number(req.params.id_produto ?? req.body.id_produto);
      const { quantidade } = req.body;

      if (!id_cliente) throw new Error("Cliente e obrigatorio");
      if (!id_produto) throw new Error("Produto e obrigatorio");
      if (quantidade === undefined || quantidade <= 0) throw new Error("Quantidade invalida");

      const atualizado = repository.AtualizarQuantidade(id_cliente, id_produto, quantidade);
      if (!atualizado) return res.status(404).json({ erro: "Item nao encontrado no carrinho" });

      res.json({ mensagem: "Quantidade atualizada com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  }

  app.put("/carrinho", atualizarQuantidade);

  app.put("/carrinho/:id_cliente/:id_produto", atualizarQuantidade);

  app.delete("/carrinho/:id_cliente/:id_produto", (req, res) => {
    const id_cliente = parseInt(req.params.id_cliente);
    const id_produto = parseInt(req.params.id_produto);
    repository.RemoverDoCarrinho(id_cliente, id_produto);
    res.json({ mensagem: "Produto removido do carrinho" });
  });

  app.delete("/carrinho/:id_cliente", (req, res) => {
    const id_cliente = parseInt(req.params.id_cliente);
    repository.LimparCarrinho(id_cliente);
    res.json({ mensagem: "Carrinho limpo com sucesso" });
  });
}
