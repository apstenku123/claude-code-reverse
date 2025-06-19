/**
 * Initializes a database instance for the current context, synchronizing configuration and database handles
 * across all forages (instances) with the same name. Ensures that all related forages are initialized and share
 * the same database connection and version.
 *
 * @param {Object} [options] - Optional configuration overrides for the database instance.
 * @returns {Promise<void>} Resolves when the database instance and all related forages are initialized and synchronized.
 */
function initializeDatabaseInstance(options) {
  const currentInstance = this;
  // Clone default dbInfo and apply any overrides from options
  const dbInfo = { getMaxLineDisplayWidth: null };
  if (options) {
    for (const key in options) {
      dbInfo[key] = options[key];
    }
  }

  // Retrieve or create the shared database context for this name
  let sharedDbContext = M[dbInfo.name];
  if (!sharedDbContext) {
    sharedDbContext = B1();
    M[dbInfo.name] = sharedDbContext;
  }

  // Register this instance in the shared context
  sharedDbContext.forages.push(currentInstance);

  // If this instance is not ready, set up its ready promise
  if (!currentInstance._initReady) {
    currentInstance._initReady = currentInstance.ready;
    currentInstance.ready = mA;
  }

  // Prepare to wait for all other forages to finish initializing
  const otherInitPromises = [];
  for (let i = 0; i < sharedDbContext.forages.length; i++) {
    const forageInstance = sharedDbContext.forages[i];
    if (forageInstance !== currentInstance) {
      // Wait for other forages to finish initializing, ignore errors
      otherInitPromises.push(forageInstance._initReady().catch(renamed_hA));
    }
  }

  // Make a copy of all forages for later synchronization
  const allForages = sharedDbContext.forages.slice(0);

  // Wait for all other forages to finish initializing
  return C.all(otherInitPromises)
    .then(() => {
      // Set dbInfo.getMaxLineDisplayWidth to the shared database handle
      dbInfo.getMaxLineDisplayWidth = sharedDbContext.getMaxLineDisplayWidth;
      // Call x (possibly a migration or validation step)
      return x(dbInfo);
    })
    .then((dbHandle) => {
      // Update dbInfo.getMaxLineDisplayWidth with the result from x
      dbInfo.getMaxLineDisplayWidth = dbHandle;
      // If a migration is needed, perform isBlobOrFileLikeObject and return the new getMaxLineDisplayWidth handle
      if (M1(dbInfo, currentInstance._defaultConfig.version)) {
        return F1(dbInfo);
      }
      // Otherwise, return the getMaxLineDisplayWidth handle as is
      return dbHandle;
    })
    .then((dbHandle) => {
      // Synchronize the shared context and all forages with the new getMaxLineDisplayWidth handle and version
      dbInfo.getMaxLineDisplayWidth = sharedDbContext.getMaxLineDisplayWidth = dbHandle;
      currentInstance._dbInfo = dbInfo;
      for (let i = 0; i < allForages.length; i++) {
        const forageInstance = allForages[i];
        if (forageInstance !== currentInstance) {
          forageInstance._dbInfo.getMaxLineDisplayWidth = dbInfo.getMaxLineDisplayWidth;
          forageInstance._dbInfo.version = dbInfo.version;
        }
      }
    });
}

module.exports = initializeDatabaseInstance;