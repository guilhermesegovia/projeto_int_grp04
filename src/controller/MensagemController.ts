import { app } from "../app";
import { MensagemRepository } from "../repositories/MensagemRepository";

export function MensagemController() {
  const repository = new MensagemRepository();

  app.get("/mensagens", (req, res) => {
    const { id_cliente } = req.query;
    if (id_cliente) {
      return res.json(repository.buscarPorCliente(Number(id_cliente)));
    }
    res.json(repository.listarMensagens());
  });

  app.post("/mensagens", (req, res) => {
    try {
      const { nome, email, mensagem, id_cliente } = req.body;
      if (!nome || nome.trim().length === 0) throw new Error("Nome e obrigatorio");
      if (!email || !email.includes("@")) throw new Error("Email invalido");
      if (!mensagem || mensagem.trim().length === 0) throw new Error("Mensagem e obrigatoria");

      const m = repository.salvarMensagem({
        nome,
        email,
        mensagem,
        data_hora: new Date(),
        id_cliente: id_cliente ?? null
      });
      res.status(201).json(m);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.post("/mensagens/:id/resposta", (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { resposta } = req.body;
      if (!resposta || resposta.trim().length === 0) throw new Error("Resposta e obrigatoria");
      const ok = repository.responderMensagem(id, resposta);
      if (!ok) return res.status(404).json({ erro: "Mensagem nao encontrada" });
      res.json({ mensagem: "Resposta registrada com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}
