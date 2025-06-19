/**
 * Constructs an evaluation result object containing metadata and evaluation details.
 *
 * @param {string} name - The name of the evaluation or rule.
 * @param {object} details - Additional details or configuration related to the evaluation.
 * @param {object} evaluationContext - The evaluation context object, possibly containing a rule_id property.
 * @param {any} value - The value or result of the evaluation.
 * @returns {object} An object containing the evaluation metadata and results.
 */
function createEvaluationResult(name, details, evaluationContext, value) {
  // Attempt to extract ruleID from evaluationContext; fallback to sw9 if not present
  const ruleID = (evaluationContext?.rule_id !== undefined && evaluationContext?.rule_id !== null)
    ? evaluationContext.rule_id
    : sw9;

  return {
    name: name,
    details: details,
    ruleID: ruleID,
    __evaluation: evaluationContext,
    value: value
  };
}

module.exports = createEvaluationResult;