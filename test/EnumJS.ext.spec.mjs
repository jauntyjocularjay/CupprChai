import { 
    valueMatch,
    constructorThrowsError
} from '../Chai.mjs'
import {
    Enum,
    ExtEnum,
    InvalidArrayError
} from '../extensions/SchemaJS/ENUMJS/ENUM.mjs'

describe('Enum', () => {
    describe('Constructor', () => {
        const color = new Enum(['red','blue','green'])
        
        valueMatch(color.v(), 'RED')
        constructorThrowsError('Enum constructor with array', Enum, ['red','blue'], false, InvalidArrayError)
        constructorThrowsError('Enum constructor with object', Enum, {'key': 'value'}, InvalidArrayError)
        constructorThrowsError('Enum constructor with string', Enum, 'string', InvalidArrayError)
    })
})
