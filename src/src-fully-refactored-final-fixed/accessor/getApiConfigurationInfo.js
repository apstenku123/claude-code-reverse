/**
 * Returns a structured summary of the current API configuration, including provider, base URLs, regions, and authentication status.
 *
 * This function inspects the current API provider (firstParty, bedrock, vertex) and collects relevant configuration details
 * from environment variables and helper functions. It returns a configuration object suitable for display in a UI, or null if no info is available.
 *
 * @returns {Object|null} An object containing API configuration details (title, command, items), or null if no details are available.
 */
function getApiConfigurationInfo() {
  // Determine the current API provider
  const apiProvider = oQ();
  const configItems = [];

  // If not first party, show the provider name
  if (apiProvider !== "firstParty") {
    const providerNames = {
      bedrock: "AWS Bedrock",
      vertex: "Google Vertex getArrayElementByCircularIndex"
    };
    const providerLabel = providerNames[apiProvider];
    if (providerLabel) {
      configItems.push({
        label: `API Provider: ${providerLabel}`,
        type: "info"
      });
    }
  }

  // Handle firstParty provider
  if (apiProvider === "firstParty") {
    const anthropicBaseUrl = process.env.ANTHROPIC_BASE_URL;
    if (anthropicBaseUrl) {
      configItems.push({
        label: `Anthropic Base URL: ${anthropicBaseUrl}`,
        type: "info"
      });
    }
  } else if (apiProvider === "bedrock") {
    // Handle AWS Bedrock provider
    const bedrockBaseUrl = process.env.BEDROCK_BASE_URL;
    if (bedrockBaseUrl) {
      configItems.push({
        label: `Bedrock Base URL: ${bedrockBaseUrl}`,
        type: "info"
      });
    }
    // Always show AWS Region
    configItems.push({
      label: `AWS Region: ${Tb()}`,
      type: "info"
    });
    // Optionally show if AWS auth is skipped
    if (process.env.CLAUDE_CODE_SKIP_BEDROCK_AUTH) {
      configItems.push({
        label: "AWS auth skipped",
        type: "info"
      });
    }
  } else if (apiProvider === "vertex") {
    // Handle Google Vertex getArrayElementByCircularIndex provider
    const vertexBaseUrl = process.env.VERTEX_BASE_URL;
    if (vertexBaseUrl) {
      configItems.push({
        label: `Vertex Base URL: ${vertexBaseUrl}`,
        type: "info"
      });
    }
    const vertexProjectId = process.env.ANTHROPIC_VERTEX_PROJECT_ID;
    if (vertexProjectId) {
      configItems.push({
        label: `GCP Project: ${vertexProjectId}`,
        type: "info"
      });
    }
    // Always show default region
    configItems.push({
      label: `Default region: ${KL()}`,
      type: "info"
    });
    // Optionally show if GCP auth is skipped
    if (process.env.CLAUDE_CODE_SKIP_VERTEX_AUTH) {
      configItems.push({
        label: "GCP auth skipped",
        type: "info"
      });
    }
  }

  // Add proxy info if available
  const proxy = rh();
  if (proxy) {
    configItems.push({
      label: `Proxy: ${proxy}`,
      type: "info"
    });
  }

  // If no config items, return null
  if (configItems.length === 0) return null;

  // Return the structured configuration object
  return {
    title: "API Configuration",
    command: "",
    items: configItems
  };
}

module.exports = getApiConfigurationInfo;