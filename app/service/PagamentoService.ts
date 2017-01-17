import {PagamentoDAO} from "../persistence/PagamentoDAO";
import {Pagamento} from "../models/Pagamento";
import {StatusPagamento} from "../models/StatusPagamento";
import {Restriction, Limit, Offset} from "../utils/restriction/Restriction";
import {QueryInterpreter} from "../utils/query/QueryRestriction";
import reject = Promise.reject;

export class PagamentoService {

    private dao: PagamentoDAO;

    public constructor() {
        this.dao = new PagamentoDAO()
    }

    public registrarPagamento(pagamento: Pagamento): Promise<Pagamento> {
        return new Promise((resolve: (pagamentoRegistrado: Pagamento) => void, reject: (error: Error) => void) => {

            pagamento.status = StatusPagamento.Pendente;

            this.dao.insereERecupera(pagamento)
                .then(resolve)
                .catch(reject);
        });
    }

    public obterPagamentoById(id: string) {
        return new Promise((resolve: (pagamentoRegistrado: Pagamento) => void, reject: (error: Error) => void) => {
            this.dao.buscarPorId(id)
                .then(resolve)
                .catch(reject);
        });
    }

    public countPagamentos(restrictions: Restriction<any>[]): Promise<number> {
        return new Promise((resolve: (pagamentos: number) => void, reject: (error: Error) => void) => {
            this.dao.count(...QueryInterpreter.parse(restrictions))
                .then(resolve)
                .catch(reject);
        });
    }

    public obterPagamentos(restrictions: Restriction<any>[]): Promise<Pagamento[]> {
        return new Promise((resolve: (pagamentos: Pagamento[]) => void, reject: (error: Error) => void) => {
            this.dao.buscar(...QueryInterpreter.parse(restrictions))
                .then(resolve)
                .catch(reject);
        });
    }

}