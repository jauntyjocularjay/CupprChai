import { expect } from 'chai'



/**
 * @description Description variables, constants and functions 
 */
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

function contains(bool=true){
    if(bool){
        return 'contains'
    } else {
        return 'does NOT contain'
    }
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

function recognizes(bool){
    bool
        ? 'recognizes'
        : 'does not recognize'
}

/** 
 * @section Test functions 
 */
/**
 * @section Value matching
 */
function expectValuesToMatch(subject, object=null, bool=true, description=null){
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

/**
 * @section Boolean
 */
function expectToBeTrue(subject, bool=true, description=null){
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


/**
 * @section Arrays
 */
function expectArrayToInclude(array, element, bool=true){
/**
 * @param {*} array1 
 * @param {*} array2 
 * @param {*} bool 
 * @returns 
 */
    const description = `${getCounter()} Array ${has(bool)} ${element} as an element:`
    
    it(description, () => {
        bool
            ? expect(array.includes(element)).to.be.true
            : expect(array.includes(element)).to.be.false
    })
}

function expectArraytoIncludeArrayContents(array1Alias, array1=[], array2Alias, array2=[], bool=true){
/**
 * @todo write tests
 * @param {*} array1 
 * @param {*} array2 
 * @param {*} bool 
 * @returns 
 */
    if(!Array.isArray(array1) || !Array.isArray(array2)){ throw new InvalidArrayError() }

    const description = ` ${array1Alias} ${contains(bool)} ALL of: ${array2Alias}`
    it(getCounter() + description, () => {

        let result = true

        array2.forEach(element => {
            result = array1.includes(element)
            if(result === false){
                return
            }
        })

        return result
    })
    
}

function expectArraysToBeEqual(subjectAlias, subject, targetAlias, target, bool=true){
/**
 * @abstract Array Equality analyzes each element and determines if they are all the same.
 */
    if(!Array.isArray(subject) || !Array.isArray(target)) { throw new InvalidArrayError() }

    const description = `${getCounter()} Array '${subjectAlias}' ${matches(bool)} '${targetAlias}'`

    it(description, () => {
        bool
            ? expect(arraysAreEqual(subject, target)).to.be.true
            : expect(arraysAreEqual(subject, target)).to.be.false
    })
}

/*** @tests exported to spec ***/
function arraysMismatchTests(){

    it(`${getCounter()} arraysMismatch recognizes mismatching non-array and array`, () => {
        expect(arraysMismatch([2, 3], 3)).to.be.true
    })

    it(`${getCounter()} arraysMismatch recognizes mismatching array and non-array`, () => {
        expect(arraysMismatch(2, [2,2])).to.be.true
    })

    it(`${getCounter()} arraysMismatch recognizes mismatching arrays`, () => {
        expect(arraysMismatch([2, 3], [2,2])).to.be.true
    })

    it(`${getCounter()} arraysMismatch recognizes matching arrays`, () => {
        expect(arraysMismatch([2, 2], [2,2])).to.be.false
    })


}

/*** @helper function ***/
function arraysMismatch(subject, target){
/*** @tested by arraysMistmatchTests() ***/
return !Array.isArray(subject) ||
        !Array.isArray(target) ||
        !arraysAreEqual(subject, target)
}

/*** @helper function ***/
function arraysAreEqual(subjects, target){
/*** @tested implicitly by arrayMatch() ***/
    let passes = true
    let s = 0

    subjects.forEach(subject => {
        if (subject === target[s]){
            s++
        } else {
            passes = false
        }
    })
    return passes
}

/** @todo test this */
function expectStringToInclude(subjectAlias=null, subject, targetAlias=null, target, bool=true){
    subject = subject.trim()
    target = target.trim()

    const description = `${getCounter()} '${subjectAlias!==null ? subjectAlias : subject}' contains '${targetAlias!==null ? targetAlias : target}'`
    it(description, () => {
        bool
            ? expect(subject.includes(target)).to.be.true
            : expect(subject.includes(target)).to.be.false
    })
}

/**
 * @section Strings
 */
function stringsMatch(subjectAlias, subject, targetAlias, target, caseSensitive=true, bool=true){
    if(typeof subject !== 'string' || typeof target !== 'string') {throw new InvalidInputError('stringsMatch', 'string', [{subjectAlias: subject}, {targetAlias: target}])} //`StringsMatch: your subject: ${subject}, target: ${target}, or both are not strings`)}

    const description = `${getCounter()} string: '${subjectAlias}' ${matches(bool)} string (case sensitive by default): '${targetAlias}'`

    it(description, () => {

        const passes = stringsEqual(subject,target,caseSensitive)

        bool
            ? expect(passes).to.be.true
            : expect(passes).to.be.false
    })
}

function stringsMismatchTests(){

    const alias = 'stringMismatch()'
    let that = 'that'

    it(`${getCounter()} ${alias} recognizes '${that}' ${does(false)} match 'those'`, () => {
        expect(stringsMismatch(that, 'those')).to.be.true
    })

    it(`${getCounter()} ${alias} recognizes '${that}' ${does(false)} match 'tHAs' when ${alias + is(true)} case-sensitive`, () => {
        expect(stringsMismatch(that, 'tHAs')).to.be.true
    })

    it(`${getCounter()} ${alias} recognizes '${that}' ${does(true)} match 'that'--`, () => {
        expect(stringsMismatch(that, 'that')).to.be.false
    })

    it(`${getCounter()} ${alias} recognizes '${that}' ${does(true)} match 'tHAt' when ${alias + is(false)} case-sensitive`, () => {
        expect(stringsMismatch(that, 'tHAt', false)).to.be.false
    })
}

function stringsMismatch(subject, target, bool){
/** 
 * @tested implicitly by arrayMatch()
 * @abstract mismatch functions return a boolean for logic use
 * @helper function
 */
    return !typeof subject === 'string' ||
        !typeof target === 'string' ||
        !stringsEqual(subject, target, bool)
}

function stringsEqual(subject, target, caseSensitive=true){
/*** @helper function ***/
/*** @tested implicitly by arrayMatch() ***/
    if(!caseSensitive){
        subject = subject.toLowerCase()
        target = target.toLowerCase()
    }

    return subject === target
}

/** @section Null */
function expectToBeNull(param, bool=true){
    const description = `${getCounter()} ${param} ${is(bool)} null`

    it(description, () => {
        bool
            ? expect(param).to.be.null
            : expect(param).to.not.be.null
    })
}

/** @section Objects */
function objectsAreEquivalent(subjectAlias, subject, targetAlias,  target){
    /** 
     * @abstract Equivalence
     * @todo define equivalence
     * @todo write tests
     * @todo Refactor objectsAreEquivalent
    */
    const description = `${getCounter()} '${subjectAlias}' matches '${targetAlias}' properties`

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

function expectObjectsAreEqual(subjectAlias, subject, targetAlias, target, bool=true){
/*** @todo write tests ***/
    const description = `${getCounter()} '${subjectAlias}' ${matches(bool)} '${targetAlias}'`

    it(description, () => {
        const result = objectsEqual(subject, target)

        bool
            ? expect(result).to.be.true
            : expect(result).to.be.false
    })
}
    
function expectObjectsMismatch(subjectAlias, subject, targetAlias, target, bool=true){
    const objectArray = [{}, {}]
    objectArray[subjectAlias] = subject
    objectArray[targetAlias] = target
    it(`${getCounter()} objectsMismatch ${recognizes(bool)} mismatching objects`, () => {
        if(typeof subject !== 'object' || typeof target !== 'object'){
            throw new InvalidInputError('expectObjectsMismatch', 'object', objectArray) //(subject, target, 'object')
        }
    })
}

function objectsMismatch(subject, target){
    /*** @tested implicitly by arrayMatch() ***/
    /**
     * @abstract this is a testing class that is used in if-else statements for flow control.
     * @tested implicitly by objectsAreEqual() 
     */
    return typeof subject === 'object' &&
            typeof target === 'object' &&
            !objectsEqual(subject, target)
}
    
function objectsEqual(subject, target){
    if(typeof subject !== 'object' || typeof target !== 'object'  ){
        return false
    }
    let result = true

    let i = 0
    const subjectEntries = Object.entries(subject)
    const targetEntries = Object.entries(target)

    subjectEntries.forEach(entry => {
        let j = 0
        entry.forEach(value => {
            if(value !== targetEntries[i][j]) {
                result = false
            }
            j++
        })
        i++
    })
    return result
}

/** @section Error Throws */
function throwsError(subjectAlias, subject, param=null, bool=true, error=Error){
/** 
 *  @debug If you run into problems with this, check the function you are 
 *      testing to see if you are handling the error you are expecting.
 */
    const description = `${getCounter()} '${subjectAlias}'(${param}) ${throwsAnError(bool)} ${error.name}`
    const fn = () => {
        subject(param)
    }

    it(description,() => {
        bool
            ? expect(fn).to.throw(error)
            : expect(fn).to.not.throw(error)
    })
}

function expectConstructorToThrowError(nameStr, className, param=null, bool=true, error=Error){
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

/** @section Errors specific to this library */
class InvalidInputError extends TypeError {
    constructor(methodAlias, type, subjectArray=[{subjectAlias: subject}, {targetAlias: target}]){
        let message = `${methodAlias}: your `

        subjectArray.forEach(obj => {
            for(const [key, value] of Object.entries(obj)){
                message += `${key}: ${typeof value} `
            }
        })

        message += `are not "${type}"`
        super('InvalidInputError: ' + message)
    }
}

class InvalidArrayError extends TypeError {
    constructor(){
        super('Your subject, target, or both are not arrays.')
    }
}


export {
    // for testing only
    arraysAreEqual,
    expectArraysToBeEqual as arraysMatch,
    arraysMismatchTests,
    // objectsMatch,
    stringsMatch,
    stringsMismatchTests,

    // for use
    throwsAnError,
    did,
    does,
    have,
    has,
    is,
    matches,
    getCounter,
    expectToBeTrue,
    expectValuesToMatch,
    expectArraysToBeEqual,
    expectArrayToInclude,
    expectArraytoIncludeArrayContents,
    objectsAreEquivalent,
    expectStringToInclude,
    expectObjectsAreEqual,
    expectToBeNull,
    throwsError,
    expectConstructorToThrowError,
    nullCheck,
}