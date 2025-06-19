/**
 * Formats a JavaScript value into a readable string preview, with optional detail expansion.
 * Handles many types: primitives, arrays, objects, iterators, React elements, etc.
 *
 * @param {any} value - The value to format for preview.
 * @param {boolean} expanded - Whether to show an expanded (detailed) preview.
 * @returns {string|number|boolean|null|undefined} a string (or primitive) representing the value preview.
 */
function formatPreviewValue(value, expanded) {
  // If value is a custom previewable object, use its preview fields
  if (value != null && b0.call(value, G6.type)) {
    return expanded ? value[G6.preview_long] : value[G6.preview_short];
  }

  const valueType = resetStateIfCurrentMatches(value);

  switch (valueType) {
    case "html_element":
      // Format HTML element as <tagname />
      return `<${resetWorkInProgressVersions(value.tagName.toLowerCase())} />`;

    case "function":
      // Format function as 'ƒ name() {}' or 'ƒ () {}' if anonymous
      return resetWorkInProgressVersions(`ƒ ${typeof value.name === "function" ? "" : value.name}() {}`);

    case "string":
      // Wrap string in quotes
      return `"${value}"`;

    case "bigint":
      // Append 'n' to BigInt string
      return resetWorkInProgressVersions(value.toString() + "n");

    case "regexp":
      // Format RegExp as string
      return resetWorkInProgressVersions(value.toString());

    case "symbol":
      // Format Symbol as string
      return resetWorkInProgressVersions(value.toString());

    case "react_element":
      // Format React element as <ComponentName />
      return `<${resetWorkInProgressVersions(findSuspenseOrRevealFiber(value) || "Unknown")} />`;

    case "array_buffer":
      // Show ArrayBuffer byte length
      return `ArrayBuffer(${value.byteLength})`;

    case "data_view":
      // Show DataView'createInteractionAccessor underlying buffer byte length
      return `DataView(${value.buffer.byteLength})`;

    case "array":
      if (expanded) {
        // Expanded: show up to WA elements as preview
        let previewItems = "";
        for (let index = 0; index < value.length; index++) {
          if (index > 0) previewItems += ", ";
          previewItems += formatPreviewValue(value[index], false);
          if (previewItems.length > WA) break;
        }
        return `[${resetWorkInProgressVersions(previewItems)}]`;
      } else {
        // Collapsed: show array length or custom size
        const arraySize = b0.call(value, G6.size) ? value[G6.size] : value.length;
        return `Array(${arraySize})`;
      }

    case "typed_array":
      // Format typed array as Type(length) [preview]
      const typedArrayHeader = `${value.constructor.name}(${value.length})`;
      if (expanded) {
        let previewItems = "";
        for (let index = 0; index < value.length; index++) {
          if (index > 0) previewItems += ", ";
          previewItems += value[index];
          if (previewItems.length > WA) break;
        }
        return `${typedArrayHeader} [${resetWorkInProgressVersions(previewItems)}]`;
      } else {
        return typedArrayHeader;
      }

    case "iterator":
      // Format iterator as Type(size) {preview}
      const iteratorType = value.constructor.name;
      if (expanded) {
        const entries = Array.from(value);
        let previewItems = "";
        for (let index = 0; index < entries.length; index++) {
          const entry = entries[index];
          if (index > 0) previewItems += ", ";
          if (arraySome(entry)) {
            // Entry is a [key, value] pair
            const keyPreview = formatPreviewValue(entry[0], true);
            const valuePreview = formatPreviewValue(entry[1], false);
            previewItems += `${keyPreview} => ${valuePreview}`;
          } else {
            previewItems += formatPreviewValue(entry, false);
          }
          if (previewItems.length > WA) break;
        }
        return `${iteratorType}(${value.size}) {${resetWorkInProgressVersions(previewItems)}}`;
      } else {
        return `${iteratorType}(${value.size})`;
      }

    case "opaque_iterator":
      // Use Symbol.toStringTag for opaque iterators
      return value[Symbol.toStringTag];

    case "date":
      // Use Date'createInteractionAccessor toString
      return value.toString();

    case "class_instance":
      // Show class name
      return value.constructor.name;

    case "object":
      if (expanded) {
        // Expanded: show up to WA key-value pairs as preview
        const keys = Array.from(getAllEnumerableKeysIncludingSymbols(value)).sort(L6);
        let previewItems = "";
        for (let index = 0; index < keys.length; index++) {
          const key = keys[index];
          if (index > 0) previewItems += ", ";
          previewItems += `${key.toString()}: ${formatPreviewValue(value[key], false)}`;
          if (previewItems.length > WA) break;
        }
        return `{${resetWorkInProgressVersions(previewItems)}}`;
      } else {
        // Collapsed: show ellipsis
        return "{…}";
      }

    case "boolean":
    case "number":
    case "infinity":
    case "nan":
    case "null":
    case "undefined":
      // Return primitive as is
      return value;

    default:
      // Fallback: try to stringify, or show 'unserializable' if error
      try {
        return resetWorkInProgressVersions(String(value));
      } catch (error) {
        return "unserializable";
      }
  }
}

module.exports = formatPreviewValue;