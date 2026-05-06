import { app } from "../app";
import { AvaliacaoRepository } from "../repositories/AvaliacaoRepository";

export function AvaliacaoController() {
  const repository = new AvaliacaoRepository();

  app.get("/avaliacoes", (req, res) => {
    res.json(repository.listarAvaliacoes());
  });

  app.post("/avaliacoes", (req, res) => {
    try {
      const { comentario, estrelas, id_produto } = req.body;

      if (!comentario || comentario.trim().length === 0) throw new Error("Comentario e obrigatorio");
      if (estrelas === undefined) throw new Error("Estrelas e obrigatorio");

      const avaliacao = repository.salvarAvaliacao({ comentario, estrelas, id_produto });
      res.status(201).json(avaliacao);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.delete("/avaliacoes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const deletado = repository.deletarAvaliacao(id);
    if (!deletado) return res.status(404).json({ erro: "Avaliacao nao encontrada" });
    res.json({ mensagem: "Avaliacao deletada com sucesso" });
  });
}
