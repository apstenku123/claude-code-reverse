/**
 * Creates a configuration object for the web search feature.
 *
 * @param {Object} options - The configuration options for the web search.
 * @param {string[]} [options.allowed_domains] - List of domains that are allowed for the web search.
 * @param {string[]} [options.blocked_domains] - List of domains that are blocked from the web search.
 * @returns {Object} The web search configuration object with type, name, allowed and blocked domains, and max uses.
 */
const createWebSearchConfig = (options) => {
  // Return the configuration object for web search
  return {
    type: "web_search_20250305", // Unique identifier for the web search type
    name: "web_search",          // Human-readable name for the feature
    allowed_domains: options.allowed_domains, // Domains allowed for searching
    blocked_domains: options.blocked_domains, // Domains blocked from searching
    max_uses: 8                  // Maximum number of times this config can be used
  };
};

module.exports = createWebSearchConfig;
