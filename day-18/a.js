// const input = await Deno.readTextFile("./input.txt")
const input = await Deno.readTextFile("./test.txt")

const cleanInput = input.split('\r\n')

// console.log(cleanInput)

const length = 8

let matrix3D = new Array(length).fill(
    new Array(length).fill(
      new Array(length).fill(0)
    )
  )

cleanInput.map((element) => {
    
    const x = Number(element.split(',')[0])
    const y = Number(element.split(',')[1])
    const z = Number(element.split(',')[2])

    matrix3D[x][y][z] = "#"
})

let countNotConnected = 0


cleanInput.map((element) => {
    
    const x = Number(element.split(',')[0])
    const y = Number(element.split(',')[1])
    const z = Number(element.split(',')[2])

    if(matrix3D[x-1][y][z] !== '#') {
        countNotConnected++
    }

    if(matrix3D[x][y-1][z] !== '#') {
        countNotConnected++
    }

    if(matrix3D[x][y][z-1] !== '#') {
        countNotConnected++
    }

    if(matrix3D[x+1][y][z] !== '#') {
        countNotConnected++
    }

    if(matrix3D[x][y+1][z] !== '#') {
        countNotConnected++
    }

    if(matrix3D[x][y][z+1] !== '#') {
        countNotConnected++
    }

})

// for (let x = 0; x < matrix3D.length; x++) {
//     const elementX = matrix3D[x]

//     for (let y = 0; y < elementX.length; y++) {
//         const elementY = elementX[y]

//         for (let z = 0; z < elementY.length; z++) {
//             const elementZ = elementY[z]

//             if(x > 0 && matrix3D[x-1][y][z] !== '#') {
//                 countNotConnected++
//             }
        
//             if(y > 0 && matrix3D[x][y-1][z] !== '#') {
//                 countNotConnected++
//             }
        
//             if(z>0 && matrix3D[x][y][z-1] !== '#') {
//                 countNotConnected++
//             }
        
//             if( x< matrix3D.length-1 && matrix3D[x+1][y][z] !== '#') {
//                 countNotConnected++
//             }
        
//             if(y< elementX.length-1 && matrix3D[x][y+1][z] !== '#') {
//                 countNotConnected++
//             }
        
//             if(z< elementY.length-1 &&  matrix3D[x][y][z+1] !== '#') {
//                 countNotConnected++
//             }
            
//         }
        
//     }
    
// }

console.log(countNotConnected)
console.log(matrix3D)