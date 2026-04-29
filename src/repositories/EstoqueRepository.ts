import db from '../database/database';
import { Estoque } from '../models/Estoque';

export class EstoqueRepository {
    salvar(e: Estoque): Estoque {
        const resultado = db
            .prepare('INSERT INTO estoque (tipo, quantidade, data_entrada, data_saida, id_produto, id_funcionario) VALUES (?, ?, ?, ?, ?, ?)')
            .run(e.tipo, e.quantidade, e.data_entrada, e.data_saida, e.id_produto, e.id_funcionario);

        return {
            id: Number(resultado.lastInsertRowid),
            tipo: e.tipo,
            quantidade: e.quantidade,
            data_entrada: e.data_entrada,
            data_saida: e.data_saida,
            id_produto: e.id_produto,
            id_funcionario: e.id_funcionario
        };
    }

    listarEstoques(): Estoque[] {
        return db.prepare('SELECT * FROM estoque').all() as Estoque[];
    }

    buscarPorId(id: number): Estoque | null {
        return (db.prepare('SELECT * FROM estoque WHERE id = ?').get(id) as Estoque) ?? null;
    }

    buscarPorProduto(id_produto: number): Estoque[] {
        return db.prepare('SELECT * FROM estoque WHERE id_produto = ?').all(id_produto) as Estoque[] ?? null;
  }

    RegistrarMovimentacao(id_produto: number, id_funcionario: number, tipo: 'entrada' | 'saida_venda' | 'saida_troca' | 'saida_avaria', quantidade: number): void {
        const data = new Date();
        db.prepare('INSERT INTO estoque (tipo, quantidade, data_entrada, id_produto, id_funcionario) VALUES (?, ?, ?, ?, ?)')
            .run(tipo, quantidade, data, id_produto, id_funcionario);
    }

    ListarMovimentacoes(id_produto: number): Estoque[] {
        return db.prepare('SELECT * FROM estoque WHERE id_produto = ? ORDER BY data_entrada DESC').all(id_produto) as Estoque[];
    }

    VerificarEstoqueBaixo(id_produto: number, quantidade_minima: number): boolean {
        const estoqueAtual = db.prepare('SELECT SUM(CASE WHEN tipo = "entrada" THEN quantidade ELSE -quantidade END) AS total FROM estoque WHERE id_produto = ?').get(id_produto) as { total: number | null };
        return (estoqueAtual.total ?? 0) < quantidade_minima;
    }

}