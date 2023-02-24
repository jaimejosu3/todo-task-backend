import { performBadRequestResponse, performNotFoundResponse, performSuccessResponse } from "../../src/utils/response.util"

let data = {field: "value"}
let message = "some message"

describe(`Should be generate response for cases`, () => {
    it(`Should perform success general response with data and message`, async () => {
        let generalResponse = performSuccessResponse(data,message)
        expect(generalResponse).toHaveProperty("meta")
        expect(generalResponse).toHaveProperty("data")
        expect(generalResponse.meta).toHaveProperty("code",200)
        expect(generalResponse.meta).toHaveProperty("message",message)
        expect(generalResponse.data).toHaveProperty("field",data.field)
    })

    it(`Should perform not found general response with message`, async () => {
        let generalResponse = performNotFoundResponse(message)
        expect(generalResponse).toHaveProperty("meta")
        expect(generalResponse.meta).toHaveProperty("code",404)
        expect(generalResponse.meta).toHaveProperty("message",message)
    })

    it(`Should perform not found general response with message`, async () => {
        let generalResponse = performBadRequestResponse(message)
        expect(generalResponse).toHaveProperty("meta")
        expect(generalResponse.meta).toHaveProperty("code",400)
        expect(generalResponse.meta).toHaveProperty("message",message)
    })
})