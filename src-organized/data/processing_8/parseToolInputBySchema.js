/**
 * Parses and transforms tool input objects based on their schema and tool type.
 *
 * Depending on the tool (e.g., shell command, file edit, or generic tool),
 * this function parses the input using the appropriate schema, transforms the input
 * as needed, and returns a normalized object for further processing.
 *
 * @param {object} toolType - The tool type object, expected to have a 'name' property and inputSchema.
 * @param {object} toolInput - The input object to be parsed and transformed according to the tool'createInteractionAccessor schema.
 * @returns {object} The normalized and transformed tool input object, ready for execution or further handling.
 */
function parseToolInputBySchema(toolType, toolInput) {
  switch (toolType.name) {
    // Handle shell command tool
    case P4.name: {
      // Parse input according to the shell command schema
      const {
        command,
        sandbox,
        timeout,
        description,
        read_only: readOnly
      } = P4.inputSchema.parse(toolInput);

      // Remove the working directory prefix from the command
      let normalizedCommand = command.replace(`cd ${iA()} && `, "");
      // Replace escaped semicolons
      normalizedCommand = normalizedCommand.replace(/\;/g, "\\;");

      // If the command is a simple echo, trigger a side effect (e.g., logging or analytics)
      if (/^echo\s+["']?[^|&;><]*["']?$/i.test(normalizedCommand.trim())) {
        logTelemetryEventIfEnabled("bash_tool_simple_echo", {});
      }

      // Build the normalized command object, including only defined/meaningful properties
      return {
        command: normalizedCommand,
        ...(timeout ? { timeout } : {}),
        ...(sandbox !== undefined ? { sandbox } : {}),
        ...(description ? { description } : {}),
        ...(readOnly !== undefined ? { read_only: readOnly } : {})
      };
    }

    // Handle file edit tool
    case jI.name: {
      // Parse input according to the file edit schema
      const parsedInput = jI.inputSchema.parse(toolInput);
      // Transform the input using processFileEdits(likely normalizes edit operations)
      const {
        file_path: normalizedFilePath,
        edits: normalizedEdits
      } = processFileEdits({
        file_path: parsedInput.file_path,
        edits: [{
          old_string: parsedInput.old_string,
          new_string: parsedInput.new_string,
          replace_all: parsedInput.replace_all
        }]
      });

      // Return the normalized edit operation
      return {
        replace_all: normalizedEdits[0].replace_all,
        file_path: normalizedFilePath,
        old_string: normalizedEdits[0].old_string,
        new_string: normalizedEdits[0].new_string
      };
    }

    // Handle generic tool with direct schema mapping
    case C$.name: {
      const parsedInput = C$.inputSchema.parse(toolInput);
      return processFileEdits(parsedInput);
    }

    // Default: return input as-is
    default:
      return toolInput;
  }
}

module.exports = parseToolInputBySchema;
