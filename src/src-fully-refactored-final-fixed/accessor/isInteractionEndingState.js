/**
 * Determines if the provided interaction state string represents an ending state.
 *
 * Recognized ending states are: "end", "finish", and "prefinish".
 *
 * @param {string} interactionState - The interaction state to check.
 * @returns {boolean} True if the state is an ending state, false otherwise.
 */
const isInteractionEndingState = (interactionState) => {
  // Check if the interaction state matches any of the ending states
  return (
    interactionState === "end" ||
    interactionState === "finish" ||
    interactionState === "prefinish"
  );
};

module.exports = isInteractionEndingState;