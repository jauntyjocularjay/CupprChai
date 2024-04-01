import {
    throwError,
    did,
    does,
    have,
    has,
    is,
    matches,
    getCounter,
    isTrue,
    valueMatch,
    arraysMatch,
    objectsAreEquivalent,
    objectsAreEqual,
    objectsMatch,
    stringsMatch,
    isNull,
    throwsError,
    constructorThrowsError,
    nullCheck
} from '../Chai.mjs'


/**
 * @comment This import is needed for testing
 */
// import {expect} from 'chai'

describe('ChaiFunctions.mjs', () => {
    describe('Description constants and functions', () => {
        valueMatch(throwError, 'throw an error:')
        valueMatch(getCounter(), 'Test 2 -')
        valueMatch(getCounter(), 'Test 4 -')
        valueMatch(getCounter(), 'Test 6 -')
        valueMatch(did(true), 'did')
        valueMatch(did(true), 'did NOT', false)
        valueMatch(did(false), 'did', false)
        valueMatch(did(false), 'did NOT')
        valueMatch(have(true), 'have')
        valueMatch(have(true), 'NOT have', false)
        valueMatch(have(false), 'have', false)
        valueMatch(have(false), 'NOT have')
        valueMatch(has(true), 'has')
        valueMatch(has(false), 'does NOT have')
        valueMatch(has(true), 'will have', false)
        valueMatch(has(false), 'does not have', false)
        valueMatch(is(true), 'is')
        valueMatch(is(true), 'is NOT', false)
        valueMatch(is(false), 'is', false)
        valueMatch(is(false), 'is NOT')
        valueMatch(does(true), 'does')
        valueMatch(does(false), 'does NOT')
    })
    describe('object comparison', () => {
        objectsMatch({foo: 'bar'}, '{foo: "bar"}', {foo: 'bar'}, '{foo: "bar"}')
    })
    describe('Throws Error works', () => {
        throwsError('Throw new error', () => {throw new Error('Test error')})
        throwsError('nullCheck()', nullCheck, null)
        throwsError('valueMatch()', valueMatch, ['array'], false)
    })

    describe('constructorThrowsError() works', () => {
        constructorThrowsError('Number constructor', Math, 'asdfadf')
    })
})

