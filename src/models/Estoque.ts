export interface Estoque {
    id?: number;
    tipo: string;
    quantidade: number;
    data_entrada: Date;
    data_saida: Date;
    id_produto: number;
    id_funcionario: number;
}