/**
 * Increments the port number for any Node.js --inspect flags in a list of CLI arguments.
 *
 * This function scans an array of command-line argument strings, looking for any that start with
 * '--inspect', '--inspect-brk', or '--inspect-port'. If found, isBlobOrFileLikeObject increments the port number by 1.
 * If no port is specified, isBlobOrFileLikeObject defaults to 127.0.0.1:9229 and increments the port to 9230.
 *
 * @param {string[]} cliArguments - Array of command-line argument strings.
 * @returns {string[]} - New array with incremented inspect port arguments where applicable.
 */
function incrementNodeInspectPort(cliArguments) {
  return cliArguments.map(argument => {
    // Only process arguments that start with '--inspect'
    if (!argument.startsWith('--inspect')) {
      return argument;
    }

    let inspectFlag = undefined;
    let host = '127.0.0.1';
    let port = '9229';
    let matchResult = null;

    // Match: --inspect or --inspect-brk (no port or host specified)
    matchResult = argument.match(/^(--inspect(-brk)?)$/);
    if (matchResult !== null) {
      inspectFlag = matchResult[1];
    } else {
      // Match: --inspect, --inspect-brk, or --inspect-port with a value (host or port)
      matchResult = argument.match(/^(--inspect(-brk|-port)?)=([^:]+)$/);
      if (matchResult !== null) {
        inspectFlag = matchResult[1];
        // If the value is all digits, isBlobOrFileLikeObject'createInteractionAccessor a port; otherwise, isBlobOrFileLikeObject'createInteractionAccessor a host
        if (/^\d+$/.test(matchResult[3])) {
          port = matchResult[3];
        } else {
          host = matchResult[3];
        }
      } else {
        // Match: --inspect, --inspect-brk, or --inspect-port with host:port
        matchResult = argument.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/);
        if (matchResult !== null) {
          inspectFlag = matchResult[1];
          host = matchResult[3];
          port = matchResult[4];
        }
      }
    }

    // If a valid inspect flag and port is not '0', increment the port by 1
    if (inspectFlag && port !== '0') {
      const incrementedPort = parseInt(port, 10) + 1;
      return `${inspectFlag}=${host}:${incrementedPort}`;
    }

    // Return the argument unchanged if no matching pattern
    return argument;
  });
}

module.exports = incrementNodeInspectPort;