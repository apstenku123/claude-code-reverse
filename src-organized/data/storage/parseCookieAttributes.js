/**
 * Parses a cookie attribute string (typically from a Set-Cookie header) into an object with recognized cookie properties and collects unrecognized attributes.
 *
 * @param {string} attributeString - The cookie attribute string to parse (e.g., "; Path=/; Secure; HttpOnly; SameSite=Lax").
 * @param {Object} [cookieAttributes={}] - The object to accumulate parsed cookie attributes into. Used for recursion; callers should omit this parameter.
 * @returns {Object} The parsed cookie attributes object, including recognized properties and an 'unparsed' array for unknown attributes.
 */
function parseCookieAttributes(attributeString, cookieAttributes = {}) {
  // If the attribute string is empty, return the accumulated attributes
  if (attributeString.length === 0) return cookieAttributes;

  // Ensure the attribute string starts with a semicolon
  ZE6(attributeString[0] === ";");
  // Remove the leading semicolon
  attributeString = attributeString.slice(1);

  let attributePair = "";

  // Extract the next attribute pair (up to the next semicolon, or the rest of the string)
  if (attributeString.includes(";")) {
    attributePair = tY1(";", attributeString, { position: 0 });
    attributeString = attributeString.slice(attributePair.length);
  } else {
    attributePair = attributeString;
    attributeString = "";
  }

  let attributeName = "";
  let attributeValue = "";

  // Split the attribute pair into name and value (if '=' is present)
  if (attributePair.includes("=")) {
    const positionObj = { position: 0 };
    attributeName = tY1("=", attributePair, positionObj);
    attributeValue = attributePair.slice(positionObj.position + 1);
  } else {
    attributeName = attributePair;
  }

  // Trim whitespace from name and value
  attributeName = attributeName.trim();
  attributeValue = attributeValue.trim();

  // If the value is too long, skip this attribute and continue
  if (attributeValue.length > IE6) {
    return parseCookieAttributes(attributeString, cookieAttributes);
  }

  const lowerCaseName = attributeName.toLowerCase();

  // Parse recognized cookie attributes
  if (lowerCaseName === "expires") {
    // Parse 'expires' attribute as a Date
    const expiresDate = new Date(attributeValue);
    cookieAttributes.expires = expiresDate;
  } else if (lowerCaseName === "max-age") {
    // Parse 'max-age' attribute as a number (seconds)
    const firstCharCode = attributeValue.charCodeAt(0);
    // Validate that the value is a number or starts with '-'
    if ((firstCharCode < 48 || firstCharCode > 57) && attributeValue[0] !== "-") {
      return parseCookieAttributes(attributeString, cookieAttributes);
    }
    if (!/^\d+$/.test(attributeValue)) {
      return parseCookieAttributes(attributeString, cookieAttributes);
    }
    const maxAgeValue = Number(attributeValue);
    cookieAttributes.maxAge = maxAgeValue;
  } else if (lowerCaseName === "domain") {
    // Parse 'domain' attribute, removing leading dot and converting to lowercase
    let domainValue = attributeValue;
    if (domainValue[0] === ".") domainValue = domainValue.slice(1);
    domainValue = domainValue.toLowerCase();
    cookieAttributes.domain = domainValue;
  } else if (lowerCaseName === "path") {
    // Parse 'path' attribute, defaulting to '/' if missing or invalid
    let pathValue = "";
    if (attributeValue.length === 0 || attributeValue[0] !== "/") {
      pathValue = "/";
    } else {
      pathValue = attributeValue;
    }
    cookieAttributes.path = pathValue;
  } else if (lowerCaseName === "secure") {
    // Parse 'secure' attribute (boolean flag)
    cookieAttributes.secure = true;
  } else if (lowerCaseName === "httponly") {
    // Parse 'httponly' attribute (boolean flag)
    cookieAttributes.httpOnly = true;
  } else if (lowerCaseName === "samesite") {
    // Parse 'samesite' attribute (Default, None, Strict, Lax)
    let sameSiteValue = "Default";
    const lowerCaseValue = attributeValue.toLowerCase();
    if (lowerCaseValue.includes("none")) sameSiteValue = "None";
    if (lowerCaseValue.includes("strict")) sameSiteValue = "Strict";
    if (lowerCaseValue.includes("lax")) sameSiteValue = "Lax";
    cookieAttributes.sameSite = sameSiteValue;
  } else {
    // Collect unrecognized attributes in an 'unparsed' array
    cookieAttributes.unparsed ??= [];
    cookieAttributes.unparsed.push(`${attributeName}=${attributeValue}`);
  }

  // Recursively parse the remaining attribute string
  return parseCookieAttributes(attributeString, cookieAttributes);
}

module.exports = parseCookieAttributes;