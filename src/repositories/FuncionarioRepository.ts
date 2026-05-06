import db from '../database/database';
import { Funcionario } from '../models/Funcionario';

export class FuncionarioRepository {
    SalvarFuncionario(f: Funcionario): Funcionario {
        const resultado = db
        .prepare('INSERT INTO funcionario (nome, setor, cargo, data_nascimento, cpf, email, senha) VALUES (?, ?, ?, ?, ?, ?, ?)')
        .run(f.nome, f.setor, f.cargo, f.data_nascimento.toISOString(), f.cpf, f.email, f.senha);

        return {
            id: Number(resultado.lastInsertRowid),
            nome: f.nome,
            setor: f.setor,
            cargo: f.cargo,
            data_nascimento: f.data_nascimento,
            cpf: f.cpf,
            email: f.email,
            senha: f.senha
        };
    }

    listarFuncionarios(): Funcionario[] {
        return db
        .prepare('SELECT * FROM funcionario').all() as Funcionario[];
    }

    buscarPorId(id: number): Funcionario | null {
        return db
        .prepare('SELECT * FROM funcionario WHERE id = ?').get(id) as Funcionario ?? null;
    }

    buscarPorNome(nome: string): Funcionario[] {
        const resultado = db
        .prepare('SELECT * FROM funcionario WHERE nome LIKE ?').all(`%${nome}%`) as Funcionario[];
            return resultado.length === 0 ? [] : resultado;
    }

    buscarPorEmail(email: string): Funcionario | null {
        return db
        .prepare('SELECT * FROM funcionario WHERE email = ?').get(email) as Funcionario ?? null;
    }

    atualizarFuncionario(id: number, f: Funcionario): Funcionario | null {
        const resultado = db
        .prepare('UPDATE funcionario SET nome = ?, setor = ?, cargo = ?, data_nascimento = ?, cpf = ?, email = ?, senha = ? WHERE id = ?')
        .run(f.nome, f.setor, f.cargo, f.data_nascimento.toISOString(), f.cpf, f.email, f.senha, id);

        if (resultado.changes === 0) return null;
        return this.buscarPorId(id);
    }

    deletarFuncionario(id: number): boolean {
        const resultado = db
        .prepare('DELETE FROM funcionario WHERE id = ?')
        .run(id);
            return resultado.changes > 0;
    }

}
