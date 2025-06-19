/**
 * Retrieves the current value of the code edit tool decision counter.
 *
 * This function acts as an accessor for the 'codeEditToolDecisionCounter' property
 * on the global N9 object. It is used to track the number of decisions made by the code edit tool.
 *
 * @returns {number} The current value of the code edit tool decision counter.
 */
function getCodeEditToolDecisionCounter() {
  // Access the global N9 object'createInteractionAccessor codeEditToolDecisionCounter property
  return N9.codeEditToolDecisionCounter;
}

module.exports = getCodeEditToolDecisionCounter;