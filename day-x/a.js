const input = await Deno.readTextFile("./input.txt")
// const input = await Deno.readTextFile("./test.txt")

const cleanInput = input.split('\n')

console.log(cleanInput)