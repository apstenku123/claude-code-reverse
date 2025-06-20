/**
 * Initializes and registers various metrics counters for CLI usage statistics.
 *
 * This function sets up counters for session count, lines of code modified, pull requests,
 * commits, cost, tokens used, and code edit tool decisions. It assigns the provided
 * meter object and uses the provided counter registration function to create and assign
 * counters with appropriate descriptions and units.
 *
 * @param {object} meterInstance - The metrics meter instance to be used for tracking metrics.
 * @param {function} registerCounter - Function to register a new counter. Should accept a counter name (string) and an options object.
 * @returns {void}
 */
function initializeMetricsCounters(meterInstance, registerCounter) {
  // Assign the meter instance to the global N9 object
  N9.meter = meterInstance;

  // Register a counter for CLI session count
  N9.sessionCounter = registerCounter("claude_code.session.count", {
    description: "Count of CLI sessions started"
  });

  // Register a counter for lines of code modified
  N9.locCounter = registerCounter("claude_code.lines_of_code.count", {
    description: "Count of lines of code modified, with the 'type' attribute indicating whether lines were added or removed"
  });

  // Register a counter for pull requests created
  N9.prCounter = registerCounter("claude_code.pull_request.count", {
    description: "Number of pull requests created"
  });

  // Register a counter for git commits created
  N9.commitCounter = registerCounter("claude_code.commit.count", {
    description: "Number of git commits created"
  });

  // Register a counter for cost usage in USD
  N9.costCounter = registerCounter("claude_code.cost.usage", {
    description: "Cost of the Claude Code session",
    unit: "USD"
  });

  // Register a counter for tokens used
  N9.tokenCounter = registerCounter("claude_code.token.usage", {
    description: "Number of tokens used",
    unit: "tokens"
  });

  // Register a counter for code edit tool permission decisions
  N9.codeEditToolDecisionCounter = registerCounter("claude_code.code_edit_tool.decision", {
    description: "Count of code editing tool permission decisions (accept/reject) for Edit, MultiEdit, Write, and NotebookEdit tools"
  });
}

module.exports = initializeMetricsCounters;
