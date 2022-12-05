const input = await Deno.readTextFile("./input.txt")

/* Keywords */
// first compartment
// second compartment
// rucksacks
// common item
// Lowercase priorities a - z 1 - 26
// Uppercase priorities A - Z 27 - 52
// sum of the priorities

const abcCapsLock = "abcdefghijklmnopqrstuvwxyz".toUpperCase()
const abcLowerCase = "abcdefghijklmnopqrstuvwxyz"

const cleanOldSack = (rucksacks) => {
  let cleanSack = []

  rucksacks.map((sack) => {

    const half = Math.floor(sack.length / 2)
    const firstHalf = sack.slice(0, half)
    const secondHalf = sack.slice(half, sack.length)
    let common = ''
    let prio = 0
    for (let char of firstHalf) {
      if (secondHalf.includes(char)) {
        common = char
      }
    }

    if (abcCapsLock.indexOf(common) !== -1) {
      prio = abcCapsLock.indexOf(common) + 27
    } else {
      prio = abcLowerCase.indexOf(common) + 1
    }

    cleanSack.push({
      first: firstHalf,
      second: secondHalf,
      commonLetter: common,
      priority: prio
    })

  })
  return cleanSack
}

// sum of the priorities
const sumPriorities = (rucksacks) => {
  return rucksacks.reduce((a, { priority }) => a + priority, 0)
}

console.log(sumPriorities(cleanOldSack(input.split('\n'))))

