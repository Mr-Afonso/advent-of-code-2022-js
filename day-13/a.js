const input = await Deno.readTextFile("./input.txt")
// const input = await Deno.readTextFile("./test.txt")

const cleanInput = input.split('\n')

//console.log(cleanInput)

let arrayOne = []
let arrayTwo = []

cleanInput.map((element, index) => {
  if (cleanInput[index + 1] !== '' && cleanInput[index + 1] !== undefined && element !== '') {
    arrayOne.push(JSON.parse(element.replace(/'/g, '"')))
  } else {
    if (element !== '') {
      arrayTwo.push(JSON.parse(element.replace(/'/g, '"')))
    }
  }
})

let count = []

// If both values are integers, the lower integer should come first. If the left integer is lower than the right integer, the inputs are in the right order. If the left integer is higher than the right integer, the inputs are not in the right order. Otherwise, the inputs are the same integer; continue checking the next part of the input.
// If both values are lists, compare the first value of each list, then the second value, and so on. If the left list runs out of items first, the inputs are in the right order. If the right list runs out of items first, the inputs are not in the right order. If the lists are the same length and no comparison makes a decision about the order, continue checking the next part of the input.
// If exactly one value is an integer, convert the integer to a list which contains that integer as its only value, then retry the comparison. For example, if comparing [0,0,0] and 2, convert the right value to [2] (a list containing 2); the result is then found by instead comparing [0,0,0] and [2].

// recursive
const checker = (arrayY, arrayZ) => {

  // console.log(arrayY)
  // console.log(arrayZ)

  if (arrayY.length > 0) {

    for (let index = 0; index < arrayY.length; index++) {
      const element = arrayY[index]
      const secondArray = arrayZ[index] !== undefined ? arrayZ[index] : []
      // console.log(element)
      // console.log('second', secondArray)

      if (typeof element === 'object') {
        // console.log(element)
        // console.log(element[0])
        // console.log('second', secondArray)

        if (element.length === 1) {
          if (typeof secondArray === 'object') {
            if (secondArray.length === 0) {
              return false
            } else {
              if (element[0] === secondArray[0]) {
                continue
              } else {
                return element[0] < secondArray[0]
              }

            }
          } else {
            return element[0] < secondArray
          }
        } else {
          // console.log(element)
          // console.log(secondArray)

          if (element.length === 0) {

            return true


          } else {
            if (typeof secondArray === 'object') {
              if (secondArray.length === 0) {
                return false
              } else {
                if (element[0] === secondArray[0]) {

                  // console.log(element)
                  // console.log(secondArray)

                  element.shift()
                  typeof secondArray === 'object' ? secondArray.shift() : secondArray
                  checker(element, secondArray)
                } else {
                  return element[0] < secondArray[0]
                }
              }
            } else {
              if (element[0] === secondArray) {
                continue
              } else {
                return element[0] < secondArray
              }
            }
          }
        }

        if (element.length === 1 && secondArray.length === 1) {
          if (element[0] === secondArray[0]) {
            continue
          } else {
            return element[0] < secondArray[0]
          }

        } else {
          element.shift()
          typeof secondArray === 'object' ? secondArray.shift() : secondArray
        }

        // // ...
        // element.shift()
        // typeof secondArray === 'object' ? secondArray.shift() : secondArray


        checker(element, secondArray)
      } else {
        // console.log(element)
        // console.log('second', secondArray)

        if (typeof secondArray === 'object') {
          if (secondArray[0] === undefined) {
            return false
          } else {
            return element < secondArray[0]
          }
        } else {
          if (element === secondArray) {
            // console.log('yessssssssssss')
            // console.log('test')
            // console.log(index)
            // console.log(arrayY.length)
            // // console.log(element)
            // // console.log(secondArray)
            // console.log('end')
            if (index === arrayY.length - 1) {
              if (arrayY.length < arrayZ.length) {
                return true
              } else {
                return false
              }
            } else {
              continue
            }
          } else {
            // console.log('element', element)
            // console.log('secondArray', secondArray)
            return element < secondArray
          }
        }

      }
    }

  } else {
    return true
  }

}


arrayOne.map((element, index) => {
  let elementTwo = arrayTwo[index]
  // checker(element, elementTwo)
  // console.log('********* next ***********')
  if (checker(element, elementTwo)) {
    count.push(index + 1)
    // console.log('true')
  } else {
    // console.log('false')
  }

})

// console.log('count', count)
console.log('sum', count.reduce((a, b) => a + b))