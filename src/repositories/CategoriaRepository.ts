import db from '../database/database';
import { Categoria } from '../models/Categoria';

export class CategoriaRepository {
    salvarCategoria(c: Categoria): Categoria {
        const resultado = db
        .prepare('INSERT INTO categoria (nome, descricao) VALUES (?, ?)')
        .run(c.nome, c.descricao);

        return {
            id: Number(resultado.lastInsertRowid),
            nome: c.nome,
            descricao: c.descricao
        };
    }

    listarCategorias(): Categoria[] {
        return db
        .prepare('SELECT * FROM categoria').all() as Categoria[];
    }

    buscarPorId(id: number): Categoria | null {
        return db
        .prepare('SELECT * FROM categoria WHERE id = ?').get(id) as Categoria ?? null;
    }

    buscarPorNome(nome: string): Categoria[] {
        const resultado = db
        .prepare('SELECT * FROM categoria WHERE nome LIKE ?').all(`%${nome}%`) as Categoria[];
            return resultado.length === 0 ? [] : resultado;
    }

    atualizarCategoria(id: number, c: Categoria): Categoria | null {
        const resultado = db
        .prepare('UPDATE categoria SET nome = ?, descricao = ? WHERE id = ?')
        .run(c.nome, c.descricao, id);

        if (resultado.changes === 0) return null;
        return this.buscarPorId(id);
}

}
