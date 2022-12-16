// const input = await Deno.readTextFile("./input.txt")
const input = await Deno.readTextFile("./test.txt")

const cleanInput = input.split('\n')

// console.log(cleanInput)

class Valve {
  constructor(name, flow, nextTunnels) {
    this.name = name
    this.flow = flow
    this.nextTunnels = nextTunnels
  }
}

let valves = []

cleanInput.map((element) => {

  element
  const name = element.split(' ')[1]
  const flow = Number(element.split(' ')[4].replace(/[^0-9]/g, ''))
  const nextTunnels = element.split(';')[1].replace(' to ', '').split(' ').slice(3, 100)

  valves.push(new Valve(name, flow, nextTunnels))

})

let openValve = []
let releasingPresure = []
let currentValve = ''
let beforeCurrentValve = ''

const moveToNextBiggestFlow = (nextTunnels) => {
  //console.log('nextTunnels', nextTunnels)
  let nextTunnelsWithFlow = []

  nextTunnels.map((element) => {
    nextTunnelsWithFlow.push({
      name: valves.filter((el) => el.name === element.replace(',', ''))[0].name,
      flow: valves.filter((el) => el.name === element.replace(',', ''))[0].flow,
      nextTunnels: valves.filter((el) => el.name === element.replace(',', ''))[0].nextTunnels.sort(),
    })
  })

  return nextTunnelsWithFlow.filter((e) => {
    if (e.nextTunnels.length > openValve.length) {
      return true
    } else {
      return e.nextTunnels.every((element, index) => element === openValve.sort()[index]).length !== openValve.length
    }
  }).filter(e => e.name !== beforeCurrentValve).sort((a, b) => {
    a.flow < b.flow
  })[0].name


  // return nextTunnelsWithFlow.filter(e => !openValve.includes(e.name)).sort((a, b) => {
  //   a.flow > b.flow
  // })[0].name

}

const shouldOpen = (currentValvex) => {

  const currentFlowValue = valves.filter((el) => el.name === currentValvex)[0].flow

  return valves.filter((el) => el.name === currentValvex)[0].nextTunnels.some((element) => {
    return valves.filter((el) => el.name === element.replace(',', ''))[0].flow < currentFlowValue
  })

}

// 30 minutes
for (let index = 30; index > 0; index--) {
  if (index === 30) {

    if (valves.filter((e) => e.name === 'AA')[0].flow === 0) {
      // move to
      beforeCurrentValve = currentValve
      currentValve = moveToNextBiggestFlow(valves.filter((e) => e.name === 'AA')[0].nextTunnels)
    } else {
      // open valve
      openValve.push(valves.filter((e) => e.name === 'AA')[0].name)
      releasingPresure.push(valves.filter((e) => e.name === 'AA')[0].flow * index)
      index--
      // move to
      beforeCurrentValve = currentValve
      currentValve = moveToNextBiggestFlow(valves.filter((e) => e.name === 'AA')[0].nextTunnels)
    }

  } else {

    // if (valves.filter((e) => e.name === currentValve)[0].flow === 0) {
    //   // move to
    //   currentValve = moveToNextBiggestFlow(valves.filter((e) => e.name === currentValve)[0].nextTunnels)
    // } else {

    // console.log(openValve)
    console.log('**currentValve**', currentValve)

    // check if exist bigger flow
    if (shouldOpen(currentValve) && !openValve.includes(currentValve)) {
      // open valve
      openValve.push(valves.filter((e) => e.name === currentValve)[0].name)
      // calc released pressure
      releasingPresure.push(valves.filter((e) => e.name === currentValve)[0].flow * index)
      index--
      // move to
      beforeCurrentValve = currentValve
      currentValve = moveToNextBiggestFlow(valves.filter((e) => e.name === currentValve)[0].nextTunnels)
    } else {
      // move to
      beforeCurrentValve = currentValve
      currentValve = moveToNextBiggestFlow(valves.filter((e) => e.name === currentValve)[0].nextTunnels)
    }
    // }

  }

  // console.log(currentValve)
  // console.log('openValve', openValve)

}

// console.log('openValve', openValve)
// console.log('releasingPresure', releasingPresure)
// console.log('currentValve', currentValve)

