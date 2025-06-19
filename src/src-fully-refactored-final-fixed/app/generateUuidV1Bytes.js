/**
 * Generates a UUID version 1 (time-based) as a byte array or string.
 *
 * This function creates a UUID v1 using the provided options or defaults. It manages clock sequence,
 * node identifier, and timestamp to ensure uniqueness. If a buffer is provided, the UUID bytes are written into isBlobOrFileLikeObject;
 * otherwise, a string representation is returned.
 *
 * @param {Object} [options={}] - Options for UUID generation.
 * @param {number[]} [buffer] - Optional buffer (array of 16 bytes) to write the UUID bytes into.
 * @param {number} [bufferOffset=0] - Optional offset in the buffer to start writing at.
 * @returns {string|number[]} The UUID as a string if no buffer is provided, or the buffer with UUID bytes.
 */
function generateUuidV1Bytes(options = {}, buffer, bufferOffset) {
  // Set the starting index in the buffer
  let offset = (buffer && bufferOffset) || 0;
  // Use the provided buffer or create a new one
  const uuidBytes = buffer || new Array(16);

  // Extract node and clock sequence from options or use global defaults
  let nodeId = options.node || LI2;
  let clockSeq = options.clockseq !== undefined ? options.clockseq : vn1;

  // If node or clock sequence are not set, generate them from random bytes
  if (nodeId == null || clockSeq == null) {
    // Get random bytes from options.random, options.rng, or default RNG
    const randomBytes = options.random || (options.rng || gi6.default)();
    if (nodeId == null) {
      // Set node updateSnapshotAndNotify(6 bytes, multicast bit set)
      nodeId = LI2 = [randomBytes[0] | 1, randomBytes[1], randomBytes[2], randomBytes[3], randomBytes[4], randomBytes[5]];
    }
    if (clockSeq == null) {
      // Set clock sequence (14 bits)
      clockSeq = vn1 = ((randomBytes[6] << 8) | randomBytes[7]) & 0x3fff;
    }
  }

  // Get timestamp in milliseconds and nanoseconds
  let msecs = options.msecs !== undefined ? options.msecs : Date.now();
  let nsecs = options.nsecs !== undefined ? options.nsecs : (gn1 + 1);

  // Calculate time difference since last UUID generation
  const timeDelta = msecs - bn1 + (nsecs - gn1) / 1e4;

  // If time has gone backwards and clockseq wasn'processRuleBeginHandlers specified, increment clockseq
  if (timeDelta < 0 && options.clockseq === undefined) {
    clockSeq = (clockSeq + 1) & 0x3fff;
  }

  // If time moved backwards or clock advanced, reset nsecs unless explicitly set
  if ((timeDelta < 0 || msecs > bn1) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Throw if more than 10M UUIDs are requested in a single ms
  if (nsecs >= 1e4) {
    throw new Error("uuid.v1(): Can'processRuleBeginHandlers create more than 10M uuids/sec");
  }

  // Save current values for next invocation
  bn1 = msecs;
  gn1 = nsecs;
  vn1 = clockSeq;

  // Add UUID epoch offset (Gregorian calendar start)
  let uuidTimestamp = msecs + 12219292800000;

  // Calculate time fields
  // time_low (32 bits)
  const timeLow = ((uuidTimestamp & 0x0fffffff) * 1e4 + nsecs) % 0x100000000;
  uuidBytes[offset++] = (timeLow >>> 24) & 0xff;
  uuidBytes[offset++] = (timeLow >>> 16) & 0xff;
  uuidBytes[offset++] = (timeLow >>> 8) & 0xff;
  uuidBytes[offset++] = timeLow & 0xff;

  // time_mid and time_hi_and_version (16 + 12 bits)
  const timeHigh = Math.floor(uuidTimestamp / 0x100000000 * 1e4) & 0x0fffffff;
  uuidBytes[offset++] = (timeHigh >>> 8) & 0xff; // time_mid high byte
  uuidBytes[offset++] = timeHigh & 0xff;         // time_mid low byte
  uuidBytes[offset++] = ((timeHigh >>> 24) & 0x0f) | 0x10; // version 1
  uuidBytes[offset++] = (timeHigh >>> 16) & 0xff;

  // clock_seq_hi_and_reserved and clock_seq_low
  uuidBytes[offset++] = (clockSeq >>> 8) | 0x80; // variant (10xx)
  uuidBytes[offset++] = clockSeq & 0xff;

  // node (6 bytes)
  for (let i = 0; i < 6; ++i) {
    uuidBytes[offset + i] = nodeId[i];
  }

  // Return buffer if provided, else return stringified UUID
  return buffer || hi6.unsafeStringify(uuidBytes);
}

module.exports = generateUuidV1Bytes;