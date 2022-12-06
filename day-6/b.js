const input = await Deno.readTextFile("./input.txt")
// const inputA = await Deno.readTextFile("./test-a.txt")

const isUnique = (str) => {
  return new Set(str).size == str.length;
}

for (let index = 0; index < input.length; index++) {
  const element = input.slice(index, index + 14)

  if (isUnique(element)) {
    console.log(element)
    console.log(input.indexOf(element) + 14)
    break
  }
}
