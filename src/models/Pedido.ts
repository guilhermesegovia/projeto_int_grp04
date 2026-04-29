export interface Pedido {
    id?: number;
    frete: number;
    cupom: string;
    total: number;
    data_hora: Date;
    id_cliente: number;
    id_endereco: number;
}