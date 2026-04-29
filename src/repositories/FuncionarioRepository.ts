import db from '../database/database';
import { Funcionario } from '../models/Funcionario';

export class FuncionarioRepository {
    SalvarFuncionario(f: Funcionario): Funcionario {
        const resultado = db
        .prepare('INSERT INTO funcionarios (nome, telefone, cpf, email, senha, cargo) VALUES (?, ?, ?, ?, ?, ?)')
        .run(f.nome, f.telefone, f.cpf, f.email, f.senha, f.cargo);

        return {
            id: Number(resultado.lastInsertRowid),
            nome: f.nome,
            telefone: f.telefone,
            cpf: f.cpf,
            email: f.email,
            senha: f.senha,
            cargo: f.cargo
        };
    }

    listarFuncionarios(): Funcionario[] {
        return db
        .prepare('SELECT * FROM funcionarios').all() as Funcionario[];
    }

    buscarPorId(id: number): Funcionario | null {
        return db
        .prepare('SELECT * FROM funcionarios WHERE id = ?').get(id) as Funcionario ?? null;
    }

    buscarPorNome(nome: string): Funcionario[] {
        const resultado = db
        .prepare('SELECT * FROM funcionarios WHERE nome LIKE ?').all(`%${nome}%`) as Funcionario[];
            return resultado.length === 0 ? [] : resultado;
    }

    atualizarFuncionario(id: number, f: Funcionario): Funcionario | null {
        const resultado = db
        .prepare('UPDATE funcionarios SET nome = ?, telefone = ?, cpf = ?, email = ?, senha = ?, cargo = ? WHERE id = ?')
        .run(f.nome, f.telefone, f.cpf, f.email, f.senha, f.cargo, id);

        return this.buscarPorId(id);
    }

    deletarFuncionario(id: number): boolean {
        const resultado = db
        .prepare('DELETE FROM funcionarios WHERE id = ?')
        .run(id);
            return true;
    }

}