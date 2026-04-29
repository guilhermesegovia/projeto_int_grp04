import db from '../database/database';
import { Categoria } from '../models/Categoria';

export class CategoriaRepository {
    salvarCategoria(c: Categoria): Categoria {
        const resultado = db
        .prepare('INSERT INTO categorias (nome, descricao) VALUES (?, ?)')
        .run(c.nome, c.descricao);

        return {
            id: Number(resultado.lastInsertRowid),
            nome: c.nome,
            descricao: c.descricao
        };
    }

    listarCategorias(): Categoria[] {
        return db
        .prepare('SELECT * FROM categorias').all() as Categoria[];
    }

    buscarPorId(id: number): Categoria | null {
        return db
        .prepare('SELECT * FROM categorias WHERE id = ?').get(id) as Categoria ?? null;
    }

    buscarPorNome(nome: string): Categoria[] {
        const resultado = db
        .prepare('SELECT * FROM categorias WHERE nome LIKE ?').all(`%${nome}%`) as Categoria[];
            return resultado.length === 0 ? [] : resultado;
    }

    atualizarCategoria(id: number, c: Categoria): Categoria | null {
        const resultado = db
        .prepare('UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?')
        .run(c.nome, c.descricao, id);

        return this.buscarPorId(id);
}

}