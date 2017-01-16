/**
 * Representa erros padrão de validação.
 */
export class ValidationError extends Error {

    constructor(message: string) {
        super(message);
    }
}
