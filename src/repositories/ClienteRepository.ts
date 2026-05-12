import db from '../database/database';
import { Cliente } from '../models/Cliente';

export class ClienteRepository {
    salvarCliente(c: Cliente): Cliente {
        const resultado = db
        .prepare('INSERT INTO cliente (nome, telefone, cpf, email, senha, data_nascimento) VALUES (?, ?, ?, ?, ?, ?)')
        .run(c.nome, c.telefone, c.cpf, c.email, c.senha, c.data_nascimento.toISOString());

        return {
            id: Number(resultado.lastInsertRowid),
            nome: c.nome,
            telefone: c.telefone,
            cpf: c.cpf,
            email: c.email,
            senha: c.senha,
            data_nascimento: c.data_nascimento
        };
    }

    listarClientes(): Cliente[] {
        return db
        .prepare('SELECT * FROM cliente').all() as Cliente[];
    }

    buscarPorId(id: number): Cliente | null {
        return db
        .prepare('SELECT * FROM cliente WHERE id = ?').get(id) as Cliente ?? null;
    }

    buscarPorEmail(email: string): Cliente | null {
        return db
        .prepare('SELECT * FROM cliente WHERE email = ?').get(email) as Cliente ?? null;
    }

    buscarPorNome(nome: string): Cliente[] {
        const resultado = db
        .prepare('SELECT * FROM cliente WHERE nome LIKE ?').all(`%${nome}%`) as Cliente[];
            return resultado.length === 0 ? [] : resultado;
    }

    atualizarCliente(id: number, c: Cliente): Cliente | null {
        const resultado = db
        .prepare('UPDATE cliente SET nome = ?, telefone = ?, cpf = ?, email = ?, senha = ?, data_nascimento = ? WHERE id = ?')
        .run(c.nome, c.telefone, c.cpf, c.email, c.senha, c.data_nascimento.toISOString(), id);

        if (resultado.changes === 0) return null;
        return this.buscarPorId(id);
}

    deletarCliente(id: number): boolean {
        const resultado = db
        .prepare('DELETE FROM cliente WHERE id = ?')
        .run(id);
            return resultado.changes > 0;
    }    

}
