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

  let ttt = []
  // up
  for (let t = index - 1; t >= 0; t--) {
    ttt.push(matrix[t][z])
  }

  if (ttt.filter(u => u >= elementz).length === 0) {
    fakeCount++
  }

  // down
  let ggg = []

  for (let t = index + 1; t <= matrix.length - 1; t++) {
    ggg.push(matrix[t][z])
  }

  if (ggg.filter(u => u >= elementz).length === 0) {
    fakeCount++
  }

  // left
  let yyy = []

  for (let t = z + 1; t <= element.length - 1; t++) {
    yyy.push(matrix[index][t])
  }

  if (yyy.filter(u => u >= elementz).length === 0) {
    fakeCount++
  }

  // right
  let kkk = []

  for (let t = z - 1; t >= 0 - 1; t--) {
    kkk.push(matrix[index][t])
  }

  if (kkk.filter(u => u >= elementz).length === 0) {
    fakeCount++
  }

  const result = fakeCount > 0

  fakeCount = 0

  return result

}
for (let index = 0; index < matrix.length; index++) {
  const element = cleanInput[index];


  for (let z = 0; z < matrix.length; z++) {
    const elementz = element[z];

    if (index === 0 || z === 0 || index === matrix.length - 1 || z === matrix.length - 1
    ) {
      count++
    } else {

      if (testVisi(matrix, element, elementz, index, z)) {
        count++
      }
    }
  }
}

console.log(count)