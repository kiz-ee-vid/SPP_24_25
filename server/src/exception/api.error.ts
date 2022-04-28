enum ApiErrors {
    BAD_REQUEST_DEFAULT_MESSAGE = 'Bad request',
    UNAUTHORIZED_DEFAULT_MESSAGE = 'Unauthorized access',
    NOT_FOUND_DEFAULT_MESSAGE = 'Resource not found',
    BAD_INTERNAL_DEFAULT_MESSAGE = 'Internal server error',
    FORBIDDEN_DEFAULT_MESSAGE = 'Access forbidden',
    CONFLICT_DEFAULT_MESSAGE = 'Conflict with server state'
}

export interface SyntaxErrors {
    [key: string]: string
}

export default class ApiError extends Error {
    public readonly code: string;
    public readonly message: string;
    public readonly extensions: SyntaxErrors;

    constructor(status: string, msg: string, errors: SyntaxErrors = {}) {
        super(msg);
        this.code = status
        this.message = msg
        this.extensions = errors
    }

    // 4**
    static BadRequest(message: string = ApiErrors.BAD_REQUEST_DEFAULT_MESSAGE, errors: SyntaxErrors = {}) {
        return new ApiError("400", message, errors)
    }

    static Unauthorized(message: string = ApiErrors.UNAUTHORIZED_DEFAULT_MESSAGE) {
        return new ApiError("401", message)
    }

    static Forbidden(message: string = ApiErrors.FORBIDDEN_DEFAULT_MESSAGE) {
        return new ApiError("403", message)
    }

    static NotFound(message: string = ApiErrors.NOT_FOUND_DEFAULT_MESSAGE) {
        return new ApiError("404", message)
    }

    static Conflict(message: string = ApiErrors.CONFLICT_DEFAULT_MESSAGE) {
        return new ApiError("409", message)
    }

    // 5**
    static Internal(message: string = ApiErrors.BAD_INTERNAL_DEFAULT_MESSAGE) {
        return new ApiError("500", message)
    }

}
