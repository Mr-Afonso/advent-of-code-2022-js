const input = await Deno.readTextFile("./input.txt")
// const input = await Deno.readTextFile("./test.txt")

const cleanInput = input.split('\r\n')

// console.log(cleanInput)

// noop - 1 cycle
// addx V - 2 cycles

let cycles = 0
let value = 1
let values = []

const addSignalStrength = (cycle, currentValue) => {

    if(cycle === 20) {
        values.push(currentValue * 20)
    }

    if(cycle === 60) {
        values.push(currentValue * 60)
    }

    if(cycle === 100) {
        values.push(currentValue * 100)
    }

    if(cycle === 140) {
        values.push(currentValue * 140)
    }

    if(cycle === 180) {
        values.push(currentValue * 180)
    }

    if(cycle === 220) {
        values.push(currentValue * 220)
    }
}

cleanInput.map((element) => {

if(element === 'noop') {
    cycles++
    addSignalStrength(cycles, value)
} else {

    cycles++
    addSignalStrength(cycles, value)
    cycles++
    addSignalStrength(cycles, value)
    if(element.split(' ')[1].includes('-')) {
        value = value - Number(element.split(' ')[1].split('-')[1])
    } else {
        value = value + Number(element.split(' ')[1])
    }

}

})

console.log('values', values)
console.log('total', values.reduce((a,b) => a+b))