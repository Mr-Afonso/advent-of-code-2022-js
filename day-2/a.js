const input = await Deno.readTextFile("./input.txt")


// A / X - Rock - 1
// B / Y - Paper - 2
// C / Z - Scissors - 3

// lost - 0
// draw - 3
// won - 6

// A Y = Y 2+6 = 8
// A X = AX 1+3 = 4
// A Z = A 0+3 = 3

// B Y = BY 2+3=5
// B X = X 1+0=1
// B Z = Z 3+6=9

// C Y = C 0+2=2
// C X = X 1+6=7
// C Z = CZ 3+3=6


const scorePerGame = (game) => {

  let score = []

  game.map((result) => {

    switch (result) {
      case 'A Y':
        score.push(8)
        break;
      case 'A X':
        score.push(4)
        break;
      case 'A Z':
        score.push(3)
        break;
      case 'B Y':
        score.push(5)
        break;
      case 'B X':
        score.push(1)
        break;
      case 'B Z':
        score.push(9)
        break;
      case 'C Y':
        score.push(2)
        break;
      case 'C X':
        score.push(7)
        break;
      case 'C Z':
        score.push(6)
        break;
      default:
        break;
    }
  })
  return score
}

const totalScore = (game) => {
  const totalScore = scorePerGame(game)
  return totalScore.reduce((a, b) => a + b)
}

console.log(scorePerGame(input.split('\n')))
console.log(totalScore(input.split('\n')))