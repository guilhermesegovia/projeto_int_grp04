import { app } from "../app";
import { PagamentoRepository } from "../repositories/PagamentoRepository";

export function PagamentoController() {
  const repository = new PagamentoRepository();

  app.get("/pagamentos", (req, res) => {
    res.json(repository.ListarPagamentos());
  });

  app.get("/pedidos/:id_pedido/pagamento", (req, res) => {
    const id_pedido = parseInt(req.params.id_pedido);
    const pagamento = repository.BuscarPagamentoPorPedido(id_pedido);
    if (!pagamento) return res.status(404).json({ erro: "Pagamento nao encontrado" });
    res.json(pagamento);
  });

  app.post("/pagamentos", (req, res) => {
    try {
      const { metodo, status_pagamento, data_pagamento, status_entrega, valor, id_pedido } = req.body;

      if (!metodo) throw new Error("Metodo e obrigatorio");
      if (!status_pagamento) throw new Error("Status de pagamento e obrigatorio");
      if (!status_entrega) throw new Error("Status de entrega e obrigatorio");
      if (valor === undefined) throw new Error("Valor e obrigatorio");
      if (!id_pedido) throw new Error("Pedido e obrigatorio");
      const dataPagamento = data_pagamento ? new Date(data_pagamento) : new Date();
      if (Number.isNaN(dataPagamento.getTime())) throw new Error("Data de pagamento invalida");

      const pagamento = repository.RegistrarPagamento({
        metodo,
        status_pagamento,
        data_pagamento: dataPagamento,
        status_entrega,
        valor,
        id_pedido
      });

      res.status(201).json(pagamento);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.patch("/pagamentos/:id/status", (req, res) => {
    const id = parseInt(req.params.id);
    const { status_pagamento } = req.body;
    if (!status_pagamento) return res.status(400).json({ erro: "Status de pagamento obrigatorio" });
    const atualizado = repository.AtualizarStatusPagamento(id, status_pagamento);
    if (!atualizado) return res.status(404).json({ erro: "Pagamento nao encontrado" });
    res.json({ mensagem: "Status do pagamento atualizado com sucesso" });
  });
}
