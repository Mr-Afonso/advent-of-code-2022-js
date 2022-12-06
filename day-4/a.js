const input = await Deno.readTextFile("./input.txt")

let count = 0
const cleanInput = input.split('\n').map((e) => {
  return e.split(/,|-/)
})

cleanInput.map((space) => {
  if (Number(space[2]) >= Number(space[0]) && Number(space[3]) <= Number(space[1])) {
    count++
  }

  if ((Number(space[0]) > Number(space[2]) && Number(space[1]) < Number(space[3])) ||
    (Number(space[0]) >= Number(space[2]) && Number(space[1]) < Number(space[3])) ||
    (Number(space[0]) > Number(space[2]) && Number(space[1]) <= Number(space[3]))) {
    count++
  }

})

console.log(count)