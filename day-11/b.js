const input = await Deno.readTextFile("./input.txt")
// const input = await Deno.readTextFile("./test.txt")

const cleanInput = input.split('\n')

// console.log(cleanInput)

class Monkey {
  constructor(items, operatorChar, operator, divider, nextMonkeyTrue, nextMonkeyFalse) {
    this.items = items
    this.operatorChar = operatorChar
    this.operator = operator
    this.divider = divider
    this.nextMonkeyTrue = nextMonkeyTrue
    this.nextMonkeyFalse = nextMonkeyFalse

    this.itemsBeforeThrow = []
    this.nextMonkey = []

    this.inspectedItems = 0
  }

  addItem(item) {
    this.items.push(item)
  }

  removeItems() {
    this.items = []
  }

  cleanNextMonkey() {
    this.itemsBeforeThrow = []
    this.nextMonkey = []
  }

  operation() {
    this.items.map((item) => {
      let operatorValue = 0
      if (this.operator === 0) {
        operatorValue = Number(item)
      } else {
        operatorValue = this.operator
      }

      if (this.operatorChar === '*') {
        this.itemsBeforeThrow.push(Number(item) * operatorValue)
      } else {
        this.itemsBeforeThrow.push(Number(item) + operatorValue)
      }
    })

  }

  throw(divider) {
    if (this.items.length > 0) {
      this.operation()

      this.itemsBeforeThrow.map((item) => {
        this.inspectedItems++
        const worryLevel = item % divider
        if (worryLevel % this.divider === 0) {
          this.nextMonkey.push({
            monkey: this.nextMonkeyTrue,
            worryLevel: worryLevel
          })
        } else {
          this.nextMonkey.push({
            monkey: this.nextMonkeyFalse,
            worryLevel: worryLevel
          })
        }
      })

    }
  }

}

let monkeys = []

cleanInput.map((_, index) => {
  if (index % 7 === 0) {
    const items = cleanInput[index + 1].replaceAll(',', ' ').split(' ').filter(n => n.replace(/[^0-9]/g, '') > 0)
    const operatorChar = cleanInput[index + 2].split(' ')[cleanInput[index + 2].split(' ').length - 2]
    const operator = Number(cleanInput[index + 2].replace(/[^0-9]/g, ''))
    const divider = Number(cleanInput[index + 3].replace(/[^0-9]/g, ''))
    const nextMonkeyTrue = Number(cleanInput[index + 4].replace(/[^0-9]/g, ''))
    const nextMonkeyFalse = Number(cleanInput[index + 5].replace(/[^0-9]/g, ''))

    monkeys.push(new Monkey(items, operatorChar, operator, divider, nextMonkeyTrue, nextMonkeyFalse))
  }
})

// Part II big "thing"
const divider = monkeys.map((m) => m.divider).reduce((a, b) => a * b, 1)

for (let index = 0; index < 10000; index++) {
  for (let z = 0; z < monkeys.length; z++) {

    if (monkeys[z].items.length > 0) {
      monkeys[z].throw(divider)
      monkeys[z].nextMonkey.map((element) => {
        monkeys[element.monkey].addItem(element.worryLevel)
      })
      monkeys[z].removeItems()
      monkeys[z].cleanNextMonkey()
    }
  }
}


let inspectedItems = []

monkeys.map((monkey) => {
  inspectedItems.push(monkey.inspectedItems)
})

console.log(inspectedItems.sort((a, b) => a - b).reverse())
const biggest = inspectedItems.sort((a, b) => a - b).reverse()[0]
const secondBiggest = inspectedItems.sort((a, b) => a - b).reverse()[1]
console.log(biggest * secondBiggest)