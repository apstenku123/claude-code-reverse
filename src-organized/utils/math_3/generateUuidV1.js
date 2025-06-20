/**
 * Generates a UUID version 1 (time-based) according to RFC 4122.
 * Handles clock sequence, node identifier, and timestamp management for uniqueness.
 *
 * @param {Object} [options] - Options for UUID generation.
 * @param {Array<number>} [buffer] - Optional buffer to write the UUID bytes into.
 * @param {number} [offset] - Optional offset within the buffer to start writing.
 * @returns {string|Array<number>} The generated UUID string, or the buffer if provided.
 */
function generateUuidV1(options = {}, buffer, offset) {
  // Default offset is 0 if buffer is provided, else undefined
  let bufferOffset = (buffer && offset) || 0;
  // Use provided buffer or create a new one of length 16
  const uuidBytes = buffer || new Array(16);

  // Extract or initialize node and clock sequence
  let nodeId = options.node || NiA;
  let clockSeq = options.clockseq !== undefined ? options.clockseq : YS1;

  // If node or clock sequence are not set, generate them from random bytes
  if (nodeId == null || clockSeq == null) {
    // Use provided random bytes or fallback to default RNG
    const randomBytes = options.random || (options.rng || n74.default)();
    if (nodeId == null) {
      // Set multicast bit as per RFC 4122
      nodeId = NiA = [randomBytes[0] | 1, randomBytes[1], randomBytes[2], randomBytes[3], randomBytes[4], randomBytes[5]];
    }
    if (clockSeq == null) {
      // 14-bit clock sequence
      clockSeq = YS1 = ((randomBytes[6] << 8) | randomBytes[7]) & 0x3fff;
    }
  }

  // Get current time in milliseconds and nanoseconds
  let currentMsecs = options.msecs !== undefined ? options.msecs : Date.now();
  let currentNsecs = options.nsecs !== undefined ? options.nsecs : FS1 + 1;

  // Calculate time difference since last UUID generation
  const timeDelta = currentMsecs - WS1 + (currentNsecs - FS1) / 1e4;

  // If clock has gone backwards and clockseq not specified, increment clockseq
  if (timeDelta < 0 && options.clockseq === undefined) {
    clockSeq = (clockSeq + 1) & 0x3fff;
  }

  // Reset nsecs if time has moved backwards or forward, and nsecs not specified
  if ((timeDelta < 0 || currentMsecs > WS1) && options.nsecs === undefined) {
    currentNsecs = 0;
  }

  // Throw if generating too many UUIDs in the same millisecond
  if (currentNsecs >= 1e4) {
    throw new Error("uuid.v1(): Can'processRuleBeginHandlers create more than 10M uuids/sec");
  }

  // Save state for next invocation
  WS1 = currentMsecs;
  FS1 = currentNsecs;
  YS1 = clockSeq;

  // Add UUID epoch offset (from Gregorian to Unix epoch)
  let uuidMsecs = currentMsecs + 12219292800000;

  // Calculate time fields for UUID
  // time_low
  const timeLow = ((uuidMsecs & 0x0fffffff) * 1e4 + currentNsecs) % 0x100000000;
  uuidBytes[bufferOffset++] = (timeLow >>> 24) & 0xff;
  uuidBytes[bufferOffset++] = (timeLow >>> 16) & 0xff;
  uuidBytes[bufferOffset++] = (timeLow >>> 8) & 0xff;
  uuidBytes[bufferOffset++] = timeLow & 0xff;

  // time_mid and time_high_and_version
  const timeHigh = ((uuidMsecs / 0x100000000) * 1e4) & 0x0fffffff;
  uuidBytes[bufferOffset++] = (timeHigh >>> 8) & 0xff; // time_mid high byte
  uuidBytes[bufferOffset++] = timeHigh & 0xff;         // time_mid low byte
  uuidBytes[bufferOffset++] = ((timeHigh >>> 24) & 0x0f) | 0x10; // version 1
  uuidBytes[bufferOffset++] = (timeHigh >>> 16) & 0xff;

  // clock_seq_hi_and_reserved and clock_seq_low
  uuidBytes[bufferOffset++] = (clockSeq >>> 8) | 0x80; // variant bits 10xxxxxx
  uuidBytes[bufferOffset++] = clockSeq & 0xff;

  // node (MAC address or random)
  for (let i = 0; i < 6; ++i) {
    uuidBytes[bufferOffset + i] = nodeId[i];
  }

  // Return buffer if provided, else return stringified UUID
  return buffer || a74.unsafeStringify(uuidBytes);
}

module.exports = generateUuidV1;