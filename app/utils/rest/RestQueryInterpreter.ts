import {RequestQueryMap} from "./RequestQueryMap";
import {Restriction, Limit, Offset} from "../restriction/Restriction";
import {isUndefined} from "util";
import RestQueryOperations from "./RestQueryOperations";
import {RestQuery} from "./RestQuery";
import resolve = Promise.resolve;
import reject = Promise.reject;

export class RestQueryInterpreter {

    private constructor() {
    }

    public static parse(query: RequestQueryMap): Promise<RestQuery> {
        return new Promise((resolve: (restrictions: RestQuery) => void, reject: (error: Error) => void) => {
            try {
                let restrictions: Restriction<any>[] = [];

                let limitQuery: number = isUndefined(query['_limit']) ? 10 : Number(query['_limit']);
                delete query['_limit'];

                let offsetQuery: number = isUndefined(query['_offset']) ? 1 : Number(query['_offset']);
                delete query['_offset'];

                for (let field in query) {
                    for (let operation in RestQueryOperations) {
                        if (field.substring(field.length - operation.length) == operation) {
                            restrictions.push(new RestQueryOperations[operation](field.replace(operation, ""), query[field]));
                            break;
                        }
                    }
                }

                let limit : Limit = new Limit(limitQuery);
                let offset : Offset = new Offset(offsetQuery);

                resolve(new RestQuery(restrictions, limit, offset));
            } catch (error) {
                reject(error);
            }
        });
    }
}