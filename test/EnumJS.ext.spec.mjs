import { 
    expectValuesToMatch,
    expectConstructorToThrowError
} from '../Chai.mjs'
import {
    Enum,
    ExtEnum,
    InvalidArrayError
} from '../extensions/EnumJS/ENUM.mjs'

describe('Enum', () => {
    describe('Constructor', () => {
        const color = new Enum(['red','blue','green'])
        
        expectValuesToMatch(color.v(), 'RED')
        expectConstructorToThrowError('Enum constructor with array', Enum, ['red','blue'], false, InvalidArrayError)
        expectConstructorToThrowError('Enum constructor with object', Enum, {'key': 'value'}, InvalidArrayError)
        expectConstructorToThrowError('Enum constructor with string', Enum, 'string', InvalidArrayError)
    })
})
