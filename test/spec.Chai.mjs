import {
    throwsAnError,
    did,
    does,
    have,
    has,
    is,
    matches,
    getCounter,
    expectToBeTrue,
    expectValuesToMatch,
    objectsAreEquivalent,
    expectObjectsAreEqual,
    expectToBeNull,
    throwsError,
    expectConstructorToThrowError,
    nullCheck,
    expectArrayToInclude,
    expectArraytoIncludeArrayContents,
    expectArraysToBeEqual,
} from '../Chai.mjs'
import { expect } from 'chai'

describe('Chai Tests', () => {
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

    describe('Description constants and functions', () => {
        describe('getCounter()', () => {
            expectValuesToMatch(getCounter(), 'Test 1 -')
        })

        describe('throwsAnError() for descriptions', () => {
            expectValuesToMatch(throwsAnError(), 'successfully threw an error:')
            expectValuesToMatch(throwsAnError(true), 'successfully threw an error:')
            expectValuesToMatch(throwsAnError(false), 'did NOT throw an error:')
        } )

        describe('Verbs', () => {
            expectValuesToMatch(did(true), 'did')
            expectValuesToMatch(did(true), 'did NOT', false)
            expectValuesToMatch(did(false), 'did', false)
            expectValuesToMatch(did(false), 'did NOT')
            expectValuesToMatch(have(true), 'have')
            expectValuesToMatch(have(true), 'NOT have', false)
            expectValuesToMatch(have(false), 'have', false)
            expectValuesToMatch(have(false), 'NOT have')
            expectValuesToMatch(has(true), 'has')
            expectValuesToMatch(has(false), 'does NOT have')
            expectValuesToMatch(is(true), 'is')
            expectValuesToMatch(is(true), 'is NOT', false)
            expectValuesToMatch(is(false), 'is', false)
            expectValuesToMatch(is(false), 'is NOT')
            expectValuesToMatch(does(true), 'does')
            expectValuesToMatch(does(false), 'does NOT')

        })
    })

    describe('Error Throws', () => {
        throwsError('Throw new error', () => {throw new Error('Test error')})
        throwsError('nullCheck()', nullCheck, null)
        throwsError('expectValuesToMatch()', expectValuesToMatch, ['array'], false)
        expectConstructorToThrowError('throws error', Math, 'asdfadf')
    })

    describe('Objects', () => {
        describe('expectObjectsAreEqual()', () => {
            expectObjectsAreEqual('obj1:', obj1, 'obj2:', obj2)
            expectObjectsAreEqual('obj1:', obj1, 'obj3:', obj3, false)
        })
    })


    describe('Arrays', () => {
        describe('Array Inclusion', () => {
            expectArrayToInclude(colors, 'green')
            expectArrayToInclude(colors, 'orange', true)
            expectArrayToInclude(colors, 'brown', false)
    
            expectArraytoIncludeArrayContents(colors, primary_colors)
            expectArraytoIncludeArrayContents(colors, secondary_colors, true)
            expectArraytoIncludeArrayContents(primary_colors, secondary_colors, false)
        })
    
        describe('Array Comparison', () => {
            expectArraysToBeEqual('colors', colors, 'the same array', colors)
            expectArraysToBeEqual('colors', colors, 'the same array', colors, true)
            expectArraysToBeEqual('colors', colors, 'the same array', primary_colors, false)
        })
    })
    

})




