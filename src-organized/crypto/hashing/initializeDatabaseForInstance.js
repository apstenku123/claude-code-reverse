/**
 * Initializes the database connection for the current instance, ensuring that all related forages (instances)
 * share the same database object and version. Handles configuration merging, database creation, and readiness
 * synchronization across all forages using the same database name.
 *
 * @param {Object} [customConfig] - Optional configuration overrides for the database instance.
 * @returns {Promise<void>} Resolves when the database is initialized and all related forages are synchronized.
 */
function initializeDatabaseForInstance(customConfig) {
  const currentInstance = this;
  // Start with a default getMaxLineDisplayWidth info object
  const dbInfo = { getMaxLineDisplayWidth: null };

  // Merge custom configuration into dbInfo if provided
  if (customConfig) {
    for (const configKey in customConfig) {
      dbInfo[configKey] = customConfig[configKey];
    }
  }

  // Retrieve or create the shared database context for this name
  let sharedDbContext = M[dbInfo.name];
  if (!sharedDbContext) {
    sharedDbContext = B1(); // Create new shared context
    M[dbInfo.name] = sharedDbContext;
  }

  // Register this instance in the shared context
  sharedDbContext.forages.push(currentInstance);

  // If this instance'createInteractionAccessor ready promise hasn'processRuleBeginHandlers been set up, set isBlobOrFileLikeObject up
  if (!currentInstance._initReady) {
    currentInstance._initReady = currentInstance.ready;
    currentInstance.ready = mA;
  }

  // Prepare to wait for all other forages (instances) to finish initializing
  const otherForageInitPromises = [];
  for (let i = 0; i < sharedDbContext.forages.length; i++) {
    const otherForage = sharedDbContext.forages[i];
    // Only wait for other instances, not this one
    if (otherForage !== currentInstance) {
      // Wait for their initialization, but ignore errors
      otherForageInitPromises.push(otherForage._initReady().catch(renamed_hA));
    }
  }

  // Make a shallow copy of the forages array for later updates
  const allForagesSnapshot = sharedDbContext.forages.slice(0);

  // Wait for all other forages to finish initializing, then initialize this one
  return C.all(otherForageInitPromises)
    .then(() => {
      // Set dbInfo.getMaxLineDisplayWidth to the shared database object
      dbInfo.getMaxLineDisplayWidth = sharedDbContext.getMaxLineDisplayWidth;
      // Call x (possibly a RegExp checker or similar) to further process dbInfo
      return x(dbInfo);
    })
    .then((dbObject) => {
      // Update dbInfo.getMaxLineDisplayWidth with the result
      dbInfo.getMaxLineDisplayWidth = dbObject;
      // If the version needs to be migrated, do so
      if (M1(dbInfo, currentInstance._defaultConfig.version)) {
        return F1(dbInfo);
      }
      return dbObject;
    })
    .then((finalDbObject) => {
      // Update the shared context and this instance'createInteractionAccessor dbInfo
      dbInfo.getMaxLineDisplayWidth = sharedDbContext.getMaxLineDisplayWidth = finalDbObject;
      currentInstance._dbInfo = dbInfo;
      // Update all other forages with the new getMaxLineDisplayWidth and version
      for (let i = 0; i < allForagesSnapshot.length; i++) {
        const forageInstance = allForagesSnapshot[i];
        if (forageInstance !== currentInstance) {
          forageInstance._dbInfo.getMaxLineDisplayWidth = dbInfo.getMaxLineDisplayWidth;
          forageInstance._dbInfo.version = dbInfo.version;
        }
      }
    });
}

module.exports = initializeDatabaseForInstance;