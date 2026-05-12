import { app } from "../app";
import { PedidoRepository } from "../repositories/PedidoRepository";

export function PedidoController() {
  const repository = new PedidoRepository();

  app.get("/pedidos", (req, res) => {
    const { id_cliente } = req.query;

    if (id_cliente) {
      return res.json(repository.buscarPedidosPorCliente(Number(id_cliente)));
    }

    res.json(repository.listarPedidos());
  });

  app.get("/pedidos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pedido = repository.buscarPedidoPorId(id);
    if (!pedido) return res.status(404).json({ erro: "Pedido nao encontrado" });
    res.json(pedido);
  });

  app.post("/pedidos", (req, res) => {
    try {
      const { frete, cupom, total, data_hora, id_cliente, id_endereco } = req.body;

      if (frete === undefined) throw new Error("Frete e obrigatorio");
      if (total === undefined) throw new Error("Total e obrigatorio");
      if (!id_cliente) throw new Error("Cliente e obrigatorio");

      const pedido = repository.salvarPedido({
        frete,
        cupom,
        total,
        data_hora: data_hora ? new Date(data_hora) : new Date(),
        id_cliente,
        id_endereco: id_endereco ?? null
      });

      res.status(201).json(pedido);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.post("/pedidos/:id_pedido/itens", (req, res) => {
    try {
      const id_pedido = parseInt(req.params.id_pedido);
      const { id_produto, quantidade } = req.body;

      if (!id_produto) throw new Error("Produto e obrigatorio");
      if (!quantidade || quantidade <= 0) throw new Error("Quantidade invalida");

      repository.adicionarProdutoAoPedido(id_pedido, id_produto, quantidade);
      res.status(201).json({ mensagem: "Produto adicionado ao pedido" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.get("/pedidos/:id_pedido/itens", (req, res) => {
    const id_pedido = parseInt(req.params.id_pedido);
    res.json(repository.listarItensDoPedido(id_pedido));
  });

  app.get("/pedidos/:id_pedido/total", (req, res) => {
    const id_pedido = parseInt(req.params.id_pedido);
    res.json({ total: repository.calcularTotalDoPedido(id_pedido) });
  });

  app.delete("/pedidos/:id", (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deletado = repository.deletarPedido(id);
      if (!deletado) return res.status(404).json({ erro: "Pedido nao encontrado" });
      res.json({ mensagem: "Pedido deletado com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}
