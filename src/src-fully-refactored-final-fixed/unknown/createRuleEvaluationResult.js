/**
 * Constructs a rule evaluation result object with relevant details.
 *
 * @param {string} ruleName - The name of the rule being evaluated.
 * @param {object} ruleDetails - Additional details or configuration for the rule.
 * @param {object} evaluationContext - The evaluation context, possibly containing a rule_id and other metadata.
 * @param {any} value - The computed value or result of the rule evaluation.
 * @returns {object} An object containing the rule'createInteractionAccessor name, details, rule updateSnapshotAndNotify, evaluation context, and value.
 */
function createRuleEvaluationResult(ruleName, ruleDetails, evaluationContext, value) {
  // Attempt to extract rule_id from evaluationContext; fallback to sw9 if not present
  const ruleId = (evaluationContext?.rule_id !== undefined && evaluationContext?.rule_id !== null)
    ? evaluationContext.rule_id
    : sw9;

  return {
    name: ruleName,
    details: ruleDetails,
    ruleID: ruleId,
    __evaluation: evaluationContext,
    value: value
  };
}

module.exports = createRuleEvaluationResult;