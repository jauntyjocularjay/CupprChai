import {
    arraysMatch,
    objectsMatch,
    stringsMatch,
    arraysMismatchTests,
    stringsMismatchTests,

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
    nullCheck
} from '../Chai.mjs'


/**
 * @comment This import is needed for testing
 */
// import {expect} from 'chai'

describe('ChaiFunctions.mjs', () => {
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
        expectValuesToMatch(has(true), 'will have', false)
        expectValuesToMatch(has(false), 'does not have', false)
        expectValuesToMatch(is(true), 'is')
        expectValuesToMatch(is(true), 'is NOT', false)
        expectValuesToMatch(is(false), 'is', false)
        expectValuesToMatch(is(false), 'is NOT')
        expectValuesToMatch(does(true), 'does')
        expectValuesToMatch(does(false), 'does NOT')
    })

    describe('Throws Error works', () => {
        throwsError(() => {throw new Error('Test error')}, 'Throw new error')
        throwsError(nullCheck, 'nullCheck()')
        throwsError(expectValuesToMatch,'valueMatch()', ['array'], false)
    })

    describe('expectConstructorToThrowError() works', () => {
        expectConstructorToThrowError('Number constructor', Math, 'asdfadf')
    })

    describe('expectToBeTrue()', () => {
        expectToBeTrue(true)
        expectToBeTrue(false, false)
        expectToBeTrue(true, true)
        expectToBeTrue(false, false, 'This statement is a lie.')
        expectToBeTrue(true, true, 'This statement is true.')
        throwsError(expectToBeTrue, 'expectToBeTrue')
    })

    describe('ExpectToBeNull()', () => {
        expectToBeNull(null)
        expectToBeNull(null, true)
        expectToBeNull(true, false)
        expectToBeNull(undefined, false)
        expectToBeNull(false, false)
    })

    describe('helper functions for expectObjectsAreEqual()', () => {
        const arr1 = [1,2,3]
        const arr2 = [1,2,3]
        const arr3 = [5,4,8]

        arraysMatch(arr1, 'arr1', arr2, 'arr2')
        arraysMatch(arr1, 'arr1', arr2, 'arr2', true)
        arraysMatch(arr1, 'arr1', arr3, 'arr3', false)
        throwsError(arraysMatch, 'arraysMatch')

        const str1 = 'right'
        const str2 = 'right'
        const str3 = 'left'

        stringsMatch(str1, 'str1', str2, 'str2')
        stringsMatch(str1, 'str1', str2, 'str2', true)
        stringsMatch(str1, 'str1', str2, 'str2', false)
        throwsError(stringsMatch, 'stringsMatch')
        
        const obj1 = { sub: null }
        const obj2 = { sub: null }

        objectsMatch({ sub: null }, '{ sub: null }', { sub: null }, '{ sub: null }')
        objectsMatch(obj1, 'obj1', obj2, 'obj1')
        throwsError(objectsMatch, 'objectsMatch')

        const obj3 = {arr: [], str: '', bool: false}
        const obj4 = {arr: ['oscar'], str: 'wilde', bool: true}

        objectsMatch(obj3, 'obj3', obj3, 'obj3')
        objectsMatch(obj3, 'obj3', obj4, 'obj4', false)

        arraysMismatchTests()
        stringsMismatchTests()
    })

    describe('expectObjectsAreEqual()', () => {
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

    expectObjectsAreEqual(obj1, 'obj1', obj2, 'obj2')
    //     expectObjectsAreEqual(obj1, 'obj1', obj3, 'obj3', false)
    //     expectObjectsAreEqual(obj1, 'obj1', obj4, 'obj4', false)
    //     expectObjectsAreEqual(obj1, 'obj1', obj5, 'obj5', false)
    //     expectObjectsAreEqual(obj1, 'obj1', obj6, 'obj6', false)
    //     expectObjectsAreEqual(obj1, 'obj1', obj7, 'obj7', false)
    //     expectObjectsAreEqual(obj1, 'obj1', obj8, 'obj8', false)
    //     expectObjectsAreEqual(obj1, 'obj1', obj9, 'obj9', false)
    })
})

