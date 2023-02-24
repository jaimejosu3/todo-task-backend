import { isInt } from "../../src/utils/common.util"

describe(`Should be pass common function cases`, () => {
    it(`funcion isInt should be return true if pass number as string`, async () => {        
        expect(isInt("200")).toBe(true)
    })

    it(`funcion isInt should be return false if pass text`, async () => {        
        expect(isInt("sometext")).toBe(false)
    })

    it(`funcion isInt should be return false if pass boolean`, async () => {        
        expect(isInt(false)).toBe(false)
    })

    it(`funcion isInt should be return false if pass float`, async () => {        
        expect(isInt("1.2")).toBe(false)
    })

    it(`funcion isInt should be return false if pass malformed number`, async () => {        
        expect(isInt("01.15.25")).toBe(false)
    })

    it(`funcion isInt should be return true if pass number`, async () => {        
        expect(isInt(10)).toBe(true)
    })
})