const input = await Deno.readTextFile("./input.txt")

let totalCalPerElf = 0
let calPerElf = []

input.split('\n').map((cal) => {
  if (cal != '') {
    totalCalPerElf = Number(totalCalPerElf) + Number(cal)
  } else {
    calPerElf.push(totalCalPerElf)
    totalCalPerElf = 0
  }
})

console.log(Math.max(...calPerElf))



