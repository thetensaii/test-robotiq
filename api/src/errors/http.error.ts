import { StatusCodes } from 'http-status-codes';

// Allow to specify which Http Code we want for the Error
export class HttpError extends Error {
	private _httpCode: StatusCodes;

	constructor(httpCode: StatusCodes, message: string) {
		super(message);
		this._httpCode = httpCode;
	}

	get httpCode(): StatusCodes {
		return this._httpCode;
	}
}
