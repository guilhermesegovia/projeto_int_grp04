import db from "../database/database";
import { Carrinho } from "../models/Carrinho";

export class CarrinhoRepository {
    adicionaraocarrinho(id_cliente: number, id_produto: number, quantidade: number): void {
        const item = db.prepare(
            'SELECT quantidade FROM carrinho WHERE id_cliente = ? AND id_produto = ?'
        ).get(id_cliente, id_produto) 
            if (quantidade <= 0) return;

    if (item) {
        db.prepare(
            'UPDATE carrinho SET quantidade = quantidade + ? WHERE id_cliente = ? AND id_produto = ?'
        ).run(quantidade, id_cliente, id_produto);
    } else {
        db.prepare(
            'INSERT INTO carrinho (id_cliente, id_produto, quantidade) VALUES (?, ?, ?)'
        ).run(id_cliente, id_produto, quantidade);
    }
    }

    RemoverDoCarrinho(id_cliente: number, id_produto: number): void {
        db.prepare(
            'DELETE FROM carrinho WHERE id_cliente = ? AND id_produto = ?'
        ).run(id_cliente, id_produto);
    }

    AtualizarQuantidade(id_cliente: number, id_produto: number, quantidade: number): void {
        db.prepare('UPDATE carrinho SET quantidade = ? WHERE id_cliente = ? AND id_produto = ?').run(quantidade, id_cliente, id_produto);
    }

    Vercarrinho(id_cliente: number): Carrinho[] {
        return db.prepare('SELECT * FROM carrinho WHERE id_cliente = ?').all(id_cliente) as Carrinho[];
    }

    LimparCarrinho(id_cliente: number): void {
        db.prepare('DELETE FROM carrinho WHERE id_cliente = ?').run(id_cliente);
    }
}