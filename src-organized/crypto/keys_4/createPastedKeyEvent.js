/**
 * Creates a standardized key event object representing a pasted sequence.
 *
 * @param {string} keySequence - The raw key sequence that was pasted (e.g., from clipboard input).
 * @returns {Object} An object describing the key event, with all modifier flags set to false and isPasted set to true.
 */
function createPastedKeyEvent(keySequence) {
  return {
    name: "", // No specific key name for pasted input
    fn: false, // Function key not pressed
    ctrl: false, // Control key not pressed
    meta: false, // Meta (Command/Windows) key not pressed
    shift: false, // Shift key not pressed
    option: false, // Option/Alt key not pressed
    sequence: keySequence, // The actual key sequence pasted
    raw: keySequence, // Raw representation of the sequence
    isPasted: true // Indicates this event was triggered by a paste action
  };
}

module.exports = createPastedKeyEvent;