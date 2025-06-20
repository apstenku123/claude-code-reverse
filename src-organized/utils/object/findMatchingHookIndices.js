/**
 * Iterates through two linked lists (current and previous hook states) in parallel and returns the indices where a custom comparison function returns true.
 *
 * @param {Object} currentHook - The head node of the current hook linked list (e.g., from a React Fiber tree).
 * @param {Object} previousHook - The head node of the previous hook linked list to compare against.
 * @returns {number[]|null} An array of indices where the comparison function returns true, or null if either input is null.
 */
function findMatchingHookIndices(currentHook, previousHook) {
  if (currentHook == null || previousHook == null) return null;

  const matchingIndices = [];
  let index = 0;

  // Check if previousHook has the expected hook properties
  const hasHookProperties = previousHook.hasOwnProperty("baseState") &&
    previousHook.hasOwnProperty("memoizedState") &&
    previousHook.hasOwnProperty("next") &&
    previousHook.hasOwnProperty("queue");

  if (hasHookProperties) {
    // Traverse both linked lists in parallel
    while (previousHook !== null) {
      // hasMemoizedStateChanged is an external comparison function
      if (hasMemoizedStateChanged(currentHook, previousHook)) {
        matchingIndices.push(index);
      }
      previousHook = previousHook.next;
      currentHook = currentHook.next;
      index++;
    }
  }

  return matchingIndices;
}

module.exports = findMatchingHookIndices;