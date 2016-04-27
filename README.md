[![Build Status](https://travis-ci.org/lk-architecture/lk-app-front.svg?branch=master)](https://travis-ci.org/lk-architecture/lk-app-front)

# lh-front

## Development environment setup

After cloning the repository, run `npm install` to install all dependencies and
`npm run dev` to start the development server.

## Configuration

The application can be configured using a `.env` file.

To correctly configure Auth0 you have to provide those properties in your `.env` file (key=value format):

- `API_URL`
- `AUTH0_CLIENT_ID`
- `AUTH0_DOMAIN`
