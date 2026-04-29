import { app } from "../app";
import { ProdutoRepository } from "../repositories/ProdutoRepository";

export function ProdutoController() {
    const produtoRepository = new ProdutoRepository();

    app.get("/produtos", (req, res) => {
        const produtos = produtoRepository.listarProdutos();
        res.json(produtos);
    });

    app.get("/produtos/:id", (req, res) => {
        const id = Number(req.params.id);
        const produto = produtoRepository.buscarPorId(id);
        if (produto) {
            res.json(produto);
        } else {
            res.status(404).json({ message: "Produto não encontrado" });
        }
    });

    app.post("/produtos", (req, res) => {
        const novoProduto = req.body;
        const produtoSalvo = produtoRepository.salvar(novoProduto);
        res.status(201).json(produtoSalvo);
    });

    app.put("/produtos/:id", (req, res) => {
        const id = Number(req.params.id);
        const produtoAtualizado = req.body;
        const produto = produtoRepository.AtualizarProduto(id, produtoAtualizado);
        if (produto) {
            res.json(produto);
        } else {
            res.status(404).json({ message: "Produto não encontrado" });
        }
    });

    app.delete("/produtos/:id", (req, res) => {
        const id = Number(req.params.id);
        const sucesso = produtoRepository.DeletarProduto(id);
        if (sucesso) {
            res.json({ message: "Produto deletado com sucesso" });
        } else {
            res.status(404).json({ message: "Produto não encontrado" });
        }
    });
}