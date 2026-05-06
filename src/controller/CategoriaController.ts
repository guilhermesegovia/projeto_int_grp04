import { app } from "../app";
import { CategoriaRepository } from "../repositories/CategoriaRepository";

export function CategoriaController() {
  const repository = new CategoriaRepository();

  app.get("/categorias", (req, res) => {
    const { nome } = req.query;

    if (nome) {
      const categoria = repository.buscarPorNome(nome as string);
      if (!categoria || categoria.length === 0) return res.status(404).json({ erro: "Categoria nao encontrada" });
      return res.json(categoria);
    }

    res.json(repository.listarCategorias());
  });

  app.get("/categorias/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const categoria = repository.buscarPorId(id);
    if (!categoria) return res.status(404).json({ erro: "Categoria nao encontrada" });
    res.json(categoria);
  });

  app.post("/categorias", (req, res) => {
    try {
      const { nome, descricao } = req.body;

      if (!nome || nome.trim().length === 0) throw new Error("Nome e obrigatorio");
      if (!descricao || descricao.trim().length === 0) throw new Error("Descricao e obrigatoria");

      const categoria = repository.salvarCategoria({ nome, descricao });
      res.status(201).json(categoria);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.put("/categorias/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const categoria = repository.atualizarCategoria(id, req.body);
    if (!categoria) return res.status(404).json({ erro: "Categoria nao encontrada" });
    res.json(categoria);
  });
}
