import db from '../database/database';
import { Pedido } from '../models/Pedido';

export class PedidoRepository {
    salvarPedido(p: Pedido): Pedido {
        const resultado = db
        .prepare('INSERT INTO pedidos (frete, cupom, total, data_hora, id_cliente, id_endereco) VALUES (?, ?, ?, ?, ?, ?)')
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

adiconarProdutoAoPedido(id_pedido: number, id_produto: number, quantidade: number): void {
    db.prepare('INSERT INTO pedido_produtos (id_pedido, id_produto, quantidade) VALUES (?, ?, ?)').run(id_pedido, id_produto, quantidade);
}

listarPedidos(): Pedido[] {
    return db.prepare('SELECT * FROM pedidos').all() as Pedido[];
}

buscarPedidoPorId(id: number): Pedido | null {
    return db.prepare('SELECT * FROM pedidos WHERE id = ?').get(id) as Pedido ?? null;
}

buscarPedidosPorCliente(id_cliente: number): Pedido[] {
    return db.prepare('SELECT * FROM pedidos WHERE id_cliente = ?').all(id_cliente) as Pedido[];
}

listarItensDoPedido(id_pedido: number): { id_produto: number; quantidade: number }[] {
    return db.prepare('SELECT id_produto, quantidade FROM pedido_produtos WHERE id_pedido = ?').all(id_pedido) as { id_produto: number; quantidade: number }[];
}

calcularTotalDoPedido(id_pedido: number): number {
    const resultado = db.prepare(`SELECT SUM(p.valor * pp.quantidade) as total
        FROM pedido_produtos pp
        JOIN produtos p ON pp.id_produto = p.id
        WHERE pp.id_pedido = ?`).get(id_pedido) as { total: number | null };
   
    const totalProdutos = resultado.total ?? 0;

    db.prepare('UPDATE pedidos SET total = ? WHERE id = ?')
        .run(totalProdutos, id_pedido);

        return totalProdutos;
}

deletarPedido(id: number): boolean {
    db.prepare('DELETE FROM pedidos WHERE id = ?')
    .run(id);
    return true;
}
}