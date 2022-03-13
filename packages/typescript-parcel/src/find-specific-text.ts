/**
 * Thic method can count which how many specific text includes in text of the argument
 * @param text
 */
export const findSpecificText = (text: string): number => {
  const regex = /[js]/gi
  const matcher = text.match(regex)
  const result = matcher === null ? 0 : matcher.length
  return result
}

// const chars = text.split('')
// const targets = ['j', 's', 'J', 'S']
// chars.forEach(a => {
//   targets.includes(a)
//   // ....
// });
