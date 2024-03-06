import {
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
    SchemaTypeProperty,
    schemaCorresponds
} from '../Chai.mjs'
import { decompileKeywords } from '../SchemaJS.ext.mjs'
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

    describe('schemaCorresponds() verifies schema', () => {
        let subject = {
            iRock: true,
            iam: 'machine',
            betterThan: 300
        }

        let target = new Schema({
            iRock: Schema.boolean, 
            iam: Schema.string, 
            betterThan: Schema.number
        })

        schemaCorresponds(subject, 'ego', target)

        subject = {
            queen: 'another one bites the dust',
            rocks: true,
            hits: 54
        }

        schemaCorresponds(subject, 'Queen', target, false)
    })

})