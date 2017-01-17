export enum StatusPagamento {
    Pendente, Processando, Pago
}

export namespace StatusPagamento {
    export function values() : StatusPagamento[] {
        return [StatusPagamento.Pendente, StatusPagamento.Processando, StatusPagamento.Pago];
    }
}