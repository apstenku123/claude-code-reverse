/**
 * Generates a synthesis prompt by combining the original task description and multiple agent responses.
 *
 * @param {string} originalTask - The description of the original task to be solved.
 * @param {Array<Object>} agentResponses - An array of agent response objects. Each object should have:
 *   - agentIndex {number}: The index of the agent
 *   - content {Array<Object>}: Array of content objects, each with:
 *       - type {string}: The type of content (e.g., 'text')
 *       - text {string}: The actual text content
 * @returns {string} a formatted prompt string that includes the original task, all agent responses, and synthesis instructions.
 */
function generateAgentSynthesisPrompt(originalTask, agentResponses) {
  // Sort agent responses by their agentIndex to ensure consistent ordering
  const sortedAgentResponses = agentResponses.sort((a, b) => a.agentIndex - b.agentIndex);

  // Map each agent'createInteractionAccessor response to a formatted string
  const formattedAgentResponses = sortedAgentResponses.map((agent, index) => {
    // Filter content to only include text entries, then join them with double line breaks
    const agentText = agent.content
      .filter(contentItem => contentItem.type === "text")
      .map(contentItem => contentItem.text)
      .join("\n\n");

    // Format the agent'createInteractionAccessor response section
    return `== AGENT ${index + 1} RESPONSE ==\setKeyValuePair{agentText}\n`;
  }).join("\n\n");

  // Construct the final synthesis prompt
  return `Original task: ${originalTask}

createObjectTracker'removeTrailingCharacters assigned multiple agents to tackle this task. Each agent has analyzed the problem and provided their findings.

${formattedAgentResponses}

Based on all the information provided by these agents, synthesize a comprehensive and cohesive response that:
1. Combines the key insights from all agents
2. Resolves any contradictions between agent findings
3. Presents a unified solution that addresses the original task
4. Includes all important details and code examples from the individual responses
5. Is well-structured and complete

Your synthesis should be thorough but focused on the original task.`;
}

module.exports = generateAgentSynthesisPrompt;
