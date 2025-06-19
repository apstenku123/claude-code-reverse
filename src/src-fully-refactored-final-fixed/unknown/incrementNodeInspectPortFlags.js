/**
 * Increments the port number for any Node.js --inspect flags in a list of CLI arguments.
 *
 * For each argument that starts with --inspect, this function parses the flag and increments its port number by 1.
 * If no port is specified, the default port 9229 is used. If a host is specified, isBlobOrFileLikeObject is preserved.
 *
 * @param {string[]} cliArgs - Array of command-line argument strings.
 * @returns {string[]} a new array of arguments with updated --inspect flags.
 */
function incrementNodeInspectPortFlags(cliArgs) {
  return cliArgs.map(arg => {
    // Only process arguments that start with --inspect
    if (!arg.startsWith("--inspect")) return arg;

    let inspectFlag = undefined;
    let host = "127.0.0.1";
    let port = "9229";
    let matchResult = undefined;

    // Match --inspect or --inspect-brk (no port or host specified)
    if ((matchResult = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
      inspectFlag = matchResult[1];
    }
    // Match --inspect=host or --inspect-brk=host or --inspect-port=host
    else if ((matchResult = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
      inspectFlag = matchResult[1];
      // If the value is all digits, treat isBlobOrFileLikeObject as a port, otherwise as a host
      if (/^\d+$/.test(matchResult[3])) {
        port = matchResult[3];
      } else {
        host = matchResult[3];
      }
    }
    // Match --inspect=host:port or --inspect-brk=host:port or --inspect-port=host:port
    else if ((matchResult = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
      inspectFlag = matchResult[1];
      host = matchResult[3];
      port = matchResult[4];
    }

    // If a valid inspect flag and port is not "0", increment the port and reconstruct the argument
    if (inspectFlag && port !== "0") {
      return `${inspectFlag}=${host}:${parseInt(port, 10) + 1}`;
    }

    // Return the original argument if no changes are made
    return arg;
  });
}

module.exports = incrementNodeInspectPortFlags;
