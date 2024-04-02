import {
    throwsAnError,
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
        valueMatch(getCounter(), 'Test 1 -')
        valueMatch(throwsAnError(), 'successfully threw an error:')
        valueMatch(throwsAnError(true), 'successfully threw an error:')
        valueMatch(throwsAnError(false), 'did NOT throw an error:')
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
        throwsError(() => {throw new Error('Test error')}, 'Throw new error')
        throwsError(nullCheck, 'nullCheck()')
        throwsError(valueMatch,'valueMatch()', ['array'], false)
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
        throwsError(isTrue, 'isTrue')
    })

    describe('isNull()', () => {
        isNull(null)
        isNull(null, true)
        isNull(true, false)
        isNull(undefined, false)
        isNull(false, false)
    })

    describe('helper functions for objectsAreEqual()', () => {
        obj1 = { sub: null }
        obj2 = { sub: null }

        mismatch
    })

    // describe('objectsAreEqual()', () => {
    //     const obj1 = {
    //         arr : ['a',2,null],
    //         num : 2.21,
    //         str : 'Stephen King',
    //         bool: true,
    //         obj : {
    //             arr: [],
    //             num: 0,
    //             str: ''
    //         } 
    //     }

    //     const obj2 = {
    //         arr : ['a',2,null],
    //         num : 2.21,
    //         str : 'Stephen King',
    //         bool: true,
    //         obj : {
    //             arr: [],
    //             num: 0,
    //             str: ''
    //         } 
    //     }

    //     const obj3 = {
    //         arr : ['a',3,null],
    //         num : 2.21,
    //         str : 'Stephen King',
    //         bool: true,
    //         obj : {
    //             arr: [],
    //             num: 0,
    //             str: ''
    //         } 
    //     }

    //     const obj4 = {
    //         arr : ['a',2,null],
    //         num : 2.2,
    //         str : 'Stephen King',
    //         bool: true,
    //         obj : {
    //             arr: [],
    //             num: 0,
    //             str: ''
    //         } 
    //     }

    //     const obj5 = {
    //         arr : ['a',2,null],
    //         num : 2.21,
    //         str : 'stephen king',
    //         bool: true,
    //         obj : {
    //             arr: [],
    //             num: 0,
    //             str: ''
    //         } 
    //     }

    //     const obj6 = {
    //         arr : ['a',2,null],
    //         num : 2.21,
    //         str : 'Stephen King',
    //         bool: false,
    //         obj : {
    //             arr: [],
    //             num: 0,
    //             str: ''
    //         } 
    //     }

    //     const obj7 = {
    //         arr : ['a',2,null],
    //         num : 2.21,
    //         str : 'Stephen King',
    //         bool: true,
    //         obj : {
    //             arr: [0],
    //             num: 0,
    //             str: ''
    //         } 
    //     }

    //     const obj8 = {
    //         arr : ['a',2,null],
    //         num : 2.21,
    //         str : 'Stephen King',
    //         bool: true,
    //         obj : {
    //             arr: [],
    //             num: 2,
    //             str: ''
    //         } 
    //     }

    //     const obj9 = {
    //         arr : ['a',2,null],
    //         num : 2.21,
    //         str : 'Stephen King',
    //         bool: true,
    //         obj : {
    //             arr: [],
    //             num: 0,
    //             str: 's'
    //         } 
    //     }

    //     objectsAreEqual(obj1, 'obj1', obj2, 'obj2')
    //     objectsAreEqual(obj1, 'obj1', obj3, 'obj3', false)
    //     objectsAreEqual(obj1, 'obj1', obj4, 'obj4', false)
    //     objectsAreEqual(obj1, 'obj1', obj5, 'obj5', false)
    //     objectsAreEqual(obj1, 'obj1', obj6, 'obj6', false)
    //     objectsAreEqual(obj1, 'obj1', obj7, 'obj7', false)
    //     objectsAreEqual(obj1, 'obj1', obj8, 'obj8', false)
    //     objectsAreEqual(obj1, 'obj1', obj9, 'obj9', false)
    // })
})

