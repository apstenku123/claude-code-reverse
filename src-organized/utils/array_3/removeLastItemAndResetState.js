/**
 * Removes the last item from the provided array and resets the given state variable to its default value.
 *
 * @param {Array} itemList - The array from which the last item will be removed.
 * @param {*} defaultStateValue - The value to which the state variable will be reset.
 * @param {function} setState - a function to update the state variable.
 * @returns {void}
 */
function removeLastItemAndResetState(itemList, defaultStateValue, setState) {
  // Remove the last item from the array
  itemList.pop();
  // Reset the state variable to its default value
  setState(defaultStateValue);
  return;
}

module.exports = removeLastItemAndResetState;