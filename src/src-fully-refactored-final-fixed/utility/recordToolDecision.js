/**
 * Records a decision made by a tool, sending the decision details to the SK logging system.
 *
 * @async
 * @function recordToolDecision
 * @param {string} toolName - The name of the tool making the decision.
 * @param {string} decision - The decision that was made by the tool.
 * @param {string} source - The source or context in which the decision was made.
 * @returns {Promise<void>} Resolves when the decision has been successfully recorded.
 */
async function recordToolDecision(toolName, decision, source) {
  // Send the decision details to the SK logging system
  await SK("tool_decision", {
    decision: decision,
    source: source,
    tool_name: toolName
  });
}

module.exports = recordToolDecision;