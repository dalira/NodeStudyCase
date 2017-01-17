import {Page} from "./Page";
import {Response, Request} from "express";
import Env from "../env/Env";
import * as url from "url";

export default class Paginator {
    private static Env: any;

    private constructor() {
    }

    public static buildPaginatedResponse(req: Request, res: Response, page: Page<any>) {

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
