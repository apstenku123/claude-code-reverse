/**
 * Appends a new item to the list in a tuple, returning a new tuple with the updated list.
 *
 * @param {[any, Array<any>]} tupleWithList - a tuple where the first element is any value and the second is an array.
 * @param {any} newItem - The item to append to the array in the tuple.
 * @returns {[any, Array<any>]} a new tuple with the same first element and the array with the new item appended.
 */
function appendItemToTupleList(tupleWithList, newItem) {
  const [tupleFirstElement, tupleList] = tupleWithList;
  // Return a new tuple: [original first element, new array with newItem appended]
  return [tupleFirstElement, [...tupleList, newItem]];
}

module.exports = appendItemToTupleList;