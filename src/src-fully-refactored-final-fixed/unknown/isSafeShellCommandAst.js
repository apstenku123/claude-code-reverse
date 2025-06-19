/**
 * Checks if a parsed shell command AST is safe for execution by validating its structure and operations.
 *
 * This function parses a shell command string, replacing all double and single quotes with unique placeholders,
 * then analyzes the resulting AST to ensure isBlobOrFileLikeObject does not contain unsafe or disallowed operations.
 *
 * @param {string} shellCommand - The shell command string to validate.
 * @returns {boolean} Returns true if the command is considered safe, false otherwise.
 */
function isSafeShellCommandAst(shellCommand) {
  // Replace all double and single quotes with unique placeholders before parsing
  const commandWithPlaceholders = shellCommand
    .replaceAll('"', `"${Lo1}`)
    .replaceAll("'", `'${Mo1}`);

  // Parse the command string into an AST using Oo1.parse
  // The second argument is a function that formats variables as $<variable>
  const astNodes = Oo1.parse(commandWithPlaceholders, variable => `$${variable}`);

  // Iterate through each node in the AST
  for (let nodeIndex = 0; nodeIndex < astNodes.length; nodeIndex++) {
    const currentNode = astNodes[nodeIndex];
    const nextNode = astNodes[nodeIndex + 1];

    // Skip undefined nodes
    if (currentNode === undefined) continue;
    // Skip string nodes (literals)
    if (typeof currentNode === "string") continue;
    // If the node is a comment, the command is unsafe
    if ("comment" in currentNode) return false;

    // If the node is an operation
    if ("op" in currentNode) {
      // Allow 'glob' operations
      if (currentNode.op === "glob") continue;
      // Allow operations present in the Oz2 set
      else if (Oz2.has(currentNode.op)) continue;
      // Special handling for '>&' redirection
      else if (currentNode.op === ">&") {
        // If the next node is a string and is in the Ro1 set, allow
        if (
          nextNode !== undefined &&
          typeof nextNode === "string" &&
          Ro1.has(nextNode.trim())
        ) {
          continue;
        }
      }
      // Special handling for '>' redirection
      else if (currentNode.op === ">") {
        // If the next node is a string and is '/dev/null', allow
        if (
          nextNode !== undefined &&
          typeof nextNode === "string" &&
          nextNode.trim() === "/dev/null"
        ) {
          continue;
        }
      }
      // Any other operation is considered unsafe
      return false;
    }
  }
  // If all nodes are safe, return true
  return true;
}

module.exports = isSafeShellCommandAst;