import db from '../database/database';
import { Produto } from '../models/Produto';

export class ProdutoRepository {
    salvar(p: Produto): Produto {
        const resultado = db
            .prepare('INSERT INTO produto (nome_produto, composicao, indicacao, beneficios, advertencias, modo_uso, lote, validade, descricao, finalidade, valor, id_categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
            .run(p.nome_produto, p.composicao, p.indicacao, p.beneficios, p.advertencias, p.modo_uso, p.lote, p.validade.toISOString(), p.descricao, p.finalidade, p.valor, p.id_categoria);

            return { 
                id: Number(resultado.lastInsertRowid),
                nome_produto: p.nome_produto,
                composicao: p.composicao,
                indicacao: p.indicacao,
                beneficios: p.beneficios,
                advertencias: p.advertencias,
                modo_uso: p.modo_uso,
                lote: p.lote,
                validade: p.validade,
                descricao: p.descricao,
                finalidade: p.finalidade,
                valor: p.valor,
                id_categoria: p.id_categoria
            };
    }

    listarProdutos(): Produto[] {
        return db
        .prepare('SELECT * FROM produto').all() as Produto[];
            }

    buscarPorId(id: number): Produto | null {
        return db
        .prepare('SELECT * FROM produto WHERE id = ?').get(id) as Produto ?? null;
    }

    buscarPorNome(nome: string): Produto[] {
        const resultado = db
        .prepare ('SELECT * FROM produto WHERE nome_produto LIKE ?').all(`%${nome}%`) as Produto[];
            return resultado.length === 0 ? [] : resultado;
    }

    AtualizarProduto(id: number, p: Produto): Produto | null {
        const resultado = db
        .prepare ('UPDATE produto SET nome_produto = ?, composicao = ?, indicacao = ?, beneficios = ?, advertencias = ?, modo_uso = ?, lote = ?, validade = ?, descricao = ?, finalidade = ?, valor = ?, id_categoria = ? WHERE id = ?')
            .run(p.nome_produto, p.composicao, p.indicacao, p.beneficios, p.advertencias, p.modo_uso, p.lote, p.validade.toISOString(), p.descricao, p.finalidade, p.valor, p.id_categoria, id);

    if (resultado.changes === 0) return null;
    return this.buscarPorId(id);
}
    DeletarProduto(id: number): boolean {
        const resultado = db
        .prepare('DELETE FROM produto WHERE id = ?')
        .run(id);
            return resultado.changes > 0;
    }
}

