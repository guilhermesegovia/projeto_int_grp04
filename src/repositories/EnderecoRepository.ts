import db from '../database/database';
import { Endereco } from '../models/Endereco';

export class EnderecoRepository {
    salvarEndereco(e: Endereco): Endereco {
        const resultado = db
        .prepare('INSERT INTO endereco (rua, numero, complemento, bairro, cidade, estado, cep, id_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
        .run(e.rua, e.numero, e.complemento, e.bairro, e.cidade, e.estado, e.cep, e.id_cliente);

        return {
            id: Number(resultado.lastInsertRowid),
            rua: e.rua,
            numero: e.numero,
            complemento: e.complemento,
            bairro: e.bairro,
            cidade: e.cidade,
            estado: e.estado,
            cep: e.cep,
            id_cliente: e.id_cliente
        };
    }

    listarEnderecos(): Endereco[] {
        return db
        .prepare('SELECT * FROM endereco').all() as Endereco[];
    }

    buscarPorId(id: number): Endereco | null {
        return db
        .prepare('SELECT * FROM endereco WHERE id = ?').get(id) as Endereco ?? null;
    }       

    atualizarEndereco(id: number, e: Endereco): Endereco | null {
        const resultado = db
        .prepare('UPDATE endereco SET rua = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, estado = ?, cep = ?, id_cliente = ? WHERE id = ?')
        .run(e.rua, e.numero, e.complemento, e.bairro, e.cidade, e.estado, e.cep, e.id_cliente, id);

        if (resultado.changes === 0) return null;
        return this.buscarPorId(id);
    }

    deletarEndereco(id: number): boolean {
        const resultado = db
        .prepare('DELETE FROM endereco WHERE id = ?')
        .run(id);
            return resultado.changes > 0;
    }
}
