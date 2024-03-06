import { 
    valueMatch,
    constructorThrowsError
} from '../Chai.mjs'
import {
    Enum,
    ExtEnum
} from '../extensions/SchemaJS/ENUMJS/ENUM.mjs'

describe('Enum', () => {
    describe('Constructor', () => {
        const color = new Enum(['red','blue','green'])
        
        valueMatch(color.v(), 'RED')
        constructorThrowsError('Enum constructor', Enum, ['red','blue'], false)
        constructorThrowsError('Enum constructor', Enum, {'key': 'value'})
    })
})
