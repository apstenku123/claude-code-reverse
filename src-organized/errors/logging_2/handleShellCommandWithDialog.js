/**
 * Handles the execution of a shell command, allowing for dialog-based interruption or backgrounding.
 * Waits for either the shell command to complete or a dialog result (such as 'background' or 'kill').
 * If the dialog result is 'background', moves the command to the background and returns a message.
 * If the dialog result is 'kill', kills the command and returns its result.
 * Otherwise, returns the shell command'createInteractionAccessor result.
 *
 * @param {Object} params - The parameters for command execution and dialog handling.
 * @param {Object} params.shellCommand - The shell command object, expected to have a 'result' Promise and optional 'kill' method.
 * @param {Object} params.input - The input object, expected to have a 'command' property (used for backgrounding).
 * @param {Promise<string>} params.dialogResultPromise - a promise that resolves to a dialog result string (e.g., 'background', 'kill').
 * @param {Function|null} params.setToolJSX - Optional function to update UI state; called with null when backgrounding.
 * @returns {Promise<Object>} Resolves with the result of the shell command or a backgrounding message object.
 */
async function handleShellCommandWithDialog({
  shellCommand,
  input,
  dialogResultPromise,
  setToolJSX
}) {
  const shellCommandResultPromise = shellCommand.result;

  // Wait for either the shell command to finish or the dialog result to resolve
  return Promise.race([
    shellCommandResultPromise,
    dialogResultPromise.then(async dialogResult => {
      if (dialogResult === "background" && shellCommand) {
        // Move the command to the background
        const shellId = aw.moveToBackground(input.command, shellCommand);
        // Optionally reset the UI state
        if (setToolJSX) setToolJSX(null);
        return {
          stdout: `Command running in background (shell updateSnapshotAndNotify: ${shellId})`,
          stderr: "",
          code: 0,
          interrupted: false
        };
      } else if (dialogResult === "kill") {
        // Kill the shell command if possible, then return its result
        shellCommand?.kill();
        return await shellCommandResultPromise;
      } else {
        // For any other dialog result, just return the shell command'createInteractionAccessor result
        return await shellCommandResultPromise;
      }
    })
  ]);
}

module.exports = handleShellCommandWithDialog;