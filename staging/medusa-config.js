const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) { }

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";
const DATABASE_TYPE = process.env.DATABASE_TYPE || "sqlite";
const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const BACKEND_URL = process.env.BACKEND_URL || "localhost:9000";
const STORE_URL = process.env.STORE_URL || "localhost:8000";

// RESEND
const RESEND_API_KEY = process.env.RESEND_API_ID;
const RESEND_ENABLE_ENDPOINT = process.env.RESEND_ENABLE_ENDPOINT;
const RESEND_TEMPLATE_PATH = process.env.RESEND_TEMPLATE_PATH;
const RESEND_SUBJECT_TEMPLATE_TYPE = process.env.RESEND_SUBJECT_TEMPLATE_TYPE;
const RESEND_BODY_TEMPLATE_TYPE = process.env.RESEND_BODY_TEMPLATE_TYPE;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_URL = process.env.ADMIN_URL || "localhost:7000";
const RESEND_USER_PASSWORD_RESET = process.env.RESEND_USER_PASSWORD_RESET;
const RESEND_USER_INVITE = process.env.RESEND_USER_INVITE;

const ADMIN_APP_PORT = process.env.PORT || 7001;

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
    },
  },
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
      path: "/",
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
        port: ADMIN_APP_PORT,
      },
    },
  },
  // Payment
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: process.env.STRIPE_API_KEY,
      webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
    },
  },
  // Storage
  {
    resolve: `medusa-file-s3`,
    options: {
      s3_url: process.env.S3_URL,
      bucket: process.env.S3_BUCKET,
      prefix: process.env.S3_PREFIX,
      region: process.env.S3_REGION,
      download_file_duration: process.env.S3_DOWNLOAD_FILE_DURATION,
      secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
      access_key_id: process.env.S3_ACCESS_KEY_ID,
      cache_control: process.env.S3_CACHE_CONTROL,
    },
  },

  // Notifications
];

const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL,
      ttl: 30
    }
  },
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  database_url: DATABASE_URL,
  database_type: DATABASE_TYPE,
  store_cors: STORE_CORS,
  admin_cors: ADMIN_CORS,
  redis_url: REDIS_URL
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules: {
    inventoryService: {
      resolve: "@medusajs/inventory",
    },
    stockLocationService: {
      resolve: "@medusajs/stock-location",
    },
    eventBus: {
      resolve: "@medusajs/event-bus-redis",
      options: {
        redisUrl: process.env.EVENTS_REDIS_URL,
      },
    },
    cacheService: {
      resolve: "@medusajs/cache-redis",
      options: {
        redisUrl: process.env.CACHE_REDIS_URL,
        ttl: 30,
      },
    },
  },
};
