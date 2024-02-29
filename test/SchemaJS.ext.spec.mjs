import {
    threwError,
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
    SchemaTypeValue,
    SchemaTypeProperty
} from '../ChaiFunctions.mjs'
import { Schema } from '../extensions/SchemaJS/Schema.mjs'

describe('Schema Extension', () => {
    describe('SchemaTypeValue()', () => {
        const boolean = Schema.boolean
        let target = {type:'boolean'}
        SchemaTypeValue(boolean, target)
        target = {type:'object'}
        SchemaTypeValue(boolean, target, false)
    })

    describe('SchemaTypeProperty()', () => {
        let target = 'object'
        const schema = new Schema()
        SchemaTypeProperty(schema, target)
        schema.type = 'array'
        SchemaTypeProperty(schema, target, false)
    })
})