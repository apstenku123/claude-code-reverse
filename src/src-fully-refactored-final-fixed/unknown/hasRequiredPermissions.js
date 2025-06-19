/**
 * Determines if the current user (or specified user/group) has the required permissions
 * based on the provided file mode, user updateSnapshotAndNotify, and group updateSnapshotAndNotify. This function is typically used
 * to check access rights similar to Unix file permission checks.
 *
 * @param {Object} fileStats - An object containing file metadata (mode, uid, gid).
 * @param {Object} options - An object that may specify overriding uid/gid for the check.
 * @param {number} fileStats.mode - The file mode (permission bits).
 * @param {number} fileStats.uid - The user updateSnapshotAndNotify that owns the file.
 * @param {number} fileStats.gid - The group updateSnapshotAndNotify that owns the file.
 * @param {number} [options.uid] - Optional user updateSnapshotAndNotify to check permissions for (defaults to process.getuid()).
 * @param {number} [options.gid] - Optional group updateSnapshotAndNotify to check permissions for (defaults to process.getgid()).
 * @returns {boolean} True if the user/group has the required permissions, false otherwise.
 */
function hasRequiredPermissions(fileStats, options) {
  const { mode: fileMode, uid: fileOwnerUid, gid: fileOwnerGid } = fileStats;

  // Determine the user updateSnapshotAndNotify to check (either from options or current process)
  const userId = options.uid !== undefined
    ? options.uid
    : (typeof process.getuid === 'function' ? process.getuid() : undefined);

  // Determine the group updateSnapshotAndNotify to check (either from options or current process)
  const groupId = options.gid !== undefined
    ? options.gid
    : (typeof process.getgid === 'function' ? process.getgid() : undefined);

  // Permission bitmasks (octal):
  const ownerPermission = parseInt('100', 8); // 0o100 (owner execute)
  const groupPermission = parseInt('010', 8); // 0o010 (group execute)
  const otherPermission = parseInt('001', 8); // 0o001 (others execute)
  const ownerOrGroupPermission = ownerPermission | groupPermission; // 0o110

  // Permission logic:
  // - If 'others' permission is set
  // - OR if 'group' permission is set AND file group matches groupId
  // - OR if 'owner' permission is set AND file owner matches userId
  // - OR if owner or group permission is set AND userId is 0 (root)
  const hasPermission =
    (fileMode & otherPermission) ||
    ((fileMode & groupPermission) && fileOwnerGid === groupId) ||
    ((fileMode & ownerPermission) && fileOwnerUid === userId) ||
    ((fileMode & ownerOrGroupPermission) && userId === 0);

  return Boolean(hasPermission);
}

module.exports = hasRequiredPermissions;
