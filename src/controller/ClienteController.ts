import { app } from "../app";
import { ClienteRepository } from "../repositories/ClienteRepository";

export function ClienteController() {
  const repository = new ClienteRepository();

  app.post("/clientes/login", (req, res) => {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) throw new Error("Email e senha sao obrigatorios");
      const cliente = repository.buscarPorEmail(email);
      if (!cliente || cliente.senha !== senha) {
        return res.status(401).json({ erro: "Credenciais invalidas" });
      }
      res.json(cliente);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.get("/clientes", (req, res) => {
    const { nome } = req.query;

    if (nome) {
      const cliente = repository.buscarPorNome(nome as string);
      if (!cliente || cliente.length === 0) return res.status(404).json({ erro: "Cliente nao encontrado" });
      return res.json(cliente);
    }

    res.json(repository.listarClientes());
  });

  app.get("/clientes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = repository.buscarPorId(id);
    if (!cliente) return res.status(404).json({ erro: "Cliente nao encontrado" });
    res.json(cliente);
  });

  app.post("/clientes", (req, res) => {
    try {
      const { nome, telefone, cpf, email, senha, data_nascimento } = req.body;

      if (!nome || nome.trim().length === 0) throw new Error("Nome e obrigatorio");
      if (!telefone || telefone.length < 11) throw new Error("Telefone invalido");
      if (!cpf || cpf.length < 11) throw new Error("CPF invalido");
      if (!email || !email.includes("@")) throw new Error("Email invalido");
      if (!senha || senha.length < 8) throw new Error("Senha invalida");
      if (!data_nascimento) throw new Error("Data de nascimento e obrigatoria");
      const dataNascimento = new Date(data_nascimento);
      if (Number.isNaN(dataNascimento.getTime())) throw new Error("Data de nascimento invalida");

      const cliente = repository.salvarCliente({
        nome,
        telefone,
        cpf,
        email,
        senha,
        data_nascimento: dataNascimento
      });

      res.status(201).json(cliente);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.put("/clientes/:id", (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data_nascimento = new Date(req.body.data_nascimento);
      if (!req.body.data_nascimento || Number.isNaN(data_nascimento.getTime())) throw new Error("Data de nascimento invalida");

      const cliente = repository.atualizarCliente(id, {
        ...req.body,
        data_nascimento
      });
      if (!cliente) return res.status(404).json({ erro: "Cliente nao encontrado" });
      res.json(cliente);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.delete("/clientes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const deletado = repository.deletarCliente(id);
    if (!deletado) return res.status(404).json({ erro: "Cliente nao encontrado" });
    res.json({ mensagem: "Cliente deletado com sucesso" });
  });
}
