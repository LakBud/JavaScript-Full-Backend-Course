export const add = (a, b) => a + b;
export const substract = (a, b) => a - b;

export function divide(a, b) {
  if (b === 0) throw new Error("You can divide by zero");

  return a / b;
}
