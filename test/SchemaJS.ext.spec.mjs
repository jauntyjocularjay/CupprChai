import {
    threwError,
    did,
    does,
    have,
    has,
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
import { ArraySchema, Schema } from '../extensions/SchemaJS/Schema.mjs'

describe('Schema Extension', () => {
    describe('SchemaTypeValue()', () => {
        const boolean = Schema.boolean
        let target = {type:'boolean'}
        SchemaTypeValue(boolean, target)
        target = {type:'object'}
        SchemaTypeValue(boolean, target, false)
    })

    describe('SchemaTypeProperty()', () => {
        let target = Schema.object
        let schema = new Schema()
        SchemaTypeProperty(schema, 'generic', target)
        schema.type = 'array'
        SchemaTypeProperty(schema, 'array', target, false)
    })
})