/**
 * Gathers and formats the contents of all available instruction files for display.
 * Each instruction is annotated with its type and path, and only those with content are included.
 * If no instructions are found, returns an empty string.
 *
 * @returns {string} a formatted string containing all instruction contents, or an empty string if none exist.
 */
function getFormattedInstructionContents() {
  // Retrieve all instruction objects (each with type, path, and content)
  const instructionList = uD();
  const formattedContents = [];

  for (const instruction of instructionList) {
    // Only process instructions that have content
    if (instruction.content) {
      // Determine the annotation based on the instruction type
      let typeAnnotation;
      if (instruction.type === "Project") {
        typeAnnotation = " (project instructions, checked into the codebase)";
      } else if (instruction.type === "Local") {
        typeAnnotation = " (user'createInteractionAccessor private project instructions, not checked in)";
      } else {
        typeAnnotation = " (user'createInteractionAccessor private global instructions for all projects)";
      }

      // Format the instruction'createInteractionAccessor content with its path and annotation
      formattedContents.push(
        `Contents of ${instruction.path}${typeAnnotation}:

${instruction.content}`
      );
    }
  }

  // If no instructions with content were found, return an empty string
  if (formattedContents.length === 0) return "";

  // AD5 is assumed to be a header or separator string defined elsewhere
  return `${AD5}

${formattedContents.join("\n\n")}`;
}

module.exports = getFormattedInstructionContents;