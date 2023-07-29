enum HANDSHAKE_ACTION {
  MOVE_RIGHT = '👉',
  MOVE_LEFT = '👈',
  INCREMENT = '👆',
  DECREMENT = '👇',
  JUMP_RIGHT = '🤜',
  JUMP_LEFT = '🤛',
  DISPLAY = '👊'
}

export const handshakeTranslator = (code: string[]): string => {
  const data: number[] = []
  let skips = 0
  let result = ''
  let position = 0
  let codeIterator = 0

  while (codeIterator < code.length) {
    const currentChar = code[codeIterator]

    // Init the position if undefined
    if (data[position] === undefined) data[position] = 0

    //  Moves the memory pointer to the next cell
    if (currentChar === HANDSHAKE_ACTION.MOVE_RIGHT) {
      position += 1
    }

    // Moves the memory pointer to the previous cell
    if (currentChar === HANDSHAKE_ACTION.MOVE_LEFT) {
      position -= 1
    }

    // Increments the memory pointer cell value
    if (currentChar === HANDSHAKE_ACTION.INCREMENT) {
      if (data[position] === 255) {
        data[position] = 0
      } else { data[position] += 1 }
    }

    // Decrements the memory pointer cell value
    if (currentChar === HANDSHAKE_ACTION.DECREMENT) {
      if (data[position] === 0) {
        data[position] = 255
      } else { data[position] -= 1 }
    }

    // if the memory cell at the current position is 0, jump just after the corresponding 🤛
    if (currentChar === HANDSHAKE_ACTION.JUMP_RIGHT) {
      skips += 1
      if (data[position] === 0) {
        codeIterator = findClosest({ code, currentPosition: codeIterator, type: 'start', skips })
        // jumps after the corresponding at the end of the loop (line 71)
      }
    }

    // if the memory cell at the current position is not 0, jump just after the corresponding 🤜
    if (currentChar === HANDSHAKE_ACTION.JUMP_LEFT) {
      if (data[position] !== 0) {
        codeIterator = findClosest({ code, currentPosition: codeIterator, type: 'end', skips })
        // jumps after the corresponding at the end of the loop (line 71)
      }
      skips = skips > 0 ? skips -= 1 : skips
    }

    // Display the current character represented by the ASCII code defined by the current position.
    if (currentChar === HANDSHAKE_ACTION.DISPLAY) {
      result += String.fromCharCode(data[position])
    }

    codeIterator += 1
  }

  return result
}

type FindClosestParams = | {
  code: string[]
  currentPosition: number
  type: 'start' | 'end'
  skips: number
}
const findClosest = ({ code, currentPosition, type, skips }: FindClosestParams): number => {
  let currentCode = code[currentPosition]
  const condition = type === 'end' ? HANDSHAKE_ACTION.JUMP_RIGHT : HANDSHAKE_ACTION.JUMP_LEFT
  while (currentCode !== condition) {
    currentPosition = type === 'start' ? currentPosition + 1 : currentPosition - 1
    // If we have the exit condition but it's needed to skip more, then skip 1 position
    // and drecrease the skip counter
    if (currentCode === condition && skips > 0) {
      currentPosition -= 1
      skips -= 1
    }

    currentCode = code[currentPosition]
  }

  return currentPosition
}
