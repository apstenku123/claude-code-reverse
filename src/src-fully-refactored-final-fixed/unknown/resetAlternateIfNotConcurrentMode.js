/**
 * Resets the 'alternate' property of both the current and previous fiber nodes
 * if the fiber is not in concurrent mode and the previous fiber exists.
 * Also sets the 'flags' property of the current fiber to indicate an update.
 *
 * @param {Object|null} previousFiber - The previous fiber node, or null if none exists.
 * @param {Object} currentFiber - The current fiber node being processed.
 * @returns {void}
 */
function resetAlternateIfNotConcurrentMode(previousFiber, currentFiber) {
  // Check if the fiber is not in concurrent mode (mode bit 1 is not set)
  // and if there is a previous fiber to reset
  const isNotConcurrentMode = (currentFiber.mode & 1) === 0;
  if (isNotConcurrentMode && previousFiber !== null) {
    // Remove alternate references to break the link between fibers
    previousFiber.alternate = null;
    currentFiber.alternate = null;
    // Set the 'flags' property to indicate an update (bitwise OR with 2)
    currentFiber.flags |= 2;
  }
}

module.exports = resetAlternateIfNotConcurrentMode;