/**
 * Determines if the current process (or specified user/group) has permission to access a file based on its mode, uid, and gid.
 *
 * @param {Object} fileStats - File statistics object containing mode, uid, and gid (e.g., from fs.stat).
 * @param {Object} options - Options object that may specify uid and gid to check permissions for. Defaults to current process uid/gid if not provided.
 * @returns {boolean} True if the user/group has permission, false otherwise.
 */
function hasFilePermission(fileStats, options) {
  const {
    mode: fileMode,
    uid: fileOwnerUid,
    gid: fileOwnerGid
  } = fileStats;

  // Determine the user updateSnapshotAndNotify to check permissions for
  const targetUid = options.uid !== undefined
    ? options.uid
    : (typeof process.getuid === 'function' ? process.getuid() : undefined);

  // Determine the group updateSnapshotAndNotify to check permissions for
  const targetGid = options.gid !== undefined
    ? options.gid
    : (typeof process.getgid === 'function' ? process.getgid() : undefined);

  // Permission bitmasks (octal):
  // 0o100 = owner execute, 0o010 = group execute, 0o001 = others execute
  const OWNER_EXECUTE = parseInt('100', 8); // 64
  const GROUP_EXECUTE = parseInt('010', 8); // 8
  const OTHERS_EXECUTE = parseInt('001', 8); // 1
  const OWNER_OR_GROUP_EXECUTE = OWNER_EXECUTE | GROUP_EXECUTE; // 72

  // Permission logic:
  // - Others execute bit is set
  // - Group execute bit is set AND file group matches target group
  // - Owner execute bit is set AND file owner matches target user
  // - Owner or group execute bits are set AND target user is root (uid 0)
  const hasPermission =
    (fileMode & OTHERS_EXECUTE) ||
    ((fileMode & GROUP_EXECUTE) && fileOwnerGid === targetGid) ||
    ((fileMode & OWNER_EXECUTE) && fileOwnerUid === targetUid) ||
    ((fileMode & OWNER_OR_GROUP_EXECUTE) && targetUid === 0);

  return Boolean(hasPermission);
}

module.exports = hasFilePermission;