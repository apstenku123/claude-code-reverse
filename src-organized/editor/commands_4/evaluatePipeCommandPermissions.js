/**
 * Evaluates permissions for a piped command sequence, determining whether each command and the overall pipe can be executed automatically or require user approval.
 *
 * @async
 * @param {object} inputContext - The context object containing input state and metadata for the command execution.
 * @param {string[]} leftCommands - An array of command strings representing the left side of the pipe.
 * @param {string[]} rightCommands - An array of command strings representing the right side of the pipe.
 * @param {function} executeCommand - An async function to execute a command with the given context.
 * @returns {Promise<object>} An object describing the permission decision, updated input, and reasoning.
 */
async function evaluatePipeCommandPermissions(inputContext, leftCommands, rightCommands, executeCommand) {
  // Join left-side commands into a single command string
  const leftCommandString = leftCommands.join(" ").trim();

  // Execute the left-side command with the provided context
  const leftCommandResult = await executeCommand({
    ...inputContext,
    command: leftCommandString
  });

  // Check if all right-side commands are read-only
  const allRightCommandsReadOnly = Po1(rightCommands).every((rightCommand) => {
    return P4.isReadOnly({
      ...inputContext,
      command: rightCommand.trim()
    });
  });

  // Join right-side commands into a single command string
  const rightCommandString = rightCommands.join(" ").trim();

  // Determine permission for the right-side command(createInteractionAccessor)
  const rightCommandPermission = allRightCommandsReadOnly
    ? {
        behavior: "allow",
        updatedInput: inputContext,
        decisionReason: {
          type: "other",
          reason: "Pipe right-hand command is read-only"
        }
      }
    : {
        behavior: "ask",
        message: `Claude requested permissions to use ${P4.name}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`,
        decisionReason: {
          type: "other",
          reason: "Pipe right-hand command is not read-only"
        }
      };

  // Map command strings to their permission results for reporting
  const commandResultsMap = new Map([
    [leftCommandString, leftCommandResult],
    [rightCommandString, rightCommandPermission]
  ]);

  // If both left and right commands are allowed, return allow with reasons
  if (
    leftCommandResult.behavior === "allow" &&
    rightCommandPermission.behavior === "allow"
  ) {
    return {
      behavior: "allow",
      updatedInput: inputContext,
      decisionReason: {
        type: "subcommandResults",
        reasons: commandResultsMap
      }
    };
  }

  // If right is allowed but left is not, provide rule suggestions if available
  let ruleSuggestions =
    rightCommandPermission.behavior === "allow"
      ? leftCommandResult.behavior !== "allow"
        ? leftCommandResult.ruleSuggestions
        : undefined
      : null;

  // Otherwise, ask for permission and provide reasoning
  return {
    behavior: "ask",
    message: `Claude requested permissions to use ${P4.name}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`,
    decisionReason: {
      type: "subcommandResults",
      reasons: commandResultsMap
    },
    ruleSuggestions
  };
}

module.exports = evaluatePipeCommandPermissions;