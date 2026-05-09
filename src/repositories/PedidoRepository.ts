import db from '../database/database';
import { Pedido } from '../models/Pedido';

export class PedidoRepository {
    salvarPedido(p: Pedido): Pedido {
        const resultado = db
        .prepare('INSERT INTO pedido (frete, cupom, total, data_hora, id_cliente, id_endereco) VALUES (?, ?, ?, ?, ?, ?)')
        .run(p.frete, p.cupom, p.total, p.data_hora.toISOString(), p.id_cliente, p.id_endereco);

        return {
            id: Number(resultado.lastInsertRowid),
            frete: p.frete,
            cupom: p.cupom,
            total: p.total,
            data_hora: p.data_hora,
            id_cliente: p.id_cliente,
            id_endereco: p.id_endereco
        };
    }

adicionarProdutoAoPedido(id_pedido: number, id_produto: number, quantidade: number): void {
    db.prepare('INSERT INTO item_pedido (id_pedido, id_produto, quantidade) VALUES (?, ?, ?)').run(id_pedido, id_produto, quantidade);
}

listarPedidos(): Pedido[] {
    return db.prepare('SELECT * FROM pedido').all() as Pedido[];
}

buscarPedidoPorId(id: number): Pedido | null {
    return db.prepare('SELECT * FROM pedido WHERE id = ?').get(id) as Pedido ?? null;
}

buscarPedidosPorCliente(id_cliente: number): Pedido[] {
    return db.prepare('SELECT * FROM pedido WHERE id_cliente = ?').all(id_cliente) as Pedido[];
}

listarItensDoPedido(id_pedido: number): { id_produto: number; quantidade: number }[] {
    return db.prepare('SELECT id_produto, quantidade FROM item_pedido WHERE id_pedido = ?').all(id_pedido) as { id_produto: number; quantidade: number }[];
}

calcularTotalDoPedido(id_pedido: number): number {
    const resultado = db.prepare(`SELECT SUM(p.valor * pp.quantidade) as total
        FROM item_pedido pp
        JOIN produto p ON pp.id_produto = p.id
        WHERE pp.id_pedido = ?`).get(id_pedido) as { total: number | null };
   
    const totalProdutos = resultado.total ?? 0;

    db.prepare('UPDATE pedido SET total = ? WHERE id = ?')
        .run(totalProdutos, id_pedido);

        return totalProdutos;
}

deletarPedido(id: number): boolean {
    const deletar = db.transaction((id_pedido: number) => {
        db.prepare('DELETE FROM pagamento WHERE id_pedido = ?').run(id_pedido);
        db.prepare('DELETE FROM item_pedido WHERE id_pedido = ?').run(id_pedido);

        const resultado = db.prepare('DELETE FROM pedido WHERE id = ?')
        .run(id_pedido);
        return resultado.changes > 0;
    });

    return deletar(id);
}
}
