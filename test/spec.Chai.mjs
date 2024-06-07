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
} from '../Chai.mjs'
import { expect } from 'chai'

describe('ChaiFunctions.mjs', () => {
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

    describe('Description constants and functions', () => {
        expectValuesToMatch(getCounter(), 'Test 1 -')
        expectValuesToMatch(throwsAnError(), 'successfully threw an error:')
        expectValuesToMatch(throwsAnError(true), 'successfully threw an error:')
        expectValuesToMatch(throwsAnError(false), 'did NOT throw an error:')
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
    describe('object comparison', () => {
        expectObjectsAreEqual('obj1:', obj1, 'obj2:', obj2)
        expectObjectsAreEqual('obj1:', obj1, 'obj3:', obj3, false)
    })
    describe('Throws Error works', () => {
        throwsError('Throw new error', () => {throw new Error('Test error')})
        throwsError('nullCheck()', nullCheck, null)
        throwsError('expectValuesToMatch()', expectValuesToMatch, ['array'], false)
    })
    describe('constructorThrowsError() works', () => {
        expectConstructorToThrowError('Number constructor', Math, 'asdfadf')
    })

})




