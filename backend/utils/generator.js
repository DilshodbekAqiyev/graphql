export function* generator() {
  let i = 3;
  while (true) {
    yield String(i++);
  }
}
