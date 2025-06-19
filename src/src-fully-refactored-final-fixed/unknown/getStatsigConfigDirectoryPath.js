/**
 * Returns the full path to the 'statsig' configuration directory within the Claude config directory.
 *
 * @returns {string} The absolute path to the 'statsig' configuration directory.
 */
function getStatsigConfigDirectoryPath() {
  // Import the Node.js 'path' module for path operations
  const path = require('path');
  // Import the function that retrieves the Claude config directory
  const getClaudeConfigDirectory = require('./getClaudeConfigDirectory');

  // Join the Claude config directory path with 'statsig' to get the full path
  return path.join(getClaudeConfigDirectory(), 'statsig');
}

module.exports = getStatsigConfigDirectoryPath;