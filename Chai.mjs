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

function recognizes(bool){
    bool
        ? 'recognizes'
        : 'does not recognize'
}

/*** @section Test functions ***/
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

/*** @todo write tests ***/
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

/*** @todo write tests ***/
function expectObjectsAreEqual(subject, subjectAlias, target, targetAlias, bool=true){
    const description = `${getCounter()} ${subjectAlias} ${matches(bool)} ${targetAlias}`

    it(description, () => {
        const result = objectsMatch(subject, target)

        bool
            ? expect(result).to.be.true
            : expect(result).to.be.false
    })
}

/*** @todo write tests ***/
function objectsMatch(subject, subjectAlias, target, targetAlias){
/*** @test implicitly by objectsAreEqual() ***/

    const objectArray = [{},{}]
    objectArray[0][subjectAlias] = subject
    objectArray[1][targetAlias] = target

    if(typeof subject !== 'object' || typeof target !== 'object'){
        console.log('typeof subject:', typeof subject, 'typeof target:', typeof target)
        throw new InvalidInputError('objectsMatch', 'object', objectArray)
    }

    let passes = true

    for(const [key, value] of Object.entries(subject)){
        if( (typeof value !== typeof target[key]) ||
            
            // (value === null && target[key] === null) ||

            (objectsMismatch(value, target[key])) ||

            (arraysMismatch(value, target[key])) ||

            (stringsMismatch(value, target[key])) ||

            (value !== target[key])) {

            passes = false
            return
        }
    }

    return passes
}

function objectsMismatch(subject, target){
/*** @tested implicitly by arrayMatch() ***/
/**
 * @function
 *      This is a testing class that is used in if-else statements for flow control.
 * @param {object} subject 
 * @param {object} target 
 * @returns {boolean}
 ***/
/*** @todo tested implicitly by objectsAreEqual() ***/
return typeof subject === 'object' &&
        typeof target === 'object' &&
        !objectsEqual(subject, target)
}

/*** @todo write tests ***/
function objectsEqual(subject, target){
/*** @test implicitly by objectsAreEqual() ***/
    if(subject !== 'object' || typeof target !== 'object'  ){
        return false
    }

    const subjectKeys = Object.keys(subject)
    const targetKeys = Object.keys(target)
    let passes = true

    if(!arraysAreEqual(subjectKeys,targetKeys)){
        passes = false
        return
    }

    const subjectValues = Object.values(subject)
    const targetValues = Object.values(target)

    if(!arraysAreEqual(subjectValues,targetValues)){
        passes = false
        return
    }

    return passes
}

function arraysMatch(subject, subjectAlias, target, targetAlias, bool=true){
    if(!Array.isArray(subject) || !Array.isArray(target)) { throw new InvalidArrayError('Your subject, target, or both are not arrays.')}

    const description = `${getCounter()} array ${subjectAlias} ${matches(bool)} ${targetAlias}`

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

function expectObjectsMismatch(subject, subjectAlias, target, targetAlias, bool=true){
    const objectArray = [{}, {}]
    objectArray[subjectAlias] = subject
    objectArray[targetAlias] = target
    it(`${getCounter()} objectsMismatch ${recognizes(bool)} mismatching objects`, () => {
        if(typeof subject !== 'object' || typeof target !== 'object'){
            throw new InvalidInputError('expectObjectsMismatch', 'object', objectArray) //(subject, target, 'object')
        }
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
            // return false
        }
    })
    return passes
    // return true
}

function stringsMatch(subject, subjectAlias, target, targetAlias, caseSensitive=true, bool=true){
    if(typeof subject !== 'string' || typeof target !== 'string') {throw new InvalidInputError('stringsMatch', 'string', [{subjectAlias: subject}, {targetAlias: target}])} //`StringsMatch: your subject: ${subject}, target: ${target}, or both are not strings`)}

    const description = `${getCounter()} string: ${subjectAlias} ${matches(bool)} string (case sensitive by default): ${targetAlias}`

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

/*** @helper function ***/
function stringsMismatch(subject, target, bool){
/*** @tested implicitly by arrayMatch() ***/
    return !typeof subject === 'string' ||
        !typeof target === 'string' ||
        !stringsEqual(subject, target, bool)
}

/*** @helper function ***/
function stringsEqual(subject, target, caseSensitive=true){
/*** @tested implicitly by arrayMatch() ***/
    if(!caseSensitive){
        subject = subject.toLowerCase()
        target = target.toLowerCase()
    }

    return subject === target
}

function expectToBeNull(param, bool=true){
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
 *      testing to see if you are handling the error you are expecting.     ***/
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

class InvalidInputError extends Error {
    constructor(methodAlias, type, subjectArray=[{subjectAlias: subject}, {targetAlias: target}]){
        let message = `${methodAlias}: your `

        for(const [key, value] of Object.entries(subjectArray)){
            message += `${key}: ${typeof value} `
        }

        message += `are not "${type}"`
        super('InvalidInputError: ' + message)
    }
}

export {
    // for testing only
    arraysAreEqual,
    arraysMatch,
    arraysMismatchTests,
    objectsMatch,
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
    objectsAreEquivalent,
    expectObjectsAreEqual,
    expectToBeNull,
    throwsError,
    expectConstructorToThrowError,
    nullCheck,
}