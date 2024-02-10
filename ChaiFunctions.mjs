

import { expect } from 'chai'

let counter = 1

function valueMatch(subject, object, bool=true){
    it(`${getCounter()} ${subject} ${is(bool)} equivalent to ${object}`, () => {
        bool
            ? expect(subject).to.eql(object)
            : expect(subject).to.not.eql(object)
    })
    counter++
}

function have(bool){
    if(bool){
        return 'have'
    } else {
        return 'not have'
    }
}

function is(bool){
    if(bool){
        return 'is'
    } else {
        return 'is not'
    }
}

function getCounter(){
    return `Test ${counter}:`
}

function count(){
    counter++
}

export {
    count,
    valueMatch,
    getCounter,
    have,
    is
}