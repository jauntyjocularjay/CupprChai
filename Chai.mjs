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

/*** @section Test functions ***/
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
            
            (isNull(value) && isNull(target[key])) ||

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
function objectsEqual(subject, target){
    if(subject !== 'object' || typeof target !== 'object'  ){
        throw InvalidInputError('Your subject, target, or both are not objects.')
    }

    const subjectKeys = Object.keys(subject)
    const targetKeys = Object.keys(target)

    if(!arraysAreEqual(subjectKeys,targetKeys)){
        return false
    }

    const subjectValues = Object.values(subject)
    const targetValues = Object.values(target)

    if(!arraysAreEqual(subjectValues,targetValues)){
        return false
    }

    return true
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

/** @todo tested by arraysMistmatchTests() */
function arraysMismatch(subject, target){
    return !Array.isArray(subject) ||
        !Array.isArray(target) ||
        !arraysAreEqual(subject, target)
}

/*** tested implicitly by arrayMatch() ***/
function arraysAreEqual(subjects, target){
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
    if(typeof subject !== 'string' || typeof target !== 'string') {throw new InvalidInputError('Your subject, target, or both are not strings.')}

    const description = `${getCounter()} string: ${subjectAlias} ${matches(bool)} string (case sensitive by default): ${targetAlias}`

    it(description, () => {

        const passes = stringsEqual(subject,target,caseSensitive)

        bool
            ? expect(passes).to.be.true
            : expect(passes).to.be.false
    })
}

/*** @todo debug ***/
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

/** @todo tested by mismatchTests() */
function stringsMismatch(subject, target, bool){
    return !typeof subject === 'string' ||
        !typeof target === 'string' ||
        !stringsEqual(subject, target, bool)
}

/*** tested implicitly by stringsMatch() ***/
// function stringsEqual(subject, target, caseSensitive=true){
//     let passes = true
//     if(!caseSensitive){
//         subject = subject.toLowerCase()
//         target = target.toLowerCase()
//     }

//     if(subject.length !== target.length){
//         passes = false
//     }

//     for(let i = 0; i < subject.length; i++){
//         if(subject.charAt(i) !== target.charAt(i)){
//             passes = false
//         }
//     }

//     return passes
// }

// function stringsEqual(subject, target, caseSensitive=true){
//     return true
// }

// function stringsEqual(subject, target, caseSensitive=true){
function stringsEqual(subject, target, caseSensitive=true){
    if(!caseSensitive){
        subject = subject.toLowerCase()
        target = target.toLowerCase()
    }

    return subject === target
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
    isTrue,
    valueMatch,
    objectsAreEquivalent,
    objectsAreEqual,
    isNull,
    throwsError,
    constructorThrowsError,
    nullCheck,
}