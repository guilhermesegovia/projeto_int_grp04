import db from '../database/database';
import { Avaliacao } from '../models/Avaliacao';

export class AvaliacaoRepository {
    salvarAvaliacao(a: Avaliacao): Avaliacao {
        const resultado = db
        .prepare('INSERT INTO avaliacao (comentario, estrelas, id_produto) VALUES (?, ?, ?)')
        .run(a.comentario, a.estrelas, a.id_produto ?? null);

        return {
            id: Number(resultado.lastInsertRowid),
            comentario: a.comentario,
            estrelas: a.estrelas,
            id_produto: a.id_produto
        };
    }

    listarAvaliacoes(): Avaliacao[] {
        return db
        .prepare('SELECT * FROM avaliacao').all() as Avaliacao[];
    }

    listarAvaliacoesPorProduto(id_produto: number): Avaliacao[] {
        return db
        .prepare('SELECT * FROM avaliacao WHERE id_produto = ?').all(id_produto) as Avaliacao[];
    }

    deletarAvaliacao(id: number): boolean {
        const resultado = db
        .prepare('DELETE FROM avaliacao WHERE id = ?')
        .run(id);
            return resultado.changes > 0;
    }

}
