import { expect } from 'chai'



/*** @description Description variables, constants and functions ***/
const throwError = 'throw an error:'

let counter = 0

function getCounter(){
    counter++
    return `Test ${counter} -`
}

function did(bool=true){
    if(bool){
        return 'did'
    } else {
        return 'did NOT'
    }
}

function does(bool=true){
    if(bool){
        return 'does'
    } else {
        return 'does NOT'
    }
}

function have(bool){
    if(bool){
        return 'have'
    } else {
        return  'NOT have'
    }
}

function has(bool){
    if(bool){
        return 'has'
    } else {
        return 'does NOT have'
    }
}

function is(bool){
    if(bool){
        return 'is'
    } else {
        return 'is NOT'
    }
}

function matches(bool){
    if(bool){
        return 'matches'
    } else {
        return 'does not match'
    }

}

/**
 * @description Test functions
 */
/** @todo write tests */
function isTrue(subject, bool=true, description=null){
    try {
        nullCheck(subject)
        description !== null
            ? description = `${getCounter()} ${description}`
            : description = `${getCounter()} ${subject} ${is(bool)} true`

        it(description, () => {
            bool
                ? expect(subject).to.be.true
                : expect(subject).to.be.false
        })
    } catch (error) {
        description = `${getCounter()} ${subject} ${is(bool)} true`
        it(description + throwError, () => {
            expect(true).to.eql(false)
        })
    }
}

function valueMatch(subject, object=null, bool=true, description=null){
    try {
        nullCheck(subject)

        description !== null
            ? description = `${getCounter()} ${description}`
            : description = `${getCounter()} '${subject}' ${matches(bool)} '${object}'`

            it(description, () => {
            bool
                ? expect(subject).to.eql(object)
                : expect(subject).to.not.eql(object)
        })
    } catch(error) {
        const description = `${getCounter()} '${subject}' ${matches(bool)} '${object}'`

        it(description + throwError, () => {
            expect(true).to.eql(false)
        })

    }
}

/** @todo write tests */
function objectsAreEquivalent(subject, subjectAlias, target, targetAlias){
    const description = `${getCounter()} ${subjectAlias} matches ${targetAlias} properties`

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
}

/** @todo write tests */
function objectsAreEqual(subject, subjectAlias, target, targetAlias, bool=true){
    const description = `${getCounter} ${subjectAlias} ${matches(bool)} ${targetAlias}`

    it(description, () => {
        const result = objectsMatch(subject, target)

        bool
            ? expect(result).to.be.true
            : expect(result).to.be.false
    })
}

/** @todo tested implicitly by objectsAreEqual() */
function objectsMatch(subject, target){
    for(const [key, value] of Object.entries(subject)){
        if( (typeof value !== typeof target[key]) ||
            
            (mismatchingNulls(value, target[key])) ||

            (mismatchingObjects(value, target[key])) ||

            (mismatchingArrays(value, target[key])) ||

            (mismatchingStrings(value, target[key])) ||


            (value !== target[key])) {

            return false
        }
    }

    return true
}

/** @todo tested implicitly by objectsAreEqual() */
function mismatchingNulls(subject, target){
    return subject === null && target === null && !subject === target
}

/** @todo tested implicitly by objectsAreEqual() */
function mismatchingObjects(subject, target){
    return typeof subject === 'object' &&
        typeof target === 'object' &&
        !objectsEqual(value, target)
}

/** @todo tested implicitly by objectsAreEqual() */
function mismatchingArrays(subject, target){
    return typeof subject === 'array' &&
        typeof target === 'array' &&
        !arraysEqual(subject, target)
}

/** @todo tested implicitly by objectsAreEqual() */
function mismatchingStrings(subject, target){
    return typeof subject === 'string' &&
        typeof target === 'string' &&
        !stringsEqual(subject, target)
}

/** @todo tested implicitly by objectsAreEqual() */
function objectsEqual(subject, target){
    if(subject !== 'object' || typeof target !== 'object'  ){
        throw InvalidInputError('Your subject, target, or both are not objects.')
    }

    const subjectKeys = Object.keys(subject)
    const targetKeys = Object.keys(target)

    if(!arraysEqual(subjectKeys,targetKeys)){
        return false
    }

    const subjectValues = Object.values(subject)
    const targetValues = Object.values(target)

    if(!arraysEqual(subjectValues,targetValues)){
        return false
    }

    return true
}

/** @todo write tests */
function arraysMatch(subject, subjectAlias, target, targetAlias, bool){
    const description = `${getCounter()} array ${subjectAlias} ${matches(bool)} ${targetAlias}`

    it(description, () => {

        if(!Array.isArray(subject) || !Array.isArray(target)) { throw new InvalidArrayError('Your subject, target, or both are not arrays.')}

        let passes = arraysEqual(subject, target)

        bool
            ? expect(passes).to.be.true
            : expect(passes).to.be.false
    })
}

/** @todo tested implicitly by arrayMatch() */
function arraysEqual(subject, target){
    let i = 0

    subject.forEach(element, i => {
        if (element === target[i]){
            i++
        } else {
            return false
        }
    })
    return true
}

/** @todo write tests */
function stringsMatch(subject, subjectAlias, target, targetAlias, caseSensitive=true, bool=true){
    const description = `${getCounter()} string: ${subjectAlias} ${matches(bool)} string (case sensitive by default): ${targetAlias}`

    it(description, () => {
        if(typeof subject !== 'string' || typeof target !== 'string') {throw new InvalidInputError('Your subject, target, or both are not strings.')}

        const passes = stringsEqual(subject,target,caseSensitive)

        bool
            ? expect(passes).to.be.true
            : expect(passes).to.be.false
    })
}

/** @todo tested implicitly by stringsMatch() */
function stringsEqual(subject, target, caseSensitive=true){
    let passes = true
    if(!caseSensitive){
        subject = subject.toLowerCase()
        target = target.toLowerCase()
    }

    if(subject.length !== target.length){
        return false
    }

    for(let i = 0 ; i < subject.length ; i++){
        if(subject.charAt(i) != target.charAt(i)){
            return false
        }
    }

    return true
}

/** @todo write tests */
function isNull(param, bool){
    const description = `${getCounter()} ${param} ${is(bool)} null`

    it(description, () => {
        bool
            ? expect(param).to.be.null
            : expect(param).to.not.be.null
    })
}

function throwsError(functionAlias, test, param=null, bool=true, error=Error){
    const description = `${getCounter()} ${functionAlias} ${did(bool)} ${throwError} ${error.name}`
    const fn = () => {
        test(param)
    }

    it(description,() => {
        bool
            ? expect(fn).to.throw(error)
            : expect(fn).to.not.throw(error)
    })
}

function constructorThrowsError(nameStr, className, param=null, bool=true, error=Error){
    const description = `${getCounter()} ${nameStr} constructor ${did(bool)} ${throwError} ${error.name}`

    const instance = () => {
        new className(param)
    }
    
    it(description, () => {
        bool
            ? expect(instance).to.throw(error)
            : expect(instance).to.not.throw(error)
    })
}

function nullCheck(value){
    if(value === null){
        throw new TypeError('nullCheck() failed, argument is null')
    } else {
        return false
    }
}

export {
    throwError,
    did,
    does,
    have,
    has,
    is,
    matches,
    getCounter,
    isTrue,
    valueMatch,
    arraysMatch,
    objectsAreEquivalent,
    objectsAreEqual,
    objectsMatch,
    stringsMatch,
    isNull,
    throwsError,
    constructorThrowsError,
    nullCheck
}