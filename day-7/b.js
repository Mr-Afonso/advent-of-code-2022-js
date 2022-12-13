const input = await Deno.readTextFile("./input.txt")
// const input = await Deno.readTextFile("./test.txt")

const cleanInput = input.split('\n')

// console.log(cleanInput)

// directory 
class Directory {
  constructor() {
    this.name = ''
    this.files = []
    this.parent = ''
    this.level = []
    this.size = 0
    this.part = ''
  }
  addName(name) {
    this.name = name
  }
  addFiles(file) {
    this.files = file
  }
  addLevel(level) {
    this.level.push(level)
  }
  addParent(parent) {
    this.parent = parent
  }
  addSize(size) {
    this.size += size
  }
  addPart(part) {
    this.part = part
  }
}

let disc = []
let level = 0
let dirx = []
let size = 0
let filee = []
let part = 0

const builder = (command) => {

  if (command.includes('$ cd ') && !command.includes('$ cd ..')) {

    if (disc.length > 0) {
      disc[disc.length - 1].addFiles(filee)
      disc[disc.length - 1].addSize(size)

      size = 0
      filee = []
    }

    const dir = new Directory()
    dir.addName(command)
    dir.addLevel(level)

    dir.addParent(dirx[dirx.length - 1])
    dirx.push(command)
    dir.addPart(part)
    disc.push(dir)
    level++
  }

  if (command.replace(/[^0-9]/g, '') !== '') {
    size += Number(command.replace(/[^0-9]/g, ''))
    filee.push(command.split(' ')[1])
  }

  if (command.includes('$ cd ..')) {
    level--
    if (level === 1) {
      part++
    }
    dirx.pop()
  }

}

cleanInput.map((element) => {
  builder(element)
})

disc.map((element) => {


  if (disc.filter((el) => el.part === element.part && el.parent === element.name).length > 0) {

    element.addSize(disc.filter((el) => el.part === element.part && el.parent === element.name)[0].size)

  }


})

console.log('**********************')
console.log(disc)


let array = []

disc.map((element) => {

  if (element.size <= 100000) {
    array.push(element.size)
  }
})

console.log(array)
console.log(array.reduce((a, b) => a + b))