TYPING_INPUT = 'TYPING_INPUT'

export function typingInput (input, text) {
  return {
    type: TYPING_INPUT,
    text: text,
    input: input
  }
}
