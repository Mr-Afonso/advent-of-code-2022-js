const input = await Deno.readTextFile("./input.txt")
// const input = await Deno.readTextFile("./test.txt")

const cleanInput = input.split('\r\n')

// console.log(cleanInput)

class Folder {
  constructor() {
    this.name = ''
    this.father = ''
    this.totalSize = 0
    this.dependency = []
    this.dependencyFile = []
  }

  createFolderName(name) {
    this.name = name
  }

  createFolderFather(name) {
    this.father = name
  }

  calculateTotalSize(size) {
    this.totalSize += size
  }

  addDependencyFile(file) {
    this.dependencyFile.push(file)
  }


  addDependency(dependency) {
    this.dependency.push(dependency)
  }


}

let files = []
let inside = false

cleanInput.map((element) => {

  if (element.includes('$ cd ') && !element.includes('$ cd ..')) {
    let file = new Folder()
    file.name = element.split(' ')[2]

    files.push(
      file
    )
  }

  if (index === cleanInput.length - 1) {

    if (level + memLevel === 1) {
      section++
    }

    finalArray.push({
      level: level,
      total: total,
      section: section
    })
  }
})

let fileName = ''

cleanInput.map((element) => {

  if (element.includes('$ cd ') && !element.includes('$ cd ..') && files.some((e) => {
    fileName = e.name
    return `$ cd ${e.name}` === element
  })) {
    inside = true
  }

  if (inside) {

    if (element.includes('dir')) {

      files.filter((e) => e.name === element.split(' ')[1])[0].createFolderFather(fileName)

      files.filter((e) => e.name === fileName)[0].addDependency({
        father: fileName,
        son: element.split(' ')[1]
      })
    }

    if (element.replace(/[^0-9]/g, '') !== '') {
      files.filter((e) => e.name === fileName)[0].calculateTotalSize(Number(element.replace(/[^0-9]/g, '')))
    }
  }
})

// add all dependencies
files.map((element) => {

  if (element.dependency.length > 0) {

    element.dependency.map((e) => {
      element.addDependencyFile(
        files.filter((file) => file.name === e.son && element.name === e.father)[0]
      )
    })

  }
})

// bring the recursive
const addDependencies = (array) => {

  array.map((file) => {

    // if (array.some(e => e.dependency.includes(file.name))) {
    //   array.filter(e => e.dependency.includes(file.name))[0].calculateTotalSize(file.totalSize)
    // }

    if (array.some(e => e.dependency.some(el => el.father === 'a' && el.son === file.name))) {

      array.filter(e => e.dependency.some(el => el.father === 'a' && el.son === file.name))[0].calculateTotalSize(file.totalSize)
    }

    // console.log('in', file.name)
    // console.log('in', file.totalSize)
    if (file.dependency.length > 0) {
      return null
    } else {
      // console.log('up', file.name)
      // console.log('up', file.totalSize)
      addDependencies(file.dependency)
      // console.log('down', file.name)
      // console.log('down', file)
    }

  })

}

addDependencies(files)

// All folders under or equal to 10000
let array = []

files.filter(e => e.name !== '/').map((element) => {

  if (element.totalSize < 100000) {
    array.push(element.totalSize)
  }
})

// console.log(files.filter(e => e.name !== '/'))
// await Deno.writeTextFile('./xxx.txt', files)
// console.log(array)
// console.log(array.reduce((a, b) => a + b))

files.map((e) => {
  console.log(e.name)
  console.log(e.dependency)
})
