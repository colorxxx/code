/**
 * Simple URL Validator
 */

function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function validateUrl(string) {
  if (!string || typeof string !== 'string') {
    return { valid: false, error: 'Input must be a non-empty string' };
  }

  try {
    const url = new URL(string);

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return { valid: false, error: 'URL must use http or https protocol' };
    }

    return {
      valid: true,
      parsed: {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || null,
        pathname: url.pathname,
        search: url.search || null,
        hash: url.hash || null
      }
    };
  } catch (e) {
    return { valid: false, error: 'Invalid URL format' };
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node url-validator.js <url>');
    console.log('Example: node url-validator.js https://example.com');
    process.exit(1);
  }

  const result = validateUrl(args[0]);

  if (result.valid) {
    console.log('Valid URL');
    console.log('Parsed:', JSON.stringify(result.parsed, null, 2));
  } else {
    console.log('Invalid URL:', result.error);
    process.exit(1);
  }
}

module.exports = { isValidUrl, validateUrl };
