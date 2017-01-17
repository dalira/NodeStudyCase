import {
    StartsWith,
    EndsWith,
    Like,
    GreaterThan,
    GreaterOrEqual,
    LowerThan,
    LowerOrEqual,
    Equal
} from "../restriction/Restriction";

const RestQueryOperations = {
    "^": StartsWith,
    "$": EndsWith,
    "~": Like,
    ".gt": GreaterThan,
    ".ge": GreaterOrEqual,
    ".lt": LowerThan,
    ".le": LowerOrEqual,
    "": Equal,
};

export default RestQueryOperations;
