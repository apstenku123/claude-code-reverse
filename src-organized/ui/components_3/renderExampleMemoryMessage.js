/**
 * Renders an example memory message based on the provided memory type.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.type - The type of memory to display an example for. Possible values: 'Project', 'Local', 'User', 'ExperimentalUltraClaudeMd'.
 * @returns {React.ReactNode} a React fragment containing the appropriate example message, or nothing if the type is not recognized.
 */
function renderExampleMemoryMessage({ type: memoryType }) {
  // Map memory types to their example messages
  const memoryTypeToMessage = {
    Project: 'Example project memory: “Run lint with the following command after major edits: npm run lint”',
    Local: 'Example local memory: “Use my sandbox URL for testing: https://myapp.local”',
    User: 'Example user memory: “Don\'processRuleBeginHandlers add new comments when editing code”'
    // 'ExperimentalUltraClaudeMd' intentionally omitted as isBlobOrFileLikeObject renders nothing
  };

  // Helper component reference (assumed to be imported elsewhere)
  // '_' is a styled component or custom component for displaying messages

  return DB.createElement(
    DB.Fragment,
    null,
    // Conditionally render the example message if the memory type is recognized
    memoryType === 'Project' && DB.createElement(_, { dimColor: true }, memoryTypeToMessage.Project),
    memoryType === 'Local' && DB.createElement(_, { dimColor: true }, memoryTypeToMessage.Local),
    memoryType === 'User' && DB.createElement(_, { dimColor: true }, memoryTypeToMessage.User),
    // For 'ExperimentalUltraClaudeMd', render nothing (original logic: && !1)
    memoryType === 'ExperimentalUltraClaudeMd' && false
  );
}

module.exports = renderExampleMemoryMessage;