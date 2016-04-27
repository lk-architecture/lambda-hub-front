import {PropTypes} from "react";

export const settings = PropTypes.shape({
    awsAccessKeyId: PropTypes.string,
    awsSecretAccessKey: PropTypes.string,
    awsRegion: PropTypes.string,
    dynamodbEndpoint: PropTypes.string,
    kinesisEndpoint: PropTypes.string,
    s3Endpoint: PropTypes.string
});

export const kvPair = PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string
});
export const kvPairList = PropTypes.arrayOf(kvPair);

export const step = PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    completed: PropTypes.bool
});
export const stepList = PropTypes.arrayOf(step);

export const creationReporter = PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    started: PropTypes.bool.isRequired,
    error: PropTypes.string
});

export const lambda = PropTypes.shape({
    id: PropTypes.string.isRequired,
    organization: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sourceRepository: PropTypes.string.isRequired
});
export const lambdas = PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetchingError: PropTypes.string,
    collection: PropTypes.arrayOf(lambda).isRequired
});

export const organization = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
});
export const organizations = PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    fetchingError: PropTypes.string,
    collection: PropTypes.arrayOf(organization).isRequired
});
