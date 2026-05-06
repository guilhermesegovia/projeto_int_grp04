export interface Estoque {
    id?: number;
    tipo: string;
    quantidade: number;
    data_entrada: Date;
    data_validade: Date | null;
    id_produto: number;
    id_funcionario: number;
}
