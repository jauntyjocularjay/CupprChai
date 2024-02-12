import { 
    nullCheck,
    throwsError
} from '../ChaiFunctions.mjs'

import {expect} from 'chai'

describe('ChaiFunctions', () => {
    describe('Threw Error works', () => {
        throwsError('nullCheck', nullCheck, null)
    })
})

