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
    nullCheck
} from './ChaiFunctions.mjs'
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

    valueMatch(SchemaType, obj, bool, description)

    // it(description, () => {
    //     bool
    //         ? expect(SchemaType).to.eql(obj)
    //         : expect(SchemaType).to.not.eql(obj)
    // })
    // count()
}

function SchemaTypeProperty(schema, type, bool=true){
    const description = getCounter() + schema.name + `Schema ${have(bool)} type: '${type}'`

    it(description, () => {
        bool
            ? expect(schema.type).to.eql(type)
            : expect(schema.type).to.not.eql(type)
    })
    count()
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

function schemaCorresponds(subject, alias, target, bool=true){
    const description = getCounter() + alias + does(bool) + `correspond to response`

    const correspondsTo = () => {
        it(description, () => {
            const ajv = new Ajv()
            let validate
            let valid

            compileKeywords(ajv, target)

            validate = ajv.compile(target)

            valid = validate(subject)

            bool
                ? expect(valid).to.be.true
                : expect(valid).to.be.false
            if (!valid) {console.log(validate.errors)}
        })
    }
    correspondsTo()
}

export {
    compileKeywords,
    SchemaTypeValue,
    SchemaTypeProperty,
    schemaCorresponds
}