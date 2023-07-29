# App url
https://jfilgairacordon.github.io/handshake_programing_language/

This is an implementation of this: https://github.com/jesus-seijas-sp/hand-challenge/tree/main but in a web environment.

# Introducción
HandLanguage works with a memory of an indefinite size of bytes, with all values initialized to 0. This language have 7 instructions:

- 👉 Moves memory pointer to the next cell.
- 👈 Moves memory pointer to the previous cell.
- 👆 Increments the value of the cell pointed.
- 👇 Decrements the value of the cell pointed.
- 🤜 if the memory cell at the current position is 0, jump just after the next 🤛.
- 🤛 if the memory cell at the current position is not 0, jump just after the previous 🤜.

## Notes
- AS memory cells are bytes, from 0 to 255 value, if you decrease 0 tou'll get 255. If you increase 255 you'll get 0.
- Loops of 🤜 and 🤛 can be nested.

# Tests
Small test your app must pass:
## This program display "Hello"

👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊

## This program (with nested loops) display "Hello World!"

👉👆👆👆👆👆👆👆👆🤜👇👈👆👆👆👆👆👆👆👆👆👉🤛👈👊👉👉👆👉👇🤜👆🤛👆👆👉👆👆👉👆👆👆🤜👉🤜👇👉👆👆👆👈👈👆👆👆👉🤛👈👈🤛👉👇👇👇👇👇👊👉👇👉👆👆👆👊👊👆👆👆👊👉👇👊👈👈👆🤜👉🤜👆👉👆🤛👉👉🤛👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👊👆👆👆👊👇👇👇👇👇👇👊👇👇👇👇👇👇👇👇👊👉👆👊👉👆👊
