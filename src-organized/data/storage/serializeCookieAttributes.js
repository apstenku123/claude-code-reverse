/**
 * Serializes a cookie object into a Set-Cookie header string, applying security and validation rules.
 *
 * @param {Object} cookie - The cookie attributes to serialize.
 * @param {string} cookie.name - The cookie name.
 * @param {string} cookie.value - The cookie value.
 * @param {boolean} [cookie.secure] - Whether the cookie is secure.
 * @param {boolean} [cookie.httpOnly] - Whether the cookie is HTTP only.
 * @param {number} [cookie.maxAge] - Max-Age attribute in seconds.
 * @param {string|null} [cookie.domain] - Domain attribute.
 * @param {string} [cookie.path] - Path attribute.
 * @param {Date} [cookie.expires] - Expiration date.
 * @param {string} [cookie.sameSite] - SameSite attribute.
 * @param {Array<string>} [cookie.unparsed] - Additional unparsed attributes.
 * @returns {string|null} The serialized Set-Cookie header string, or null if the name is empty.
 */
function serializeCookieAttributes(cookie) {
  // If the cookie name is empty, return null
  if (cookie.name.length === 0) return null;

  // Validate cookie name and value
  validateCookieName(cookie.name);
  validateCookieValue(cookie.value);

  // Start building the Set-Cookie string
  const cookieParts = [`${cookie.name}=${cookie.value}`];

  // Apply security rules for special cookie prefixes
  if (cookie.name.startsWith("__Secure-")) {
    cookie.secure = true;
  }
  if (cookie.name.startsWith("__Host-")) {
    cookie.secure = true;
    cookie.domain = null;
    cookie.path = "/";
  }

  // Add Secure and HttpOnly flags if set
  if (cookie.secure) {
    cookieParts.push("Secure");
  }
  if (cookie.httpOnly) {
    cookieParts.push("HttpOnly");
  }

  // Add Max-Age if provided and valid
  if (typeof cookie.maxAge === "number") {
    validateCookieMaxAge(cookie.maxAge);
    cookieParts.push(`Max-Age=${cookie.maxAge}`);
  }

  // Add Domain if provided
  if (cookie.domain) {
    ow6(cookie.domain);
    cookieParts.push(`Domain=${cookie.domain}`);
  }

  // Add Path if provided
  if (cookie.path) {
    validateCookiePath(cookie.path);
    cookieParts.push(`Path=${cookie.path}`);
  }

  // Add Expires if provided and valid
  if (cookie.expires && cookie.expires.toString() !== "Invalid Date") {
    cookieParts.push(`Expires=${formatDateToUTCString(cookie.expires)}`);
  }

  // Add SameSite if provided
  if (cookie.sameSite) {
    cookieParts.push(`SameSite=${cookie.sameSite}`);
  }

  // Add any unparsed attributes, ensuring they are valid
  for (const unparsedAttribute of cookie.unparsed) {
    if (!unparsedAttribute.includes("=")) {
      throw new Error("Invalid unparsed");
    }
    const [attributeKey, ...attributeValueParts] = unparsedAttribute.split("=");
    cookieParts.push(`${attributeKey.trim()}=${attributeValueParts.join("=")}`);
  }

  // Join all parts with semicolons to form the Set-Cookie header string
  return cookieParts.join("; ");
}

module.exports = serializeCookieAttributes;