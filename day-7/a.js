// const input = await Deno.readTextFile("./input.txt")
const input = await Deno.readTextFile("./test.txt")

const cleanInput = input.split('\n')

// console.log(cleanInput)

let allDir = []
let allFilesPerDir = []
let total = 0
let dir = ''
let cd = '$ cd /'
let colectDependent = ''

cleanInput.map((element, index) => {

  if (element.includes('$') && !element.includes('$ ls') && !element.includes('$ cd ..') && index !== 0) {
    allFilesPerDir.push({
      dir: cd.split(' ')[2],
      total: total,
      dependent: allDir.filter((e) => e !== cd.split(' ')[2])
    })
    dir = ''
    total = 0
    cd = element
    allDir = []
  }

  if (element.includes('dir')) {
    allDir.push(element.split(' ')[1])
  }

  if (element.replace(/[^0-9]/g, '') !== '') {
    total = total + Number(element.replace(/[^0-9]/g, ''))
  }

  if (index === cleanInput.length - 1) {
    allFilesPerDir.push({
      dir: cd.split(' ')[2],
      total: total,
      dependent: allDir.filter((e) => e !== cd.split(' ')[2])
    })
  }

})

// console.log(allFilesPerDir)


const findTotal = (dependent) => {
  return allFilesPerDir.filter(e => e.dir === dependent)[0].total
}

allFilesPerDir.map((element, index) => {

  if (index > 0) {
    if (element.dependent.length > 0) {
      //  find all dependents
      // array of all dependents

      element.total += element.dependent.map((el) => {
        return findTotal(el)
      }).reduce((a, b) => a + b)
    }
  }
})

// console.log(allFilesPerDir)

let totall = 0

allFilesPerDir.filter((e) => e.total < 100000).map((el) => {
  totall += el.total
})

console.log(totall)