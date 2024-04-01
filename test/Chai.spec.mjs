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
        throwsError('nullCheck()', nullCheck)
        throwsError('valueMatch()', valueMatch, ['array'], false)
    })
    describe('constructorThrowsError() works', () => {
        constructorThrowsError('Number constructor', Math, 'asdfadf')
    })

    describe('isTrue()', () => {
        isTrue(true)
        isTrue(false, false)
        isTrue(true, true)
        isTrue(false, false, 'This statement is a lie.')
        isTrue(true, true, 'This statement is true.')
        // not throwing error as expected with null parameter
        throwsError('isTrue', isTrue, null)
    })

    describe('isNull()', () => {
        // null is not evaluated to null???
        isNull(null)

        // These tests are behaving normally
        isNull(true, false)
        isNull(undefined, false)
        isNull(false, false)
    })

    describe('objectsAreEqual()', () => {
        const obj1 = {
            arr : ['a',2,null],
            num : 2.21,
            str : 'Stephen King',
            bool: true,
            obj : {
                arr: [],
                num: 0,
                str: ''
            } 
        }

        const obj2 = {
            arr : ['a',2,null],
            num : 2.21,
            str : 'Stephen King',
            bool: true,
            obj : {
                arr: [],
                num: 0,
                str: ''
            } 
        }

        const obj3 = {
            arr : ['a',3,null],
            num : 2.21,
            str : 'Stephen King',
            bool: true,
            obj : {
                arr: [],
                num: 0,
                str: ''
            } 
        }

        const obj4 = {
            arr : ['a',2,null],
            num : 2.2,
            str : 'Stephen King',
            bool: true,
            obj : {
                arr: [],
                num: 0,
                str: ''
            } 
        }

        const obj5 = {
            arr : ['a',2,null],
            num : 2.21,
            str : 'stephen king',
            bool: true,
            obj : {
                arr: [],
                num: 0,
                str: ''
            } 
        }

        const obj6 = {
            arr : ['a',2,null],
            num : 2.21,
            str : 'Stephen King',
            bool: false,
            obj : {
                arr: [],
                num: 0,
                str: ''
            } 
        }

        const obj7 = {
            arr : ['a',2,null],
            num : 2.21,
            str : 'Stephen King',
            bool: true,
            obj : {
                arr: [0],
                num: 0,
                str: ''
            } 
        }

        const obj8 = {
            arr : ['a',2,null],
            num : 2.21,
            str : 'Stephen King',
            bool: true,
            obj : {
                arr: [],
                num: 2,
                str: ''
            } 
        }

        const obj9 = {
            arr : ['a',2,null],
            num : 2.21,
            str : 'Stephen King',
            bool: true,
            obj : {
                arr: [],
                num: 0,
                str: 's'
            } 
        }

        objectsAreEqual(obj1, 'obj1', obj2, 'obj2')
        objectsAreEqual(obj1, 'obj1', obj3, 'obj3', false)
        objectsAreEqual(obj1, 'obj1', obj4, 'obj4', false)
        objectsAreEqual(obj1, 'obj1', obj5, 'obj5', false)
        objectsAreEqual(obj1, 'obj1', obj6, 'obj6', false)
        objectsAreEqual(obj1, 'obj1', obj7, 'obj7', false)
        objectsAreEqual(obj1, 'obj1', obj8, 'obj8', false)
        objectsAreEqual(obj1, 'obj1', obj9, 'obj9', false)
    })
})

