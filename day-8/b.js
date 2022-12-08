const input = await Deno.readTextFile("./input.txt")
// const input = await Deno.readTextFile("./test.txt")

// And lets bring the spaghetti. What a spaghetti master pice, but it is done...

const cleanInput = input.split('\n')

let matrix = []

for (let index = 0; index < cleanInput.length; index++) {
  const element = cleanInput[index];
  matrix[index] = []

  for (let z = 0; z < element.length; z++) {
    const elementz = element[z];
    matrix[index][z] = Number(elementz)
  }
}

let count = 0
let fakeCount = 0

const testVisi = (matrix, element, elementz, index, z) => {

  // up
  let ttt = []
  let up = 0

  for (let t = index - 1; t >= 0; t--) {
    ttt.push(matrix[t][z])
  }

  const loopp = ttt.map((e) => {
    return elementz > e
  })

  for (let index = 0; index < loopp.length; index++) {
    const element = loopp[index]
    if (loopp[0] === false) {
      up++
      break
    } else {
      if (element === true) {
        up++
      } else {
        up++
        break
      }
    }
  }

  // down
  let ggg = []
  let down = 0

  for (let t = index + 1; t <= matrix.length - 1; t++) {
    ggg.push(matrix[t][z])
  }

  const loop = ggg.map((e) => {
    return elementz > e
  })


  for (let index = 0; index < loop.length; index++) {
    const element = loop[index]
    if (loop[0] === false) {
      down++
      break
    } else {
      if (element === true) {
        down++
      } else {
        down++
        break
      }
    }
  }

  // left
  let yyy = []
  let left = 0

  for (let t = z + 1; t <= element.length - 1; t++) {
    yyy.push(matrix[index][t])
  }

  const looppp = yyy.map((e) => {
    return elementz > e
  })

  for (let index = 0; index < looppp.length; index++) {
    const element = looppp[index]
    if (looppp[0] === false) {
      left++
      break
    } else {
      if (element === true) {
        left++
      } else {
        left++
        break
      }
    }
  }

  // right

  let kkk = []
  let right = 0

  for (let t = z - 1; t >= 0; t--) {
    kkk.push(matrix[index][t])
  }

  const loopppp = kkk.map((e) => {
    return elementz > e
  })

  for (let index = 0; index < loopppp.length; index++) {
    const element = loopppp[index]
    if (loopppp[0] === false) {
      right++
      break
    } else {
      if (element === true) {
        right++
      } else {
        right++
        break
      }
    }
  }

  const result = up * down * left * right

  return result

}
for (let index = 0; index < matrix.length; index++) {
  const element = cleanInput[index];

  for (let z = 0; z < matrix.length; z++) {
    const elementz = element[z];

    if (index === 0 || z === 0 || index === matrix.length - 1 || z === matrix.length - 1
    ) {

    } else {

      const value = testVisi(matrix, element, elementz, index, z)

      if (count < value) {

        count = value

      }
    }

  }

}

console.log(count)