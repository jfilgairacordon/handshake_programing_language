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
      if (data[position] === 0) {
        codeIterator = findClosest({
          code,
          currentPosition: codeIterator,
          lookFor: HANDSHAKE_ACTION.JUMP_LEFT,
          origin: HANDSHAKE_ACTION.JUMP_RIGHT
        })
        // jumps after the corresponding at the end of the loop (line 79)
      }
    }

    // if the memory cell at the current position is not 0, jump just after the corresponding 🤜
    if (currentChar === HANDSHAKE_ACTION.JUMP_LEFT) {
      if (data[position] !== 0) {
        codeIterator = findClosest({
          code,
          currentPosition:
          codeIterator,
          lookFor: HANDSHAKE_ACTION.JUMP_RIGHT,
          origin: HANDSHAKE_ACTION.JUMP_LEFT
        })
        // jumps after the corresponding at the end of the loop (line 79)
      }
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
  lookFor: HANDSHAKE_ACTION
  origin: HANDSHAKE_ACTION
}

const findClosest = ({ code, currentPosition, lookFor, origin }: FindClosestParams): number => {
  let currentCode = code[currentPosition]
  let skips = 0

  while (currentCode !== lookFor) {
    currentPosition = lookFor === HANDSHAKE_ACTION.JUMP_LEFT ? currentPosition + 1 : currentPosition - 1
    currentCode = code[currentPosition]

    // If we find the same type of jump, we skip it
    if (currentCode === origin) {
      skips += 1
    }

    // If we have to skip..
    if (currentCode === lookFor && skips > 0) {
      skips -= 1
      currentPosition = lookFor === HANDSHAKE_ACTION.JUMP_LEFT ? currentPosition + 1 : currentPosition - 1
      currentCode = code[currentPosition]
    }

    if (currentPosition >= code.length) {
      throw new Error('No matching jump found')
    }
  }

  return currentPosition
}
