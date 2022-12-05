const input = await Deno.readTextFile("./input.txt")


// A / X - Rock - 1
// B / Y - Paper - 2
// C / Z - Scissors - 3

// lost - 0 - X
// draw - 3 - Y
// won - 6 - Z

// A Y = Y 2+6 = 8 - won
// A X = AX 1+3 = 4 - draw
// A Z = A 0+3 = 3 - lost

// B Y = BY 2+3=5 - draw
// B X = X 1+0=1 - lost
// B Z = Z 3+6=9 - won

// C Y = C 0+2=2 - lost
// C X = X 1+6=7 - won
// C Z = CZ 3+3=6 - draw

const modifyResult = (game) => {
  let modifyGameScore = []

  game.map((result) => {

    switch (result) {
      // draw
      case 'A Y':
        modifyGameScore.push("A X")
        break;
      // lost
      case 'A X':
        modifyGameScore.push("A Z")
        break;
      // won
      case 'A Z':
        modifyGameScore.push("A Y")
        break;
      // draw
      case 'B Y':
        modifyGameScore.push("B Y")
        break;
      // lost
      case 'B X':
        modifyGameScore.push("B X")
        break;
      // won
      case 'B Z':
        modifyGameScore.push("B Z")
        break;
      // draw
      case 'C Y':
        modifyGameScore.push("C Z")
        break;
      // lost
      case 'C X':
        modifyGameScore.push("C Y")
        break;
      // won
      case 'C Z':
        modifyGameScore.push("C X")
        break;
      default:
        break;
    }
  })

  return modifyGameScore
}

const scorePerGame = (game) => {
  const modifyGame = modifyResult(game)
  let score = []

  modifyGame.map((result) => {

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

console.log(totalScore(input.split('\n')))