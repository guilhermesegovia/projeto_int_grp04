export interface Produto {
    id?: number;
    nome_produto: string;
    composicao: string;
    indicacao: string;
    beneficios: string;
    advertencias: string;
    modo_uso: string;
    lote: string;
    validade: Date;
    descricao: string;
    finalidade: string;
    valor: number;
    id_categoria: number;
}