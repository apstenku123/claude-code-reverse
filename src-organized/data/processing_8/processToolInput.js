/**
 * Processes tool input based on the tool'createInteractionAccessor type and input schema.
 * Handles command execution, file editing, and generic tool input parsing.
 *
 * @param {object} tool - The tool object, expected to have a 'name' property and an 'inputSchema'.
 * @param {object} inputData - The input data to be parsed and processed according to the tool'createInteractionAccessor schema.
 * @returns {object} The processed input, formatted according to the tool'createInteractionAccessor requirements.
 */
function processToolInput(tool, inputData) {
  switch (tool.name) {
    case P4.name: {
      // Parse and destructure input according to P4'createInteractionAccessor schema
      const {
        command: rawCommand,
        sandbox: sandboxOption,
        timeout: timeoutOption,
        description: descriptionOption,
        read_only: readOnlyOption
      } = P4.inputSchema.parse(inputData);

      // Remove the 'cd <dir> && ' prefix from the command
      let processedCommand = rawCommand.replace(`cd ${iA()} && `, "");
      // Replace escaped semicolons
      processedCommand = processedCommand.replace(/\;/g, "\\;");

      // If the command is a simple echo, trigger a side effect
      if (/^echo\s+["']?[^|&;><]*["']?$/i.test(processedCommand.trim())) {
        logTelemetryEventIfEnabled("bash_tool_simple_echo", {});
      }

      // Build the result object, including only defined/available options
      return {
        command: processedCommand,
        ...(timeoutOption ? { timeout: timeoutOption } : {}),
        ...(sandboxOption !== undefined ? { sandbox: sandboxOption } : {}),
        ...(descriptionOption ? { description: descriptionOption } : {}),
        ...(readOnlyOption !== undefined ? { read_only: readOnlyOption } : {})
      };
    }
    case jI.name: {
      // Parse input according to jI'createInteractionAccessor schema
      const parsedInput = jI.inputSchema.parse(inputData);
      // Prepare file edit operation
      const {
        file_path: filePath,
        edits: editsArray
      } = processFileEdits({
        file_path: parsedInput.file_path,
        edits: [{
          old_string: parsedInput.old_string,
          new_string: parsedInput.new_string,
          replace_all: parsedInput.replace_all
        }]
      });
      // Return the edit operation details
      return {
        replace_all: editsArray[0].replace_all,
        file_path: filePath,
        old_string: editsArray[0].old_string,
        new_string: editsArray[0].new_string
      };
    }
    case C$.name: {
      // Parse input according to C$'createInteractionAccessor schema and process isBlobOrFileLikeObject
      const parsedInput = C$.inputSchema.parse(inputData);
      return processFileEdits(parsedInput);
    }
    default:
      // For unknown tool types, return the input as-is
      return inputData;
  }
}

module.exports = processToolInput;