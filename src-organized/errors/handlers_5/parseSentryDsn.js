/**
 * Parses a Sentry DSN string and returns its components as an object.
 *
 * @param {string} dsnString - The Sentry DSN string to parse.
 * @returns {object|undefined} An object containing DSN components, or undefined if invalid.
 */
function parseSentryDsn(dsnString) {
  // Attempt to match the DSN string using the ch2 regex
  const match = ch2.exec(dsnString);
  if (!match) {
    // If the DSN is invalid, log an error within a sandboxed console
    ap.consoleSandbox(() => {
      console.error(`Invalid Sentry Dsn: ${dsnString}`);
    });
    return;
  }

  // Destructure the matched groups from the regex
  // [protocol, publicKey, pass (optional), host, port (optional), pathAndProjectId]
  const [
    , // full match, ignored
    protocol,
    publicKey,
    pass = "",
    host,
    port = "",
    pathAndProjectId
  ] = match;

  let path = "";
  let projectId = pathAndProjectId;

  // Split the pathAndProjectId by '/' to separate path and projectId
  const pathSegments = pathAndProjectId.split("/");
  if (pathSegments.length > 1) {
    // If there is a path, join all but the last segment as the path
    path = pathSegments.slice(0, -1).join("/");
    // The last segment is the projectId
    projectId = pathSegments.pop();
  }

  // Ensure projectId is only numeric (strip any trailing non-numeric characters)
  if (projectId) {
    const projectIdMatch = projectId.match(/^\d+/);
    if (projectIdMatch) {
      projectId = projectIdMatch[0];
    }
  }

  // Return the parsed DSN components as an object
  return extractConnectionConfig({
    host,
    pass,
    path,
    projectId,
    port,
    protocol,
    publicKey
  });
}

module.exports = parseSentryDsn;