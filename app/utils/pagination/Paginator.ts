import {Request, Response} from "express";
import {Page} from "./Page";
import Env from "../env/Env";
import * as url from "url";
import {RestQueryInterpreter} from "../rest/RestQueryInterpreter";
import {RequestQueryMap} from "../rest/RequestQueryMap";
import {RestQuery} from "../rest/RestQuery";
import {Restriction} from "../restriction/Restriction";

export default class Paginator {
    private static Env: any;

    private constructor() {
    }

    public static buildPage<T>(query: RequestQueryMap,
                               querryAsserter: (restQuery: RestQuery) => Promise<RestQuery>,
                               bodyGetter: (restrictions: Restriction<any>[]) => Promise<T[]>,
                               totalSizeCounter: (restrictions: Restriction<any>[]) => Promise<number>): Promise<Page<T>> {

        return new Promise((resolve: (page: Page<T>) => void, reject: (error: Error) => void) => {

            let page: Page<T> = new Page<T>();

            RestQueryInterpreter.parse(query) //Interpresta a query
                .then((restQuery: RestQuery) => {

                    //Armazena os valores de limit e offset para paginação
                    page.offset = restQuery.offset.value;
                    page.limit = restQuery.limit.value;

                    return querryAsserter(restQuery); //Valida campos da query
                })
                .then((restQuery: RestQuery) =>
                    //Realiza em paralelo a obtenção dos dados e a contagem
                    Promise.all<Promise<T[]>, number>(
                        [
                            bodyGetter([...restQuery.restrictions, restQuery.limit, restQuery.offset]), //Obtem os pagamentos,
                            totalSizeCounter(restQuery.restrictions) //Conta os pagamentos
                        ]
                    )
                )
                .then((values: any[]) => {
                    page.body = values[0];
                    page.totalCount = values[1];

                    resolve(page);
                })
                .catch(reject);
        });
    }

    public static setPageResponse(req: Request, res: Response, page: Page<any>) {

        let links = {};

        if (page.hasNext()) {
            let nextPageUrl: url.Url = url.parse(req.originalUrl, true);
            nextPageUrl.search = null;
            nextPageUrl.query._offset = nextPageUrl.query._offset ? nextPageUrl.query._offset++ : 2;
            links['next'] = url.resolve(url.format(Env.APLICATION_BASE_PATH), url.format(nextPageUrl));
        }

        if (page.hasPrevious()) {
            let prevPageUrl: url.Url = url.parse(req.originalUrl, true);
            prevPageUrl.search = null;
            prevPageUrl.query._offset = prevPageUrl.query._offset--;
            links['previous'] = url.resolve(url.format(Env.APLICATION_BASE_PATH), url.format(prevPageUrl));
        }

        res
            .header("X-Total-Count", page.totalCount.toString())
            .links(links) //Monta os links
            .json(page.body); //Devolve os pagamentos
    }


}
