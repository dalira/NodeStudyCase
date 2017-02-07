/**
 * Representa a impossibilidade de autenticar um usuário
 */
export class AuthenticationError extends Error {

    constructor(message: string) {
        super(message);
    }
}
