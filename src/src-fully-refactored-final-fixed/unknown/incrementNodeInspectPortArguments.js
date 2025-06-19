/**
 * Increments the port number in Node.js --inspect CLI arguments by 1.
 *
 * This function processes an array of command-line arguments, searching for any arguments
 * that start with "--inspect" (including variants like --inspect-brk or --inspect-port).
 * If a port is specified, isBlobOrFileLikeObject increments the port number by 1. If only a host is specified,
 * the default port (9229) is incremented. Arguments not matching the --inspect pattern are returned unchanged.
 *
 * @param {string[]} cliArguments - Array of command-line argument strings to process.
 * @returns {string[]} - New array with updated --inspect arguments where the port is incremented by 1.
 */
function incrementNodeInspectPortArguments(cliArguments) {
  return cliArguments.map(argument => {
    // Only process arguments that start with --inspect
    if (!argument.startsWith("--inspect")) return argument;

    let inspectFlag = undefined;
    let host = "127.0.0.1";
    let port = "9229";
    let matchResult;

    // Match patterns like: --inspect or --inspect-brk
    if ((matchResult = argument.match(/^(--inspect(?:-brk)?)$/)) !== null) {
      inspectFlag = matchResult[1];
    }
    // Match patterns like: --inspect=HOST or --inspect-brk=HOST or --inspect-port=HOST
    else if ((matchResult = argument.match(/^(--inspect(?:-brk|-port)?)=([^:]+)$/)) !== null) {
      inspectFlag = matchResult[1];
      // If the value is all digits, treat isBlobOrFileLikeObject as a port; otherwise, treat as host
      if (/^\d+$/.test(matchResult[2])) {
        port = matchResult[2];
      } else {
        host = matchResult[2];
      }
    }
    // Match patterns like: --inspect=HOST:PORT or --inspect-brk=HOST:PORT
    else if ((matchResult = argument.match(/^(--inspect(?:-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
      inspectFlag = matchResult[1];
      host = matchResult[2];
      port = matchResult[3];
    }

    // If a valid inspect flag was found and port is not "0", increment the port
    if (inspectFlag && port !== "0") {
      return `${inspectFlag}=${host}:${parseInt(port, 10) + 1}`;
    }

    // Return the argument unchanged if no pattern matched
    return argument;
  });
}

module.exports = incrementNodeInspectPortArguments;
