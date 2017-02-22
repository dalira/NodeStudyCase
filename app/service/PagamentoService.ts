import pagamentoDAO from "../persistence/PagamentoDAO";
import {Pagamento} from "../models/Pagamento";
import {StatusPagamento} from "../models/StatusPagamento";
import {Restriction} from "../utils/restriction/Restriction";
import {QueryInterpreter} from "../utils/query/QueryRestriction";
import reject = Promise.reject;

class PagamentoService {

    public registrarPagamento(pagamento: Pagamento): Promise<Pagamento> {
        return new Promise((resolve: (pagamentoRegistrado: Pagamento) => void, reject: (error: Error) => void) => {

            pagamento.status = StatusPagamento.Pendente;

            pagamentoDAO.insereERecupera(pagamento)
                .then(resolve)
                .catch(reject);
        });
    }

    public obterPagamentoById(id: string) {
        return new Promise((resolve: (pagamentoRegistrado: Pagamento) => void, reject: (error: Error) => void) => {
            pagamentoDAO.buscarPorId(id)
                .then(resolve)
                .catch(reject);
        });
    }

    public countPagamentos(restrictions: Restriction<any>[]): Promise<number> {
        return new Promise((resolve: (pagamentos: number) => void, reject: (error: Error) => void) => {
            pagamentoDAO.count(...QueryInterpreter.parse(restrictions))
                .then(resolve)
                .catch(reject);
        });
    }

    public obterPagamentos(restrictions: Restriction<any>[]): Promise<Pagamento[]> {
        return new Promise((resolve: (pagamentos: Pagamento[]) => void, reject: (error: Error) => void) => {
            pagamentoDAO.buscar(...QueryInterpreter.parse(restrictions))
                .then(resolve)
                .catch(reject);
        });
    }

}

const pagamentoService = new PagamentoService();
export default pagamentoService;