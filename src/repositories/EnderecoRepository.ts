import db from '../database/database';
import { Endereco } from '../models/Endereco';

export class EnderecoRepository {
    salvarEndereco(e: Endereco): Endereco {
        const resultado = db
        .prepare('INSERT INTO enderecos (rua, numero, complemento, bairro, cidade, estado, cep) VALUES (?, ?, ?, ?, ?, ?, ?)')
        .run(e.rua, e.numero, e.complemento, e.bairro, e.cidade, e.estado, e.cep);

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
        .prepare('SELECT * FROM enderecos').all() as Endereco[];
    }

    buscarPorId(id: number): Endereco | null {
        return db
        .prepare('SELECT * FROM enderecos WHERE id = ?').get(id) as Endereco ?? null;
    }       

    atualizarEndereco(id: number, e: Endereco): Endereco | null {
        const resultado = db
        .prepare('UPDATE enderecos SET rua = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, estado = ?, cep = ? WHERE id = ?')
        .run(e.rua, e.numero, e.complemento, e.bairro, e.cidade, e.estado, e.cep, id);

        return this.buscarPorId(id);
    }

    deletarEndereco(id: number): boolean {
        const resultado = db
        .prepare('DELETE FROM enderecos WHERE id = ?')
        .run(id);
            return true;
    }
}
