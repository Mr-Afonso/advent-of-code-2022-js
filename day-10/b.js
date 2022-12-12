// const input = await Deno.readTextFile("./input.txt")
const input = await Deno.readTextFile("./test.txt")

const cleanInput = input.split('\r\n')

// console.log(cleanInput)

let cycles = 0

// passing by reference
// let matrix = Array(6).fill(Array(40).fill('.'))

// pass by value
let matrix = Array(6).fill(null).map(() => Array(40).fill('.'))

let spritePosition = 1
let level = 0
let cyclePerLevel = 0

const addSignalStrength = (cycle, moveSprint, value, element) => {
// console.log(value)
    // if((spritePosition + value) >= 0 && (spritePosition + value) < 40) {
        if(cycle % 40 === 0 && cycle > 0) {
            level++
            spritePosition = 1
            cyclePerLevel = 0 
        //   console.log('*********', level)
        //   console.log('cycle', cycle)
        //   console.log('value', value)
        //   console.log('element', element)
        }
        
        if(
            cyclePerLevel === spritePosition ||
            cyclePerLevel === spritePosition +1||
            cyclePerLevel === spritePosition -1
        ) {
           // console.log('*********', spritePosition)
            matrix[level][cyclePerLevel] = '#'
        } 

        
        if(moveSprint) {
            spritePosition = spritePosition + value
        //    console.log(spritePosition)
        //    console.log('cycle', cycle)
        }

        cyclePerLevel++
    // }

}

cleanInput.map((element) => {

    // console.log('element', element)

    if(element === 'noop') {
        addSignalStrength(cycles, false, 0, element)
        cycles++
    } else {

        addSignalStrength(cycles, false, 0, element)
        cycles++

        if(element.split(' ')[1].includes('-')) {

            addSignalStrength(cycles, true, -Number(element.split(' ')[1].split('-')[1]), element)
            cycles++

        } else {

            addSignalStrength(cycles, true, Number(element.split(' ')[1]), element)
            cycles++
        }

    }
    
    })

// console.log(matrix)
// console.table(matrix)

// await Deno.writeTextFile("./hello.txt", matrix)

matrix.map((e)=> {
    const string = e.join()
    console.log(string.replaceAll(',', ''))
})


