import {
    threwError as throwError,
    did,
    does,
    have,
    is,
    matches,
    getCounter,
    count,
    valueMatch,
    objectsMatch,
    throwsError,
    nullCheck,
    constructorThrowsError
} from '../Chai.mjs'


/**
 * @comment This import is needed for testing
 */
// import {expect} from 'chai'

describe('ChaiFunctions.mjs', () => {
    describe('Description constants and functions', () => {
        valueMatch(throwError, 'throw an error:')
        valueMatch(getCounter(), 'Test 2 -')
        valueMatch(getCounter(), 'Test 3 -')
        count()
        valueMatch(getCounter(), 'Test 5 -')
        valueMatch(did(true), 'did')
        valueMatch(did(true), 'did NOT', false)
        valueMatch(did(false), 'did', false)
        valueMatch(did(false), 'did NOT')
        valueMatch(have(true), 'have')
        valueMatch(have(true), 'NOT have', false)
        valueMatch(have(false), 'have', false)
        valueMatch(have(false), 'NOT have')
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

