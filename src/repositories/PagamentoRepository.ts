import db from "../database/database";
import { Pagamento } from "../models/Pagamento";

export class PagamentoRepository {
    RegistrarPagamento(p: Pagamento): Pagamento {
        const resultado = db
                .prepare('INSERT INTO pagamento (metodo, status_pagamento, data_pagamento, status_entrega, valor, id_pedido) VALUES (?, ?, ?, ?, ?, ?)')
                .run(p.metodo, p.status_pagamento, p.data_pagamento, p.status_entrega, p.valor, p.id_pedido);
        return {
            id: Number(resultado.lastInsertRowid),
            metodo: p.metodo,
            status_pagamento: p.status_pagamento,
            data_pagamento: p.data_pagamento,
            status_entrega: p.status_entrega,
            valor: p.valor,
            id_pedido: p.id_pedido
        };
    }

    ListarPagamentos(): Pagamento[] {
        return db.prepare('SELECT * FROM pagamento').all() as Pagamento[];
    }

    BuscarPagamentoPorPedido(id_pedido: number): Pagamento | null {
        const resultado = (db.prepare('SELECT * FROM pagamento WHERE id_pedido = ?').all(id_pedido) as Pagamento[]);
        return resultado.length > 0 ? resultado[0] : null;
    }

    AtualizarStatusPagamento(id: number, status_pagamento: string): void {
        db.prepare('UPDATE pagamento SET status_pagamento = ? WHERE id = ?').run(status_pagamento, id);
    }
}