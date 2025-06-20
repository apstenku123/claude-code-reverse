/**
 * Initializes and configures code metrics counters for the CLI session.
 *
 * @param {any} sourceObservable - The observable or meter source used for tracking metrics.
 * @param {Function} createCounter - a factory function to create metric counters. Accepts a metric name and configuration object.
 * @returns {void}
 */
function initializeCodeMetricsCounters(sourceObservable, createCounter) {
  // Assign the main meter/observable for metrics tracking
  N9.meter = sourceObservable;

  // Counter for the number of CLI sessions started
  N9.sessionCounter = createCounter("claude_code.session.count", {
    description: "Count of CLI sessions started"
  });

  // Counter for lines of code modified (added/removed)
  N9.locCounter = createCounter("claude_code.lines_of_code.count", {
    description: "Count of lines of code modified, with the 'type' attribute indicating whether lines were added or removed"
  });

  // Counter for pull requests created
  N9.prCounter = createCounter("claude_code.pull_request.count", {
    description: "Number of pull requests created"
  });

  // Counter for git commits created
  N9.commitCounter = createCounter("claude_code.commit.count", {
    description: "Number of git commits created"
  });

  // Counter for cost usage in USD
  N9.costCounter = createCounter("claude_code.cost.usage", {
    description: "Cost of the Claude Code session",
    unit: "USD"
  });

  // Counter for number of tokens used
  N9.tokenCounter = createCounter("claude_code.token.usage", {
    description: "Number of tokens used",
    unit: "tokens"
  });

  // Counter for code editing tool permission decisions
  N9.codeEditToolDecisionCounter = createCounter("claude_code.code_edit_tool.decision", {
    description: "Count of code editing tool permission decisions (accept/reject) for Edit, MultiEdit, Write, and NotebookEdit tools"
  });
}

module.exports = initializeCodeMetricsCounters;