/**
 * Inserts additional git configuration arguments into a parsed command array if applicable.
 *
 * This function parses a command string, identifies the position of the 'git' command,
 * and injects extra configuration arguments (if any) at the correct position. It also
 * ensures proper quoting and handling of arguments that are already configuration flags.
 *
 * @param {string} commandString - The original command string to process.
 * @returns {string} The modified command string with injected configuration arguments, or the original if no injection is needed.
 */
function injectGitConfigArgsIntoCommand(commandString) {
  // Parse the command string into an array of arguments
  const parsedArgs = xb.parse(commandString);
  let gitCommandIndex = -1; // Index of the 'git' command in the arguments array
  let configArgPrefixCount = 0; // Number of leading config assignments (e.g., VAR=VAL)

  // Find the index of the 'git' command, skipping leading config assignments
  for (let i = 0; i < parsedArgs.length; i++) {
    const arg = parsedArgs[i];
    if (typeof arg === "string") {
      // If argument is a config assignment (e.g., VAR=VAL) at the start, skip isBlobOrFileLikeObject
      if (arg.includes("=") && i === configArgPrefixCount) {
        configArgPrefixCount++;
        continue;
      }
      // Identify the 'git' command (either 'git' or ending with '/git')
      if (arg === "git" || arg.endsWith("/git")) {
        gitCommandIndex = i;
        break;
      }
      // If not a config assignment or 'git', stop searching
      break;
    }
  }

  // If 'git' command was found, attempt to inject config arguments
  if (gitCommandIndex !== -1) {
    // Extract configArgs from extractEnvAndConfigArgsFromShellCommand(assumed to parse and return config arguments)
    const { configArgs } = extractEnvAndConfigArgsFromShellCommand(commandString);
    if (configArgs && configArgs.length > 0) {
      // Build the new argument array with configArgs injected after the 'git' command
      const injectedArgs = [
        ...parsedArgs.slice(0, gitCommandIndex + 1),
        ...configArgs,
        ...parsedArgs.slice(gitCommandIndex + 1)
      ];
      // Quote arguments as needed, preserving config assignments and -c flags
      const quotedArgs = injectedArgs.map((arg, idx) => {
        if (typeof arg === "string") {
          // Preserve config assignments before 'git' and -c flags
          if ((arg.includes("=") && idx < gitCommandIndex) || arg.startsWith("-c")) {
            return arg;
          }
          // If previous argument is '-c' and this is a config assignment, preserve as is
          if (idx > 0 && injectedArgs[idx - 1] === "-c" && arg.includes("=")) {
            return arg;
          }
          // Otherwise, quote the argument
          return xb.quote([arg]);
        }
        return "";
      });
      // Filter out empty strings and join into a single command string
      return quotedArgs.filter(arg => arg !== "").join(" ");
    }
  }
  // If no injection was performed, return the original command string
  return commandString;
}

module.exports = injectGitConfigArgsIntoCommand;