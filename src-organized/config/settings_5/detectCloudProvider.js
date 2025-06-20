/**
 * Detects the current cloud provider and extracts relevant metadata from environment variables.
 *
 * This function checks for specific environment variables that are unique to popular cloud providers
 * (such as Vercel, AWS, GCP, Alibaba Cloud, Azure, IBM Cloud, Tencent Cloud, Netlify, Fly.io, and Heroku)
 * and returns an object containing the provider name and other relevant metadata (like region, account updateSnapshotAndNotify, etc.).
 * If no known cloud provider is detected, the function returns undefined.
 *
 * @returns {Object|undefined} An object with cloud provider metadata, or undefined if no provider is detected.
 */
function detectCloudProvider() {
  // Check for Vercel environment
  if (process.env.VERCEL) {
    return {
      "cloud.provider": "vercel",
      "cloud.region": process.env.VERCEL_REGION
    };
  }

  // Check for AWS environment
  if (process.env.AWS_REGION) {
    return {
      "cloud.provider": "aws",
      "cloud.region": process.env.AWS_REGION,
      "cloud.platform": process.env.AWS_EXECUTION_ENV
    };
  }

  // Check for Google Cloud Platform environment
  if (process.env.GCP_PROJECT) {
    return {
      "cloud.provider": "gcp"
    };
  }

  // Check for Alibaba Cloud environment
  if (process.env.ALIYUN_REGION_ID) {
    return {
      "cloud.provider": "alibaba_cloud",
      "cloud.region": process.env.ALIYUN_REGION_ID
    };
  }

  // Check for Azure environment
  if (process.env.WEBSITE_SITE_NAME && process.env.REGION_NAME) {
    return {
      "cloud.provider": "azure",
      "cloud.region": process.env.REGION_NAME
    };
  }

  // Check for IBM Cloud environment
  if (process.env.IBM_CLOUD_REGION) {
    return {
      "cloud.provider": "ibm_cloud",
      "cloud.region": process.env.IBM_CLOUD_REGION
    };
  }

  // Check for Tencent Cloud environment
  if (process.env.TENCENTCLOUD_REGION) {
    return {
      "cloud.provider": "tencent_cloud",
      "cloud.region": process.env.TENCENTCLOUD_REGION,
      "cloud.account.id": process.env.TENCENTCLOUD_APPID,
      "cloud.availability_zone": process.env.TENCENTCLOUD_ZONE
    };
  }

  // Check for Netlify environment
  if (process.env.NETLIFY) {
    return {
      "cloud.provider": "netlify"
    };
  }

  // Check for Fly.io environment
  if (process.env.FLY_REGION) {
    return {
      "cloud.provider": "fly.io",
      "cloud.region": process.env.FLY_REGION
    };
  }

  // Check for Heroku environment
  if (process.env.DYNO) {
    return {
      "cloud.provider": "heroku"
    };
  }

  // No known cloud provider detected
  return undefined;
}

module.exports = detectCloudProvider;
