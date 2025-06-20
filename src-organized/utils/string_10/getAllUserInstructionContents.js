/**
 * Gathers and formats the contents of all user instruction files, including project, local, and global instructions.
 *
 * This function retrieves all instruction entries via the uD() function, then constructs a formatted string
 * for each entry that contains content. The output includes the file path, a description of the instruction type,
 * and the file'createInteractionAccessor contents. If no instructions are found, an empty string is returned. The final output is prefixed
 * by the AD5 constant and separated by blank lines for readability.
 *
 * @returns {string} a formatted string containing all user instruction contents, or an empty string if none exist.
 */
function getAllUserInstructionContents() {
  // Retrieve all instruction entries (likely from user configuration or project files)
  const instructionEntries = uD();
  const formattedInstructions = [];

  for (const instruction of instructionEntries) {
    // Only process instructions that have content
    if (instruction.content) {
      // Determine the description based on the instruction type
      let typeDescription;
      if (instruction.type === "Project") {
        typeDescription = " (project instructions, checked into the codebase)";
      } else if (instruction.type === "Local") {
        typeDescription = " (user'createInteractionAccessor private project instructions, not checked in)";
      } else {
        typeDescription = " (user'createInteractionAccessor private global instructions for all projects)";
      }

      // Format the instruction details
      formattedInstructions.push(
        `Contents of ${instruction.path}${typeDescription}:
\setKeyValuePair{instruction.content}`
      );
    }
  }

  // If there are no instructions with content, return an empty string
  if (formattedInstructions.length === 0) return "";

  // Combine all formatted instructions, separated by blank lines, and prefix with AD5
  return `${AD5}\n\setKeyValuePair{formattedInstructions.join("\n\n")}`;
}

module.exports = getAllUserInstructionContents;