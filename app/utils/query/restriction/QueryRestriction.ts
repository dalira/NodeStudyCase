import {Document, DocumentQuery} from "mongoose";

export interface QueryRestriction<T extends Document> {

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>);

}