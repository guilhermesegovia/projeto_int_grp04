import { app } from "../app";
import { EstoqueRepository } from "../repositories/EstoqueRepository";

export function EstoqueController() {
  const repository = new EstoqueRepository();

  app.get("/estoques", (req, res) => {
    res.json(repository.listarEstoques());
  });

  app.get("/estoques/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const estoque = repository.buscarPorId(id);
    if (!estoque) return res.status(404).json({ erro: "Estoque nao encontrado" });
    res.json(estoque);
  });

  app.get("/produtos/:id_produto/estoques", (req, res) => {
    const id_produto = parseInt(req.params.id_produto);
    res.json(repository.buscarPorProduto(id_produto));
  });

  app.post("/estoques", (req, res) => {
    try {
      const { tipo, quantidade, data_entrada, data_validade, id_produto, id_funcionario } = req.body;

      if (!tipo || tipo.trim().length === 0) throw new Error("Tipo e obrigatorio");
      if (!quantidade || quantidade <= 0) throw new Error("Quantidade invalida");
      if (!id_produto) throw new Error("Produto e obrigatorio");
      if (!id_funcionario) throw new Error("Funcionario e obrigatorio");

      const estoque = repository.salvar({
        tipo,
        quantidade,
        data_entrada: data_entrada ? new Date(data_entrada) : new Date(),
        data_validade: data_validade ? new Date(data_validade) : null,
        id_produto,
        id_funcionario
      });

      res.status(201).json(estoque);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.post("/estoques/movimentacoes", (req, res) => {
    try {
      const { id_produto, id_funcionario, tipo, quantidade } = req.body;

      if (!id_produto) throw new Error("Produto e obrigatorio");
      if (!id_funcionario) throw new Error("Funcionario e obrigatorio");
      if (!tipo) throw new Error("Tipo e obrigatorio");
      if (!quantidade || quantidade <= 0) throw new Error("Quantidade invalida");

      repository.RegistrarMovimentacao(id_produto, id_funcionario, tipo, quantidade);
      res.status(201).json({ mensagem: "Movimentacao registrada com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.get("/produtos/:id_produto/movimentacoes", (req, res) => {
    const id_produto = parseInt(req.params.id_produto);
    res.json(repository.ListarMovimentacoes(id_produto));
  });

  app.get("/produtos/:id_produto/estoque-baixo", (req, res) => {
    const id_produto = parseInt(req.params.id_produto);
    const quantidade_minima = Number(req.query.quantidade_minima ?? 1);
    res.json({ estoque_baixo: repository.VerificarEstoqueBaixo(id_produto, quantidade_minima) });
  });
}
