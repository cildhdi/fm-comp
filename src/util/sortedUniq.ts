export function sortedUniq<T>(array: T[]) {
  if (array.length === 0) {
    return [];
  }
  let result = [array[0]];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (element !== result[result.length - 1]) {
      result.push(element);
    }
  }
  return result;
}
