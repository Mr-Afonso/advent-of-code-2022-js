const input = await Deno.readTextFile("./input.txt")
// const input = await Deno.readTextFile("./test.txt")

const cleanInput = input.split('\r\n')

// console.log(cleanInput)

let level = 0
let finalArray = []
let total = 0
let file = []
let memLevel = 0
let section = 0

cleanInput.map((element, index) => {


  if (element.replace(/[^0-9]/g, '') !== '') {
    total = total + Number(element.replace(/[^0-9]/g, ''))
 }

    if (element.includes('$') && !element.includes('$ ls') && !element.includes('$ cd ..') && index !== 0) {

      
      if(level + memLevel === 1) {
        section++
      }

      finalArray.push({
        level: level + memLevel,
        total: total,
        section: section
      })
      level ++
      total = 0
      memLevel = 0
  }

  if (element.includes('$ cd ..')) {
    memLevel++
    level--
      }

        if (index === cleanInput.length - 1) {

          if(level + memLevel === 1) {
            section++
          }

          finalArray.push({
            level: level,
            total: total,
            section: section
          })
        }
})

finalArray.shift()

// bug
finalArray[0].section = 2
console.log(finalArray)
console.log(finalArray.filter(e=>e.total< 100000 && e.total > 0))






// let tttttt = 0
// finalArrayr.filter(e=> e < 100000 && e>0).map((el) => {
//   console.log(el)
//   tttttt = tttttt + el
// })

// console.log(tttttt)













// let allDir = []
// let allFilesPerDir = []
// let total = 0
// let dir = ''
// let cd = '$ cd /'
// let colectDependent = ''

// cleanInput.map((element, index) => {

//   if (element.includes('$') && !element.includes('$ ls') && !element.includes('$ cd ..') && index !== 0) {
//     allFilesPerDir.push({
//       dir: cd.split(' ')[2],
//       total: total,
//       dependent: allDir.filter((e) => e !== cd.split(' ')[2])
//     })
//     dir = ''
//     total = 0
//     cd = element
//     allDir = []
//   }

//   if (element.includes('dir')) {
//     allDir.push(element.split(' ')[1])
//   }

//   if (element.replace(/[^0-9]/g, '') !== '') {
//     total = total + Number(element.replace(/[^0-9]/g, ''))
//   }

//   if (index === cleanInput.length - 1) {
//     allFilesPerDir.push({
//       dir: cd.split(' ')[2],
//       total: total,
//       dependent: allDir.filter((e) => e !== cd.split(' ')[2])
//     })
//   }

// })

// // console.log(allFilesPerDir)


// const findTotal = (dependent) => {

//   return allFilesPerDir.filter(e => e.dir === dependent)[0].total
// }

// // xxx
// const findAllDepend = (array) => {

//   let allDep = [] 

//   let dep = array

//   dep.map((el) => {
//     allDep.push(el)

//   })

//   return allDep
// }

// allFilesPerDir.map((element, index) => {

//   if (index > 0) {
//     if (element.dependent.length > 0) {

//       element.total += findAllDepend(element.dependent).map((el) => {
//         return findTotal(el)
//       }).reduce((a, b) => a + b)

//     }
//   }
// })


// let totall = 0

// allFilesPerDir.shift()

// allFilesPerDir.filter((e) => e.total < 100000).map((el, index) => {
//     totall += el.total
// })

// console.log(allFilesPerDir)
// console.log(totall)

// console.log('===')

// console.log('&&&&', allFilesPerDir.filter((el) => el.total === 0))