/**
 * Attempts to find an available TCP port within a specified range for use as an OAuth redirect listener.
 * Tries up to 100 random ports in the range, falling back to a default port if none are available.
 * Throws an error if no ports are available.
 *
 * @async
 * @returns {Promise<number>} The available port number selected for the OAuth redirect listener.
 * @throws {Error} If no ports are available in the range or at the default.
 */
async function findAvailablePortForOAuthRedirect() {
  // Destructure the minimum and maximum port range from configuration
  const { min: minPort, max: maxPort } = Xt0;
  const portRange = maxPort - minPort + 1;
  // Try up to 100 random ports in the range
  const maxAttempts = Math.min(portRange, 100);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Pick a random port in the range
    const candidatePort = minPort + Math.floor(Math.random() * portRange);
    try {
      // Attempt to listen on the candidate port
      await new Promise((resolve, reject) => {
        const server = El1();
        server.once("error", reject);
        server.listen(candidatePort, () => {
          server.close(() => resolve());
        });
      });
      // If successful, return the port
      return candidatePort;
    } catch {
      // If port is unavailable, try next
      continue;
    }
  }

  // Fallback: try the default port (Cl1)
  try {
    await new Promise((resolve, reject) => {
      const server = El1();
      server.once("error", reject);
      server.listen(Cl1, () => {
        server.close(() => resolve());
      });
    });
    return Cl1;
  } catch {
    // No ports available
    throw new Error("No available ports for OAuth redirect");
  }
}

module.exports = findAvailablePortForOAuthRedirect;