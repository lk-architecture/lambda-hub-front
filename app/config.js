export const API_URL = window.APP_CONFIG.API_URL;
export const AUTH0_CLIENT_ID = window.APP_CONFIG.AUTH0_CLIENT_ID;
export const AUTH0_DOMAIN = window.APP_CONFIG.AUTH0_DOMAIN;

export const DYNAMODB_FUNCTIONS_TABLE = "lambda-hub-functions";
export const DYNAMODB_ORGANIZATIONS_TABLE = "lambda-hub-organizations";
export const DYNAMODB_LAMBDAS_TABLE = "lambda-hub-lambdas";
export const BACKEND_ENDPOINT = process.env.BACKEND_ENDPOINT || "http://localhost:3000";
export const BACKEND_TIMEOUT = process.env.BACKEND_TIMEOUT || 5000;
