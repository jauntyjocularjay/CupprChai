import { expect } from 'chai'

/**
 * @description Description variables, constants and functions
 */
const threwError = ' threw an error'

let counter = 1

function getCounter(){
    return `Test ${counter} - `
}

function count(){
    counter++
    return getCounter()
}

function did(bool=true){
    if(bool){
        return ' did '
    } else {
        return ' did NOT '
    }
}

function does(bool=true){
    if(bool){
        return ' does '
    } else {
        return ' does NOT '
    }
}

function have(bool){
    if(bool){
        return ' have '
    } else {
        return ' NOT have '
    }
}

function is(bool){
    if(bool){
        return ' is '
    } else {
        return ' is NOT '
    }
}

function matches(bool){
    if(bool){
        return ' matches '
    } else {
        return ' does not match '
    }

}

/**
 * @description Test functions
 */
function valueMatch(subject, object=null, bool=true){
    try {
        nullCheck(subject)
        const description = getCounter() + `'${subject}'` + matches(bool) + `'${object}'`
        it(description, () => {
            bool
                ? expect(subject).to.eql(object)
                : expect(subject).to.not.eql(object)
        })
    } catch(error) {
        const description = getCounter() + `'${subject}'` + matches(bool) + `'${object}'`
        it(description + threwError, () => {
            expect(true).to.eql(false)
        })
    } finally {
        count()
    }
}

function objectsMatch(subject, target){
    const description = getCounter() + `${subject} matches ${target} properties`

    it(description,() => {
        const subjectKeys = Object.keys(subject)
        const targetKeys = Object.keys(target)
        const subjectValues = Object.values(subject)
        const targetValues = Object.values(target)

        expect(subjectKeys.length).to.eql(targetKeys.length)
        expect(subjectValues.length).to.eql(subjectValues.length)

        let i = 0
        subjectValues.forEach(subjectValue => {
            expect(targetValues[i]).to.eql(subjectValue)
            i++
        })
    })

    count()
}

function isNull(param,bool){
    const description = `${getCounter()} ${param} ${is(bool)} null`

    bool
        ? expect(param).to.be.null
        : expect(param).to.not.be.null
}

function throwsError(functionName, test, param=null, bool=true, error=Error){
    const description = getCounter() + functionName + did(bool) + 'throw ' + error.name
    const fn = () => {
        test(param)
    }

    it(description,() => {
        bool
            ? expect(fn).to.throw(error)
            : expect(fn).to.not.throw(error)
    })

    count()
}

function nullCheck(value){
    if(value === null){
        throw new TypeError('nullCheck() failed, argument is null')
    } else {
        return false
    }
}

export {
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
}