import { expect } from 'chai'



/*** @description Description variables, constants and functions ***/
let counter = 0

function throwsAnError(bool=true){
    if(bool){
        return 'successfully threw an error:' 
    } else{
        return 'did NOT throw an error:'
    }
}

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

/*** @description Test functions ***/
function isTrue(subject, bool=true, description=null){
    nullCheck(subject)
    description !== null
        ? description = `${getCounter()} ${description}`
        : description = `${getCounter()} ${subject} ${is(bool)} true`

    it(description, () => {
        bool
            ? expect(subject).to.be.true
            : expect(subject).to.be.false
    })
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

        it(description + throwsAnError, () => {
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
    const description = `${getCounter()} ${subjectAlias} ${matches(bool)} ${targetAlias}`

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
            
            (nullsMismatch(value, target[key])) ||

            (objectsMismatch(value, target[key])) ||

            (arraysMismatch(value, target[key])) ||

            (stringsMismatch(value, target[key])) ||


            (value !== target[key])) {

            return false
        }
    }

    return true
}

/** @todo tested implicitly by objectsAreEqual() */
function objectsMismatch(subject, target){
/**
 * @function
 *      This is a testing class that is used in if-else statements for flow control.
 * @param {object} subject 
 * @param {object} target 
 * @returns {boolean}
 */
    return typeof subject === 'object' &&
        typeof target === 'object' &&
        !objectsEqual(subject, target)
}

/** @todo tested implicitly by objectsAreEqual() */
function nullsMismatch(subject, target){
    return subject === null && target === null && !subject === target
}

/** @todo tested implicitly by objectsAreEqual() */
function arraysMismatch(subject, target){
    return typeof subject === 'array' &&
        typeof target === 'array' &&
        !arraysEqual(subject, target)
}

/** @todo tested implicitly by objectsAreEqual() */
function stringsMismatch(subject, target){
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

function isNull(param, bool=true){
    const description = `${getCounter()} ${param} ${is(bool)} null`

    it(description, () => {
        bool
            ? expect(param).to.be.null
            : expect(param).to.not.be.null
    })
}

function throwsError(subject, subjectAlias, param=null, bool=true, error=Error){
/** 
 *  @debug If you run into problems with this, check the function you are 
 *      testing to see if you are handling the error you are expecting.     */
    const description = `${getCounter()} ${subjectAlias}(${param}) ${throwsAnError(bool)} ${error.name}`
    const fn = () => {
        subject(param)
    }

    it(description,() => {
        bool
            ? expect(fn).to.throw(error)
            : expect(fn).to.not.throw(error)
    })
}

function constructorThrowsError(nameStr, className, param=null, bool=true, error=Error){
    const description = `${getCounter()} ${nameStr} constructor ${throwsAnError(bool)} ${error.name}`

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
    // for testing only
    arraysMatch,
    arraysEqual,
    arraysMismatch as mismatchingArrays,
    objectsMismatch as mismatchingObjects,
    stringsMismatch as mismatchingStrings,

    // for use
    throwsAnError,
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
    nullCheck,
}