interface Meta {
    code: number,
    message: string
}

export interface GeneralResponse {
    meta: Meta;
    data?: any;
}