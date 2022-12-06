const inputA = await Deno.readTextFile("./input-a.txt")
// const inputA = await Deno.readTextFile("./test-a.txt")
const inputB = await Deno.readTextFile("./input-b.txt")
// const inputB = await Deno.readTextFile("./test-b.txt")

inputA.split('\n')
inputB.split('\n')

const convertInputAToArray = (input) => {
  let cleanArray = []

  input.map((value, index) => {

    for (let index = 0; index < value.length; index++) {
      const element = value[index]
      if (element.toUpperCase() != element.toLowerCase()) {
        cleanArray[index] = cleanArray[index] + element
      }
    }
  })

  return cleanArray.filter(n => n).map((element) => { return element.replace('undefined', '') })
}

const cleanInputB = (input) => {

  let cleanArray = []

  input.map((value) => {
    value.split(" ")
    cleanArray.push({
      move: value.split(" ")[1],
      start: value.split(" ")[3],
      end: value.split(" ")[5]
    })
  })

  return cleanArray
}

const moveStacks = (stacks, moves) => {
  let cleanArray = stacks

  moves.map((move) => {
    const stringToMove = cleanArray[Number(move.start) - 1].slice(0, Number(move.move))
    cleanArray[Number(move.start) - 1] = cleanArray[Number(move.start) - 1].replace(cleanArray[Number(move.start) - 1].slice(0, Number(move.move)), '')
    cleanArray[move.end - 1] = stringToMove + cleanArray[Number(move.end) - 1]
  })

  return cleanArray

}

const directions = cleanInputB(inputB.split('\n'))
const crates = convertInputAToArray(inputA.split('\n'))

console.log(moveStacks(crates, directions))