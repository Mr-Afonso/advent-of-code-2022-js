// const input = await Deno.readTextFile("./input.txt")
const input = await Deno.readTextFile("./test.txt")

const cleanInput = input.split('\n')

console.log(cleanInput)

// examples
// $ ls
// $ cd ..
// $ cd /
// $ cd szlbls 
// dir npmncvhh
// 81366 dwbgr.ztr

// template
let obj = {
  level: 0,
  name: '',
  files: [],
  dirs: [],
  sizeWithoutDirs: 0
}

let array = []
let level = -1
let names = ''
let files = []
let dirs = []

cleanInput.map((element) => {

  obj.level = level
  obj.name = names
  obj.files = files
  obj.dirs = dirs

  array.push(obj)

  if (element.includes('$ cd /')) {

  }

  if (element.includes('$ cd ..')) {
    level--
    names = ''
    files = []
    dirs = []
  }

  if (element.includes('$ ls')) {
    level++
  }

  if (element.includes('dir ')) {
    dirs.push(element)
  }

  if (element.includes('$ cd ') && !element.includes('$ cd ..') && !element.includes('$ cd /')) {
    console.log(element)
    names = element

  }

  if (/\d/.test(element)) {
    files.push(element)
  }

  // console.log(obj)

})

console.log(array)
