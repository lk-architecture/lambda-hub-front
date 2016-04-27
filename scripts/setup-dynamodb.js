import {promisifyAll} from "bluebird";
import {DynamoDB} from "aws-sdk";

const dynamodb = new DynamoDB({
    apiVersion: "2012-08-10",
    endpoint: "http://localhost:8000",
    region: "us-east-1",
    accessKeyId: "accessKeyId",
    secretAccessKey: "secretAccessKey"
});
promisifyAll(dynamodb);

export default async function setupDynamodb () {
    await dynamodb.createTableAsync({
        AttributeDefinitions: [
            {
                AttributeName: "organization",
                AttributeType: "S"
            },
            {
                AttributeName: "name",
                AttributeType: "S"
            }
        ],
        KeySchema: [
            {
                AttributeName: "organization",
                KeyType: "HASH"
            },
            {
                AttributeName: "name",
                KeyType: "RANGE"
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        },
        TableName: "lambda-hub-lambdas"
    });
    console.log("Created lambda-hub-functions table");
    await dynamodb.createTableAsync({
        AttributeDefinitions: [{
            AttributeName: "name",
            AttributeType: "S"
        }],
        KeySchema: [{
            AttributeName: "name",
            KeyType: "HASH"
        }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        },
        TableName: "lambda-hub-organizations"
    });
    console.log("Created lambda-hub-organizations table");
}
