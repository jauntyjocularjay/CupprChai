import {
    throwsAnError,
    did,
    does,
    have,
    has,
    is,
    matches,
    getCounter,
    expects,
    expectToBeTrue,
    expectValuesToMatch,
    objectsAreEquivalent,
    expectObjectsAreEqual,
    expectToBeNull,
    ExpectToThrowError,
    expectConstructorToThrowError,
    nullCheck,
    expectArrayToInclude,
    expectArraytoIncludeArrayContents,
    expectArraysToBeEqual,
    InvalidInputError,
    InvalidArrayError,
    NullCheckError,
} from '../Chai.mjs'
import { expect } from 'chai'

class FailingClass {
    constructor(param) {
        if (param === null) {
            throw new NullCheckError('Null parameter')
        }

        if (typeof param === 'string'){
            throw new InvalidInputError('FailingClass.constructor("string")', 'string', ['string'])
        }
    }
}

describe('Chai.mjs', () => {
    const obj1 = {
        string: 'str',
        boolean: true,
        integer: 1
    }
    const obj2 = {
        string: 'str',
        boolean: true,
        integer: 1
    }
    const obj3 = {
        string: 'string',
        boolean: 'true',
        integer: 1.0
    }
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet']
    const primary_colors = ['red', 'yellow', 'blue']
    const secondary_colors = ['orange', 'green', 'violet']

    describe('Constructor', () => {
        describe('To throw error', () => {
            expects.constructor.toThrow('throws error', true, NullCheckError, FailingClass, null)
            expects.constructor.toThrow('throws error', true, InvalidInputError, FailingClass, 'string')
        })
    })

    describe('Functions', () => {
        describe('to throw Error', () => {        
            expects.function.toThrow('Throw new error', () => { throw new Error('Test error') })
            expects.function.toThrow('expectValuesToMatch()', expectValuesToMatch(['array'], ['array']), false)
        })    
    })

    describe('Objects', () => {
        describe('expectObjectsAreEqual()', () => {
            expectObjectsAreEqual('obj1:', obj1, 'obj2:', obj2)
            expectObjectsAreEqual('obj1:', obj1, 'obj3:', obj3, false)
        })
    })

    describe('Arrays', () => {
        describe('Array Inclusion', () => {
            expects.array.toInclude(colors, 'green')
            expects.array.toInclude(colors, 'orange', true)
            expects.array.toInclude(colors, 'brown', false)
        })
    
        describe('Array Comparison', () => {
            expects.array.toEqual('colors', colors, 'the same array', colors)
            expects.array.toEqual('colors', colors, 'the same array', colors, true)
            expects.array.toEqual('colors', colors, 'the same array', primary_colors, false)
        })
    })
    

    describe('Legacy', () => {
        describe('Functions', () => {
            describe('to throw Error', () => {        
                ExpectToThrowError('Throw new error', () => {throw new Error('Test error')})
                ExpectToThrowError('nullCheck()', nullCheck, null)
                ExpectToThrowError('expectValuesToMatch()', expectValuesToMatch, ['array'], false)
            })
        })

        describe('Arrays', () => {
            describe('To include', () => {
                expectArrayToInclude(colors, 'green')
                expectArrayToInclude(colors, 'orange', true)
                expectArrayToInclude(colors, 'brown', false)
            })
    
            describe('Array Comparison', () => {
                expectArraysToBeEqual('colors', colors, 'the same array', colors)
                expectArraysToBeEqual('colors', colors, 'the same array', colors, true)
                expectArraysToBeEqual('colors', colors, 'the same array', primary_colors, false)
            })
        })
    })
})




