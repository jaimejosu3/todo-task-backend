import { GeneralResponse } from "../models/general.model";

export const performSuccessResponse = (data: any, customMessage: string) : GeneralResponse => {
    let generalResponse: GeneralResponse = {
        meta: {
            code: 200,
            message: customMessage,
        },
        data
    };
    return generalResponse;
}

export const performNotFoundResponse = (customMessage: string) : GeneralResponse => {
    let generalResponse: GeneralResponse = {
        meta: {
            code: 404,
            message: customMessage,
        }
    };
    return generalResponse;
}

export const performBadRequestResponse = (customMessage: string) : GeneralResponse => {
    let generalResponse: GeneralResponse = {
        meta: {
            code: 400,
            message: customMessage,
        }
    };
    return generalResponse;
}