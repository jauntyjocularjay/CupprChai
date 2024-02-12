

import { expect } from 'chai'

let counter = 1

export function valueMatch(subject, object, bool=true){
    it(`${getCounter()} ${subject} ${is(bool)} equivalent to ${object}`, () => {
        bool
            ? expect(subject).to.eql(object)
            : expect(subject).to.not.eql(object)
    })
    counter++
}

export function have(bool){
    if(bool){
        return 'have'
    } else {
        return 'not have'
    }
}

export function is(bool){
    if(bool){
        return 'is'
    } else {
        return 'is not'
    }
}

export function getCounter(){
    return `Test ${counter}:`
}

export function count(){
    counter++
}

export function nullCheck(value){
    if(value === null){
        throw new Error('nullCheck() failed')
    }
}