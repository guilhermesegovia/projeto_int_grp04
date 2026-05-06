import { app } from "../app";
import { ProdutoRepository } from "../repositories/ProdutoRepository";

export function ProdutoController() {
  const repository = new ProdutoRepository();

  function validarProduto(body: any) {
    const {
      nome_produto,
      composicao,
      indicacao,
      beneficios,
      advertencias,
      modo_uso,
      lote,
      validade,
      descricao,
      finalidade,
      valor,
      id_categoria
    } = body;

    if (!nome_produto || nome_produto.trim().length === 0) throw new Error("Nome do produto e obrigatorio");
    if (!composicao || composicao.trim().length === 0) throw new Error("Composicao e obrigatoria");
    if (!indicacao || indicacao.trim().length === 0) throw new Error("Indicacao e obrigatoria");
    if (!beneficios || beneficios.trim().length === 0) throw new Error("Beneficios e obrigatorio");
    if (!advertencias || advertencias.trim().length === 0) throw new Error("Advertencias e obrigatoria");
    if (!modo_uso || modo_uso.trim().length === 0) throw new Error("Modo de uso e obrigatorio");
    if (!lote || lote.trim().length === 0) throw new Error("Lote e obrigatorio");
    if (!descricao || descricao.trim().length === 0) throw new Error("Descricao e obrigatoria");
    if (!finalidade || finalidade.trim().length === 0) throw new Error("Finalidade e obrigatoria");
    if (valor === undefined || Number(valor) < 0) throw new Error("Valor invalido");
    if (!id_categoria) throw new Error("Categoria e obrigatoria");
    if (!validade) throw new Error("Validade e obrigatoria");

    const dataValidade = new Date(validade);
    if (Number.isNaN(dataValidade.getTime())) throw new Error("Validade invalida");

    return {
      nome_produto,
      composicao,
      indicacao,
      beneficios,
      advertencias,
      modo_uso,
      lote,
      validade: dataValidade,
      descricao,
      finalidade,
      valor: Number(valor),
      id_categoria
    };
  }

  app.get("/produtos", (req, res) => {
    const { nome } = req.query;

    if (nome) {
      const produto = repository.buscarPorNome(nome as string);
      if (!produto || produto.length === 0) return res.status(404).json({ erro: "Produto nao encontrado" });
      return res.json(produto);
    }

    res.json(repository.listarProdutos());
  });

  app.get("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ erro: "Id invalido" });
    const produto = repository.buscarPorId(id);
    if (!produto) return res.status(404).json({ erro: "Produto nao encontrado" });
    res.json(produto);
  });

  app.post("/produtos", (req, res) => {
    try {
      const produto = repository.salvar(validarProduto(req.body));

      res.status(201).json(produto);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.put("/produtos/:id", (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ erro: "Id invalido" });

      const produto = repository.AtualizarProduto(id, validarProduto(req.body));
      if (!produto) return res.status(404).json({ erro: "Produto nao encontrado" });
      res.json(produto);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.delete("/produtos/:id", (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json({ erro: "Id invalido" });

      const deletado = repository.DeletarProduto(id);
      if (!deletado) return res.status(404).json({ erro: "Produto nao encontrado" });
      res.json({ mensagem: "Produto deletado com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}
