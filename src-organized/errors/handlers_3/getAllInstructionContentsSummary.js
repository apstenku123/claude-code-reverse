/**
 * Generates a formatted summary of all instruction file contents.
 *
 * This function retrieves all instruction entries using the `uD` dependency, then
 * iterates through each entry to collect and format their contents based on their type.
 * If no entries contain content, an empty string is returned. Otherwise, the formatted
 * summary is returned, prefixed by the `AD5` constant.
 *
 * @returns {string} a formatted string summarizing the contents of all instruction files, or an empty string if none exist.
 */
const getAllInstructionContentsSummary = () => {
  // Retrieve all instruction entries (likely from storage or configuration)
  const instructionEntries = uD();
  const formattedContents = [];

  for (const entry of instructionEntries) {
    if (entry.content) {
      // Determine the description based on the instruction type
      let typeDescription;
      if (entry.type === "Project") {
        typeDescription = " (project instructions, checked into the codebase)";
      } else if (entry.type === "Local") {
        typeDescription = " (user'createInteractionAccessor private project instructions, not checked in)";
      } else {
        typeDescription = " (user'createInteractionAccessor private global instructions for all projects)";
      }

      // Format the content summary for this entry
      formattedContents.push(
        `Contents of ${entry.path}${typeDescription}:

${entry.content}`
      );
    }
  }

  // If there are no instruction contents, return an empty string
  if (formattedContents.length === 0) return "";

  // Otherwise, return the formatted summary, prefixed by AD5
  return `${AD5}

${formattedContents.join("\n\n")}`;
};

module.exports = getAllInstructionContentsSummary;