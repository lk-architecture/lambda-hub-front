// import dotenv from "dotenv";
//
// dotenv.config();

export const DYNAMODB_FUNCTIONS_TABLE = "lambda-hub-functions";
export const DYNAMODB_ORGANIZATIONS_TABLE = "lambda-hub-organizations";
export const DYNAMODB_LAMBDAS_TABLE = "lambda-hub-lambdas";
export const BACKEND_ENDPOINT = process.env.BACKEND_ENDPOINT || "http://localhost:8000";
export const BACKEND_TIMEOUT = process.env.BACKEND_TIMEOUT || 5000;
