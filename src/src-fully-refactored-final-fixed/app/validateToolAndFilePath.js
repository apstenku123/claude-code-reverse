/**
 * Validates that the correct tool is used and the provided file path matches the expected value.
 *
 * @async
 * @function validateToolAndFilePath
 * @param {object} selectedTool - The tool object being validated. Should match the expected tool (uF).
 * @param {object} inputConfig - The input configuration object to be validated against the tool'createInteractionAccessor input schema.
 * @param {string} expectedFilePath - The required file path that must be present in the input configuration.
 * @returns {Promise<object>} An object indicating the validation result:
 *   - If the tool is incorrect: { behavior: 'ask', message: 'Used incorrect tool' }
 *   - If the file path is incorrect: { behavior: 'ask', message: 'Must use correct memory file path: <expectedFilePath>' }
 *   - If both are correct: { behavior: 'allow', updatedInput: <inputConfig> }
 */
async function validateToolAndFilePath(selectedTool, inputConfig, expectedFilePath) {
  // Check if the selected tool matches the expected tool (uF)
  if (selectedTool !== uF) {
    return {
      behavior: "ask",
      message: "Used incorrect tool"
    };
  }

  // Parse and validate the input configuration using the tool'createInteractionAccessor input schema
  const { file_path: actualFilePath } = uF.inputSchema.parse(inputConfig);

  // Ensure the provided file path matches the expected file path
  if (actualFilePath !== expectedFilePath) {
    return {
      behavior: "ask",
      message: `Must use correct memory file path: ${expectedFilePath}`
    };
  }

  // All validations passed; allow the operation and return the updated input
  return {
    behavior: "allow",
    updatedInput: inputConfig
  };
}

module.exports = validateToolAndFilePath;