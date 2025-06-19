/**
 * Manages a queue of commands using React state and refs, providing access to the current queue,
 * a mutable reference to the queue, and a setter function that updates both.
 *
 * @returns {Object} An object containing the current queued commands array, a ref to the queue,
 *                   and a setter function to update the queue.
 */
function useQueuedCommands() {
  // State to hold the current array of queued commands
  const [queuedCommands, setQueuedCommands] = eu.useState([]);

  // Ref to hold the mutable current queued commands array
  const queuedCommandsRef = eu.useRef([]);

  /**
   * Updates the queued commands both in the ref and in state.
   * Accepts an updater function that receives the current queue and returns the new queue.
   *
   * @param {function(Array): Array} updateFn - Function to update the queued commands array.
   */
  const updateQueuedCommands = eu.useCallback((updateFn) => {
    // Update the ref with the new queue
    queuedCommandsRef.current = updateFn(queuedCommandsRef.current);
    // Update the state to trigger re-renders
    setQueuedCommands(queuedCommandsRef.current);
  }, [setQueuedCommands]);

  return {
    queuedCommands,
    queuedCommandsRef,
    setQueuedCommands: updateQueuedCommands
  };
}

module.exports = useQueuedCommands;