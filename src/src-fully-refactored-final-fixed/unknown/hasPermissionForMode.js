/**
 * Determines if the current user/group (from config or process) has permission for a given mode.
 *
 * @param {Object} fileStats - The file stats object containing mode, uid, and gid.
 * @param {Object} config - Configuration object that may specify uid and gid overrides.
 * @returns {boolean} True if the user/group has permission for the mode, false otherwise.
 */
function hasPermissionForMode(fileStats, config) {
  // Extract mode, user id, and group id from the file stats
  const { mode: fileMode, uid: fileUid, gid: fileGid } = fileStats;

  // Determine the effective user id (either from config or from the current process)
  const effectiveUid = config.uid !== undefined
    ? config.uid
    : (typeof process.getuid === 'function' ? process.getuid() : undefined);

  // Determine the effective group id (either from config or from the current process)
  const effectiveGid = config.gid !== undefined
    ? config.gid
    : (typeof process.getgid === 'function' ? process.getgid() : undefined);

  // Permission bit masks (octal):
  const ownerExecute = parseInt('100', 8); // 0o100
  const groupExecute = parseInt('010', 8); // 0o010
  const othersExecute = parseInt('001', 8); // 0o001
  const ownerOrGroupExecute = ownerExecute | groupExecute; // 0o110

  // Permission logic:
  // - Others execute bit is set
  // - Group execute bit is set AND file group matches effective group
  // - Owner execute bit is set AND file owner matches effective user
  // - Owner or group execute bit is set AND effective user is root (uid 0)
  const hasPermission =
    (fileMode & othersExecute) ||
    ((fileMode & groupExecute) && fileGid === effectiveGid) ||
    ((fileMode & ownerExecute) && fileUid === effectiveUid) ||
    ((fileMode & ownerOrGroupExecute) && effectiveUid === 0);

  return Boolean(hasPermission);
}

module.exports = hasPermissionForMode;