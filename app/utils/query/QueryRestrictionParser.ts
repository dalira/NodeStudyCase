import {QueryRestriction, QueryLimit, QueryOffset} from "./QueryRestriction";

export class QueryRestrictionParser {

    private constructor() {
    }

    public static parseToText(queryRestrictions: QueryRestriction[]): string {
        let restrictionQuery: string = queryRestrictions
            .sort((a: QueryRestriction, b: QueryRestriction) => {
                if (a instanceof QueryLimit) {
                    return -11;
                } else if (a instanceof QueryOffset) {
                    return 1;
                } else {
                    return -1;
                }
            })
            .map((restriction) => restriction.toDataBaseRestriction())
            .reduce((previousValue, currentValue) => previousValue.concat(currentValue).concat(" "), " ");

        return restrictionQuery;
    }
}