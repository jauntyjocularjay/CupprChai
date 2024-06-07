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

describe('Object Comparison', () => {
    it(`Objects are Equal`, () => {
        const obj1 = {
            alias: 'Johnny',
            int: 1,
            bol: true
        }

        const obj2 = {
            alias: 'Johnny',
            int: 1,
            bol: true
        }

        expectObjectsAreEqual(obj1, 'obj1', obj2, 'obj2')
    })
})


    

