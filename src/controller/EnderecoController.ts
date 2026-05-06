import { app } from "../app";
import { EnderecoRepository } from "../repositories/EnderecoRepository";

export function EnderecoController() {
  const repository = new EnderecoRepository();

  app.get("/enderecos", (req, res) => {
    res.json(repository.listarEnderecos());
  });

  app.get("/enderecos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const endereco = repository.buscarPorId(id);
    if (!endereco) return res.status(404).json({ erro: "Endereco nao encontrado" });
    res.json(endereco);
  });

  app.post("/enderecos", (req, res) => {
    try {
      const { rua, numero, bairro, cidade, estado, cep, id_cliente } = req.body;

      if (!rua || rua.trim().length === 0) throw new Error("Rua e obrigatoria");
      if (!numero) throw new Error("Numero e obrigatorio");
      if (!bairro) throw new Error("Bairro e obrigatorio");
      if (!cidade) throw new Error("Cidade e obrigatoria");
      if (!estado || estado.length !== 2) throw new Error("Estado invalido");
      if (!cep || cep.length !== 8) throw new Error("CEP invalido");
      if (!id_cliente) throw new Error("Cliente e obrigatorio");

      const endereco = repository.salvarEndereco(req.body);
      res.status(201).json(endereco);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.put("/enderecos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const endereco = repository.atualizarEndereco(id, req.body);
    if (!endereco) return res.status(404).json({ erro: "Endereco nao encontrado" });
    res.json(endereco);
  });

  app.delete("/enderecos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const deletado = repository.deletarEndereco(id);
    if (!deletado) return res.status(404).json({ erro: "Endereco nao encontrado" });
    res.json({ mensagem: "Endereco deletado com sucesso" });
  });
}
