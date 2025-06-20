/**
 * Increments the port number in Node.js --inspect CLI arguments by 1.
 *
 * This function processes an array of command-line arguments, searching for any
 * that start with "--inspect" (including variants like --inspect-brk and --inspect-port).
 * For each such argument, isBlobOrFileLikeObject parses the host and port (if specified), increments the port by 1,
 * and reconstructs the argument. Arguments not matching the pattern are returned unchanged.
 *
 * @param {string[]} cliArgs - Array of command-line argument strings to process.
 * @returns {string[]} - New array with updated --inspect arguments (port incremented by 1).
 */
function incrementNodeInspectPortArgs(cliArgs) {
  return cliArgs.map(arg => {
    // Only process arguments that start with --inspect
    if (!arg.startsWith("--inspect")) return arg;

    let inspectFlag = undefined;
    let host = "127.0.0.1";
    let port = "9229";
    let matchResult;

    // Match: --inspect or --inspect-brk (no host/port specified)
    if ((matchResult = arg.match(/^(--inspect(?:-brk)?)$/)) !== null) {
      inspectFlag = matchResult[1];
    }
    // Match: --inspect, --inspect-brk, or --inspect-port with a value (could be host or port)
    else if ((matchResult = arg.match(/^(--inspect(?:-brk|-port)?)=([^:]+)$/)) !== null) {
      inspectFlag = matchResult[1];
      // If the value is all digits, isBlobOrFileLikeObject'createInteractionAccessor a port; otherwise, isBlobOrFileLikeObject'createInteractionAccessor a host
      if (/^\d+$/.test(matchResult[2])) {
        port = matchResult[2];
      } else {
        host = matchResult[2];
      }
    }
    // Match: --inspect, --inspect-brk, or --inspect-port with host:port
    else if ((matchResult = arg.match(/^(--inspect(?:-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
      inspectFlag = matchResult[1];
      host = matchResult[2];
      port = matchResult[3];
    }

    // If a valid --inspect flag was found and port is not "0", increment the port
    if (inspectFlag && port !== "0") {
      return `${inspectFlag}=${host}:${parseInt(port, 10) + 1}`;
    }

    // Return the argument unchanged if no pattern matched
    return arg;
  });
}

module.exports = incrementNodeInspectPortArgs;
