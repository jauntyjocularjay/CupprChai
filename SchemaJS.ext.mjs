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
    nullCheck
} from './Chai.mjs'
import { expect } from 'chai'
import Ajv from 'ajv'




/**
 * Schema testing functions
 * @todo write tests for these functions
*/
function SchemaTypeValue(SchemaType, obj, bool=true){
    let result = {
        key: Object.keys(obj)[0],
        value: Object.values(obj)[0]
    }
    const description = getCounter() + `SchemaType ${is(bool)} {${result.key}: '${result.value}'}`

    valueMatch(SchemaType.valueOf(), obj, bool, description)
}

function SchemaTypeProperty(schema, alias, target, bool=true){
    const description = getCounter() + alias + ` Schema ${has(bool)} {type: '${target.type}'}`

    valueMatch(schema.type, target.valueOf().type, bool, description)
}

/**
 * Schema & AJV testing functions
 * @todo write tests for these functions
*/

function compileKeywords(ajv, schema){
    const schemaKeywords = new Set(schema.keywords())

    schemaKeywords.forEach(term => {
        ajv.addKeyword(term)
    })
}

function decompileKeywords(ajv, schema){
    const schemaKeywords = new Set(schema.keywords())

    schemaKeywords.forEach(term => {
        ajv.removeKeyword(term)
    })
}

function schemaCorresponds(subject, alias, target, bool=true){
    const description = getCounter() + alias + does(bool) + `correspond to response`

    const correspondsTo = () => {
        it(description, () => {
            const ajv = new Ajv()
            let validate
            let valid

            decompileKeywords(ajv, target)
            compileKeywords(ajv, target)

            validate = ajv.compile(target)

            valid = validate(subject)

            bool
                ? expect(valid).to.be.true
                : expect(valid).to.be.false
            
            if (!valid && bool) {console.log(validate.errors)}

            decompileKeywords(ajv, target)
        })
        count()
    }
    correspondsTo()
}

export {
    compileKeywords,
    decompileKeywords,
    SchemaTypeValue,
    SchemaTypeProperty,
    schemaCorresponds
}