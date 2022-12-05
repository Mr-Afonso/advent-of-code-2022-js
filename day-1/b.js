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

const topCalPerElf = (top) => {
  let sumCal = 0

  calPerElf.sort((a, b) => a - b).reverse().map((cal, index) => {

    if (top > index) {
      sumCal = sumCal + cal
    }

  })

  return sumCal

}



console.log(topCalPerElf(3))