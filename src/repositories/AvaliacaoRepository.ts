import db from '../database/database';
import { Avaliacao } from '../models/Avaliacao';

export class AvaliacaoRepository {
    salvarAvaliacao(a: Avaliacao): Avaliacao {
        const resultado = db
        .prepare('INSERT INTO avaliacoes (comentario, estrelas) VALUES (?, ?)')
        .run(a.comentario, a.estrelas);

        return {
            id: Number(resultado.lastInsertRowid),
            comentario: a.comentario,
            estrelas: a.estrelas
        };
    }

    listarAvaliacoes(): Avaliacao[] {
        return db
        .prepare('SELECT * FROM avaliacoes').all() as Avaliacao[];
    }

    listarAvaliacoesPorProduto(id_produto: number): Avaliacao[] {
        return db
        .prepare('SELECT * FROM avaliacoes WHERE id_produto = ?').all(id_produto) as Avaliacao[];
    }

    deletarAvaliacao(id: number): boolean {
        const resultado = db
        .prepare('DELETE FROM avaliacoes WHERE id = ?')
        .run(id);
            return true;
    }

}