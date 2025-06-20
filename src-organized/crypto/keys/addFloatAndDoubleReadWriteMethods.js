/**
 * Adds IEEE 754 floating-point read/write methods (float32/float64, initializeComponentInstance/renderMessageByType) to the given object.
 *
 * This function detects platform endianness and provides efficient implementations
 * using typed arrays if available, or falls back to manual bit manipulation otherwise.
 *
 * @param {Object} targetObject - The object to which float/double read/write methods will be attached.
 * @returns {Object} The same object, now with read/write methods for float32/float64 (initializeComponentInstance/renderMessageByType).
 */
function addFloatAndDoubleReadWriteMethods(targetObject) {
  // --- FLOAT32 (4 bytes) ---
  if (typeof Float32Array !== "undefined") {
    // Use typed arrays for efficient float32 conversion
    (function () {
      const float32Array = new Float32Array([-0]);
      const uint8Array = new Uint8Array(float32Array.buffer);
      const isLittleEndian = uint8Array[3] === 128;

      /**
       * Write a 32-bit float to a buffer in little-endian order
       */
      function writeFloatLE(value, buffer, offset) {
        float32Array[0] = value;
        buffer[offset]     = uint8Array[0];
        buffer[offset + 1] = uint8Array[1];
        buffer[offset + 2] = uint8Array[2];
        buffer[offset + 3] = uint8Array[3];
      }

      /**
       * Write a 32-bit float to a buffer in big-endian order
       */
      function writeFloatBE(value, buffer, offset) {
        float32Array[0] = value;
        buffer[offset]     = uint8Array[3];
        buffer[offset + 1] = uint8Array[2];
        buffer[offset + 2] = uint8Array[1];
        buffer[offset + 3] = uint8Array[0];
      }

      /**
       * Read a 32-bit float from a buffer in little-endian order
       */
      function readFloatLE(buffer, offset) {
        uint8Array[0] = buffer[offset];
        uint8Array[1] = buffer[offset + 1];
        uint8Array[2] = buffer[offset + 2];
        uint8Array[3] = buffer[offset + 3];
        return float32Array[0];
      }

      /**
       * Read a 32-bit float from a buffer in big-endian order
       */
      function readFloatBE(buffer, offset) {
        uint8Array[3] = buffer[offset];
        uint8Array[2] = buffer[offset + 1];
        uint8Array[1] = buffer[offset + 2];
        uint8Array[0] = buffer[offset + 3];
        return float32Array[0];
      }

      // Assign the correct methods based on platform endianness
      targetObject.writeFloatLE = isLittleEndian ? writeFloatLE : writeFloatBE;
      targetObject.writeFloatBE = isLittleEndian ? writeFloatBE : writeFloatLE;
      targetObject.readFloatLE  = isLittleEndian ? readFloatLE  : readFloatBE;
      targetObject.readFloatBE  = isLittleEndian ? readFloatBE  : readFloatLE;
    })();
  } else {
    // Manual float32 conversion (fallback)
    (function () {
      /**
       * Write a 32-bit float to a buffer using manual bit manipulation.
       * @param {Function} writeUInt32 - Function to write a 32-bit unsigned int to buffer.
       * @param {number} value - The float value to write.
       * @param {Uint8Array|Array} buffer - The target buffer.
       * @param {number} offset - The offset in the buffer.
       */
      function writeFloat(writeUInt32, value, buffer, offset) {
        let signBit = value < 0 ? 1 : 0;
        if (signBit) value = -value;
        if (value === 0) {
          // Handle signed zero
          writeUInt32(1 / value > 0 ? 0 : 0x80000000, buffer, offset);
        } else if (isNaN(value)) {
          // NaN
          writeUInt32(0x7FC00000, buffer, offset);
        } else if (value > 3.4028234663852886e+38) {
          // Infinity
          writeUInt32(((signBit << 31) | 0x7F800000) >>> 0, buffer, offset);
        } else if (value < 1.1754943508222875e-38) {
          // Subnormal
          writeUInt32(((signBit << 31) | Math.round(value / 1.401298464324817e-45)) >>> 0, buffer, offset);
        } else {
          // Normalized
          const exponent = Math.floor(Math.log(value) / Math.LN2);
          const mantissa = Math.round(value * Math.pow(2, -exponent) * 0x800000) & 0x7FFFFF;
          writeUInt32(((signBit << 31) | ((exponent + 127) << 23) | mantissa) >>> 0, buffer, offset);
        }
      }

      // These functions must be defined elsewhere in the codebase
      // writeUInt32ToByteArray: writeUInt32LE, writeUInt32ToByteArray: writeUInt32BE
      targetObject.writeFloatLE = writeFloat.bind(null, writeUInt32ToByteArray);
      targetObject.writeFloatBE = writeFloat.bind(null, writeUInt32ToByteArray);

      /**
       * Read a 32-bit float from a buffer using manual bit manipulation.
       * @param {Function} readUInt32 - Function to read a 32-bit unsigned int from buffer.
       * @param {Uint8Array|Array} buffer - The source buffer.
       * @param {number} offset - The offset in the buffer.
       * @returns {number} The float value.
       */
      function readFloat(readUInt32, buffer, offset) {
        const uint32 = readUInt32(buffer, offset);
        const sign = (uint32 >> 31) * 2 + 1;
        const exponent = (uint32 >>> 23) & 0xFF;
        const mantissa = uint32 & 0x7FFFFF;
        if (exponent === 0xFF) {
          // NaN or Infinity
          return mantissa ? NaN : sign * Infinity;
        } else if (exponent === 0) {
          // Subnormal
          return sign * 1.401298464324817e-45 * mantissa;
        } else {
          // Normalized
          return sign * Math.pow(2, exponent - 150) * (mantissa + 0x800000);
        }
      }

      // These functions must be defined elsewhere in the codebase
      // readUInt32LE: readUInt32LE, readUint32FromByteArray: readUInt32BE
      targetObject.readFloatLE = readFloat.bind(null, readUInt32LE);
      targetObject.readFloatBE = readFloat.bind(null, readUint32FromByteArray);
    })();
  }

  // --- FLOAT64 (8 bytes) ---
  if (typeof Float64Array !== "undefined") {
    // Use typed arrays for efficient float64 conversion
    (function () {
      const float64Array = new Float64Array([-0]);
      const uint8Array = new Uint8Array(float64Array.buffer);
      const isLittleEndian = uint8Array[7] === 128;

      /**
       * Write a 64-bit float to a buffer in little-endian order
       */
      function writeDoubleLE(value, buffer, offset) {
        float64Array[0] = value;
        buffer[offset]     = uint8Array[0];
        buffer[offset + 1] = uint8Array[1];
        buffer[offset + 2] = uint8Array[2];
        buffer[offset + 3] = uint8Array[3];
        buffer[offset + 4] = uint8Array[4];
        buffer[offset + 5] = uint8Array[5];
        buffer[offset + 6] = uint8Array[6];
        buffer[offset + 7] = uint8Array[7];
      }

      /**
       * Write a 64-bit float to a buffer in big-endian order
       */
      function writeDoubleBE(value, buffer, offset) {
        float64Array[0] = value;
        buffer[offset]     = uint8Array[7];
        buffer[offset + 1] = uint8Array[6];
        buffer[offset + 2] = uint8Array[5];
        buffer[offset + 3] = uint8Array[4];
        buffer[offset + 4] = uint8Array[3];
        buffer[offset + 5] = uint8Array[2];
        buffer[offset + 6] = uint8Array[1];
        buffer[offset + 7] = uint8Array[0];
      }

      /**
       * Read a 64-bit float from a buffer in little-endian order
       */
      function readDoubleLE(buffer, offset) {
        uint8Array[0] = buffer[offset];
        uint8Array[1] = buffer[offset + 1];
        uint8Array[2] = buffer[offset + 2];
        uint8Array[3] = buffer[offset + 3];
        uint8Array[4] = buffer[offset + 4];
        uint8Array[5] = buffer[offset + 5];
        uint8Array[6] = buffer[offset + 6];
        uint8Array[7] = buffer[offset + 7];
        return float64Array[0];
      }

      /**
       * Read a 64-bit float from a buffer in big-endian order
       */
      function readDoubleBE(buffer, offset) {
        uint8Array[7] = buffer[offset];
        uint8Array[6] = buffer[offset + 1];
        uint8Array[5] = buffer[offset + 2];
        uint8Array[4] = buffer[offset + 3];
        uint8Array[3] = buffer[offset + 4];
        uint8Array[2] = buffer[offset + 5];
        uint8Array[1] = buffer[offset + 6];
        uint8Array[0] = buffer[offset + 7];
        return float64Array[0];
      }

      // Assign the correct methods based on platform endianness
      targetObject.writeDoubleLE = isLittleEndian ? writeDoubleLE : writeDoubleBE;
      targetObject.writeDoubleBE = isLittleEndian ? writeDoubleBE : writeDoubleLE;
      targetObject.readDoubleLE  = isLittleEndian ? readDoubleLE  : readDoubleBE;
      targetObject.readDoubleBE  = isLittleEndian ? readDoubleBE  : readDoubleLE;
    })();
  } else {
    // Manual float64 conversion (fallback)
    (function () {
      /**
       * Write a 64-bit float to a buffer using manual bit manipulation.
       * @param {Function} writeUInt32 - Function to write a 32-bit unsigned int to buffer.
       * @param {number} lowOffset - Offset for the low 32 bits.
       * @param {number} highOffset - Offset for the high 32 bits.
       * @param {number} value - The float value to write.
       * @param {Uint8Array|Array} buffer - The target buffer.
       * @param {number} offset - The offset in the buffer.
       */
      function writeDouble(writeUInt32, lowOffset, highOffset, value, buffer, offset) {
        let signBit = value < 0 ? 1 : 0;
        if (signBit) value = -value;
        if (value === 0) {
          // Handle signed zero
          writeUInt32(0, buffer, offset + lowOffset);
          writeUInt32(1 / value > 0 ? 0 : 0x80000000, buffer, offset + highOffset);
        } else if (isNaN(value)) {
          // NaN
          writeUInt32(0, buffer, offset + lowOffset);
          writeUInt32(0x7FF80000, buffer, offset + highOffset);
        } else if (value > 1.7976931348623157e+308) {
          // Infinity
          writeUInt32(0, buffer, offset + lowOffset);
          writeUInt32(((signBit << 31) | 0x7FF00000) >>> 0, buffer, offset + highOffset);
        } else {
          let mantissa;
          if (value < 2.2250738585072014e-308) {
            // Subnormal
            mantissa = value / 5e-324;
            writeUInt32(mantissa >>> 0, buffer, offset + lowOffset);
            writeUInt32(((signBit << 31) | (mantissa / 4294967296)) >>> 0, buffer, offset + highOffset);
          } else {
            // Normalized
            let exponent = Math.floor(Math.log(value) / Math.LN2);
            if (exponent === 1024) exponent = 1023;
            mantissa = value * Math.pow(2, -exponent);
            writeUInt32((mantissa * 4503599627370496) >>> 0, buffer, offset + lowOffset);
            writeUInt32(((signBit << 31) | ((exponent + 1023) << 20) | ((mantissa * 1048576) & 0xFFFFF)) >>> 0, buffer, offset + highOffset);
          }
        }
      }

      // These functions must be defined elsewhere in the codebase
      // writeUInt32ToByteArray: writeUInt32LE, writeUInt32ToByteArray: writeUInt32BE
      targetObject.writeDoubleLE = writeDouble.bind(null, writeUInt32ToByteArray, 0, 4);
      targetObject.writeDoubleBE = writeDouble.bind(null, writeUInt32ToByteArray, 4, 0);

      /**
       * Read a 64-bit float from a buffer using manual bit manipulation.
       * @param {Function} readUInt32 - Function to read a 32-bit unsigned int from buffer.
       * @param {number} lowOffset - Offset for the low 32 bits.
       * @param {number} highOffset - Offset for the high 32 bits.
       * @param {Uint8Array|Array} buffer - The source buffer.
       * @param {number} offset - The offset in the buffer.
       * @returns {number} The float value.
       */
      function readDouble(readUInt32, lowOffset, highOffset, buffer, offset) {
        const low = readUInt32(buffer, offset + lowOffset);
        const high = readUInt32(buffer, offset + highOffset);
        const sign = (high >> 31) * 2 + 1;
        const exponent = (high >>> 20) & 0x7FF;
        const mantissa = 4294967296 * (high & 0xFFFFF) + low;
        if (exponent === 0x7FF) {
          // NaN or Infinity
          return mantissa ? NaN : sign * Infinity;
        } else if (exponent === 0) {
          // Subnormal
          return sign * 5e-324 * mantissa;
        } else {
          // Normalized
          return sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }
      }

      // These functions must be defined elsewhere in the codebase
      // readUInt32LE: readUInt32LE, readUint32FromByteArray: readUInt32BE
      targetObject.readDoubleLE = readDouble.bind(null, readUInt32LE, 0, 4);
      targetObject.readDoubleBE = readDouble.bind(null, readUint32FromByteArray, 4, 0);
    })();
  }

  return targetObject;
}

module.exports = addFloatAndDoubleReadWriteMethods;