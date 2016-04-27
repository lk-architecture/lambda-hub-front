import {SAVE_SETTINGS} from "actions/settings";

const defaultSettings = {
    awsAccessKeyId: "awsAccessKeyId",
    awsSecretAccessKey: "awsSecretAccessKey",
    awsRegion: "us-east-1",
    backendEndpoint: "http://localhost:3000",
    dynamodbEndpoint: "http://localhost:8000"
};

export default function settings (state = defaultSettings, action) {
    const {type, payload} = action;
    switch (type) {
    case SAVE_SETTINGS:
        return payload;
    default:
        return state;
    }
}
