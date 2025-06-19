/**
 * Checks if the provided state string is one of the recognized prefinish or finish states.
 *
 * Recognized states are: 'end', 'finish', or 'prefinish'.
 *
 * @param {string} state - The state string to check.
 * @returns {boolean} True if the state is 'end', 'finish', or 'prefinish'; otherwise, false.
 */
const isPrefinishState = (state) => {
  // Return true if the state matches any of the recognized prefinish or finish states
  return state === "end" || state === "finish" || state === "prefinish";
};

module.exports = isPrefinishState;