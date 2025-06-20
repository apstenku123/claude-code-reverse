/**
 * Creates a standardized event object representing a pasted input sequence.
 *
 * @param {string} inputSequence - The raw input sequence that was pasted by the user.
 * @returns {Object} An event object describing the pasted sequence and its metadata.
 */
function createPastedSequenceEvent(inputSequence) {
  return {
    name: "", // No specific name for pasted sequence events
    fn: false, // Indicates this is not a function key event
    ctrl: false, // Control key was not pressed
    meta: false, // Meta key was not pressed
    shift: false, // Shift key was not pressed
    option: false, // Option/Alt key was not pressed
    sequence: inputSequence, // The actual sequence that was pasted
    raw: inputSequence, // The raw input, identical to sequence
    isPasted: true // Marks this event as a result of a paste action
  };
}

module.exports = createPastedSequenceEvent;