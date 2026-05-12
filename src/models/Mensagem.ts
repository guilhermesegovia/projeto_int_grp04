export interface Mensagem {
    id?: number;
    nome: string;
    email: string;
    mensagem: string;
    data_hora: Date;
    resposta?: string | null;
    data_resposta?: Date | null;
    id_cliente?: number | null;
}
