import { app } from "../app";
import { FuncionarioRepository } from "../repositories/FuncionarioRepository";

export function FuncionarioController() {
  const repository = new FuncionarioRepository();

  app.get("/funcionarios", (req, res) => {
    const { nome } = req.query;

    if (nome) {
      const funcionario = repository.buscarPorNome(nome as string);
      if (!funcionario || funcionario.length === 0) return res.status(404).json({ erro: "Funcionario nao encontrado" });
      return res.json(funcionario);
    }

    res.json(repository.listarFuncionarios());
  });

  app.get("/funcionarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const funcionario = repository.buscarPorId(id);
    if (!funcionario) return res.status(404).json({ erro: "Funcionario nao encontrado" });
    res.json(funcionario);
  });

  app.post("/funcionarios", (req, res) => {
    try {
      const { nome, setor, cargo, data_nascimento, cpf, email, senha } = req.body;

      if (!nome || nome.trim().length === 0) throw new Error("Nome e obrigatorio");
      if (!setor || setor.trim().length === 0) throw new Error("Setor e obrigatorio");
      if (!cargo || cargo.trim().length < 5) throw new Error("Cargo invalido");
      if (!data_nascimento) throw new Error("Data de nascimento e obrigatoria");
      if (!cpf || cpf.length < 11) throw new Error("CPF invalido");
      if (!email || !email.includes("@")) throw new Error("Email invalido");
      if (!senha || senha.length < 8) throw new Error("Senha invalida");
      const dataNascimento = new Date(data_nascimento);
      if (Number.isNaN(dataNascimento.getTime())) throw new Error("Data de nascimento invalida");

      const funcionarioExistente = repository.buscarPorEmail(email);
      if (funcionarioExistente) throw new Error("Email ja cadastrado");

      const funcionario = repository.SalvarFuncionario({
        nome,
        setor,
        cargo,
        data_nascimento: dataNascimento,
        cpf,
        email,
        senha
      });

      res.status(201).json(funcionario);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.put("/funcionarios/:id", (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data_nascimento = new Date(req.body.data_nascimento);
      if (!req.body.data_nascimento || Number.isNaN(data_nascimento.getTime())) throw new Error("Data de nascimento invalida");

      const funcionario = repository.atualizarFuncionario(id, {
        ...req.body,
        data_nascimento
      });
      if (!funcionario) return res.status(404).json({ erro: "Funcionario nao encontrado" });
      res.json(funcionario);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  app.delete("/funcionarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const deletado = repository.deletarFuncionario(id);
    if (!deletado) return res.status(404).json({ erro: "Funcionario nao encontrado" });
    res.json({ mensagem: "Funcionario deletado com sucesso" });
  });
}
