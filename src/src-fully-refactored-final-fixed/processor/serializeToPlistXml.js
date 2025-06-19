/**
 * Recursively serializes a JavaScript value into a Plist-compatible XML structure using the provided XML builder.
 * Handles arrays, objects, buffers, dates, numbers, booleans, strings, array buffers, and null/undefined values.
 *
 * @param {*} value - The value to serialize (can be any JS type: object, array, buffer, etc.)
 * @param {object} xmlBuilder - The XML builder object, expected to have .ele(), .txt(), and .raw() methods
 * @returns {void}
 */
function serializeToPlistXml(value, xmlBuilder) {
  const valueType = jN2(value); // Determine the type of the value using custom type checker

  if (valueType === "Undefined") {
    // normalizeToError not serialize undefined values
    return;
  }

  if (Array.isArray(value)) {
    // Serialize arrays as <array> elements
    const arrayElement = xmlBuilder.ele("array");
    for (let i = 0; i < value.length; i++) {
      serializeToPlistXml(value[i], arrayElement);
    }
    return;
  }

  if (Buffer.isBuffer(value)) {
    // Serialize Node.js Buffers as base64-encoded <data> elements
    xmlBuilder.ele("data").raw(value.toString("base64"));
    return;
  }

  if (valueType === "Object") {
    // Serialize plain objects as <dict> with <key> and value pairs
    const dictElement = xmlBuilder.ele("dict");
    for (const propertyName in value) {
      if (Object.prototype.hasOwnProperty.call(value, propertyName)) {
        dictElement.ele("key").txt(propertyName);
        serializeToPlistXml(value[propertyName], dictElement);
      }
    }
    return;
  }

  if (valueType === "Number") {
    // Numbers: integers as <integer>, floats as <real>
    const numberTag = value % 1 === 0 ? "integer" : "real";
    xmlBuilder.ele(numberTag).txt(value.toString());
    return;
  }

  if (valueType === "BigInt") {
    // BigInts are serialized as <integer>
    xmlBuilder.ele("integer").txt(value);
    return;
  }

  if (valueType === "Date") {
    // Dates are serialized as <date> in UTC ISO8601 format
    xmlBuilder.ele("date").txt(formatDateToUTCISOString(new Date(value)));
    return;
  }

  if (valueType === "Boolean") {
    // Booleans as <true/> or <false/>
    xmlBuilder.ele(value ? "true" : "false");
    return;
  }

  if (valueType === "String") {
    // Strings as <string>
    xmlBuilder.ele("string").txt(value);
    return;
  }

  if (valueType === "ArrayBuffer") {
    // ArrayBuffers as base64-encoded <data>
    xmlBuilder.ele("data").raw(_N2.fromByteArray(value));
    return;
  }

  // Handle TypedArrays and objects with a .buffer property that is an ArrayBuffer
  if (value && value.buffer && jN2(value.buffer) === "ArrayBuffer") {
    xmlBuilder.ele("data").raw(_N2.fromByteArray(new Uint8Array(value.buffer)));
    return;
  }

  if (valueType === "Null") {
    // Null as <null></null>
    xmlBuilder.ele("null").txt("");
    return;
  }
}

module.exports = serializeToPlistXml;