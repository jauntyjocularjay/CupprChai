

import { expect } from 'chai'

let counter = 1

export const threwError = ' threw an error'

export function valueMatch(bool=true, subject, object=null){
    try {
        const threwError = nullCheck(subject)
        const description = getCounter() + subject + matches(bool) + object
        it(description, () => {
            bool
                ? expect(subject).to.eql(object)
                : expect(subject).to.not.eql(object)
        })
    } catch(error) {
        const threwError = true
        const description = getCounter() + subject + matches(bool) + object
        it(description + threwError, () => {
            expect(true).to.eql(false)
        })
    } finally {
        count()
        return threwError
    }
}

export function throwsError(functionName, test, param=null, bool=true, error=Error){
    const description = getCounter() + functionName + did(bool) + 'throw ' + error.name
    const fn = () => {test(param)}

    it(description,() => {
        bool
            ? expect(fn).to.throw(error)
            : expect(fn).to.not.throw(error)
    })

    count()
}

export function did(bool=true){
    if(bool){
        return ' did '
    } else {
        return ' did NOT '
    }
}

export function have(bool){
    if(bool){
        return ' have '
    } else {
        return ' not have '
    }
}

export function is(bool){
    if(bool){
        return ' is '
    } else {
        return ' is not '
    }
}

export function matches(bool){
    if(bool){
        return ' matches '
    } else {
        return ' does not match '
    }

}

export function getCounter(){
    return `Test ${counter} - `
}

export function count(){
    counter++
}

export function nullCheck(value){
    if(value === null){
        throw new TypeError('nullCheck() failed, argument is null')
    } else {
        return false
    }
}