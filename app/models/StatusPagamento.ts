export enum StatusPagamento {
    Pendente, Processando, Pago,
}

export class StatusPagamentoHelper {
    public static getAllValues(): StatusPagamento[] {
        return [StatusPagamento.Pendente, StatusPagamento.Processando, StatusPagamento.Pago];
    }
}
