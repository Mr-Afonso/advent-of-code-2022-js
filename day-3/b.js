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
  let increaser = 0

  rucksacks.forEach((sack, index) => {

    if (rucksacks.length > (index + increaser)) {
      const firstSack = rucksacks[index + increaser]
      increaser++
      const secondSack = rucksacks[index + increaser]
      increaser++
      const thirdSack = rucksacks[index + increaser]

      let common = ''
      let prio = 0

      if (firstSack) {
        for (let char of firstSack) {
          if (secondSack.includes(char) && thirdSack.includes(char)) {
            common = char
          }
        }
      }

      if (abcCapsLock.indexOf(common) !== -1) {
        prio = abcCapsLock.indexOf(common) + 27
      } else {
        prio = abcLowerCase.indexOf(common) + 1
      }


      if (index <= index + increaser) {
        cleanSack.push({
          first: firstSack,
          second: secondSack,
          third: thirdSack,
          commonLetter: common,
          priority: prio
        })
      }
    }

  })
  return cleanSack
}

// sum of the priorities
const sumPriorities = (rucksacks) => {
  return rucksacks.reduce((a, { priority }) => a + priority, 0)
}

console.log(sumPriorities(cleanOldSack(input.split('\n'))))

