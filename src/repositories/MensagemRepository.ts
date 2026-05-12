import db from '../database/database';
import { Mensagem } from '../models/Mensagem';

export class MensagemRepository {
    salvarMensagem(m: Mensagem): Mensagem {
        const resultado = db
        .prepare('INSERT INTO mensagem (nome, email, mensagem, data_hora, id_cliente) VALUES (?, ?, ?, ?, ?)')
        .run(m.nome, m.email, m.mensagem, m.data_hora.toISOString(), m.id_cliente ?? null);

        return {
            id: Number(resultado.lastInsertRowid),
            nome: m.nome,
            email: m.email,
            mensagem: m.mensagem,
            data_hora: m.data_hora,
            id_cliente: m.id_cliente
        };
    }

    listarMensagens(): Mensagem[] {
        return db.prepare('SELECT * FROM mensagem ORDER BY data_hora DESC').all() as Mensagem[];
    }

    buscarPorCliente(id_cliente: number): Mensagem[] {
        return db.prepare('SELECT * FROM mensagem WHERE id_cliente = ? ORDER BY data_hora DESC').all(id_cliente) as Mensagem[];
    }

    buscarPorId(id: number): Mensagem | null {
        return db.prepare('SELECT * FROM mensagem WHERE id = ?').get(id) as Mensagem ?? null;
    }

    responderMensagem(id: number, resposta: string): boolean {
        const resultado = db
        .prepare('UPDATE mensagem SET resposta = ?, data_resposta = ? WHERE id = ?')
        .run(resposta, new Date().toISOString(), id);
        return resultado.changes > 0;
    }
}
