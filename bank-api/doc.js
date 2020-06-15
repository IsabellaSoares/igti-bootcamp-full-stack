const swaggerDocument = {
  swagger: '2.0',
  info: {
    description:
      'This API was developed during the Bootcamp IGTI Fullstack Developer, with the purpose to learn about APIs construction with Node.js, Express, Winston logger and documentation using Swagger.',
    version: '1.0.0',
    title: 'My Bank API',
  },
  host: 'localhost:3000',
  tags: [
    {
      name: 'account',
      description: 'Everything about your Pets',
    },
  ],
  paths: {
    '/account': {
      get: {
        tags: ['account'],
        summary: 'Get existing accounts',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'Successful operation',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Account',
              },
            },
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
      post: {
        tags: ['account'],
        summary: 'Create a new account',
        consumes: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Account object',
            required: true,
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  example: 'Guilherme Assis',
                },
                balance: {
                  type: 'integer',
                  example: 743.34,
                },
              },
            },
          },
        ],
        responses: {
          '200': {
            description: 'Account created',
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
      put: {
        tags: ['account'],
        summary: 'Update an existing account',
        consumes: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Account object - Only ID: property is required',
            required: true,
            schema: {
              $ref: '#/definitions/Account',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Account updated!',
          },
          '404': {
            description: 'Account ID: 1 not found',
          },
        },
      },
    },
    '/account/{id}': {
      get: {
        tags: ['account'],
        summary: 'Get an account by ID',
        parameters: [
          {
            in: 'path',
            name: 'id',
            type: 'integer',
            required: true,
            description: 'Numeric ID of the account to get',
          },
        ],
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'Successful operation',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Account',
              },
            },
          },
          '404': {
            description: 'Account ID: 1 not found',
          },
        },
      },
      delete: {
        tags: ['account'],
        summary: 'Delete an account by ID',
        parameters: [
          {
            in: 'path',
            name: 'id',
            type: 'integer',
            required: true,
            description: 'Numeric ID of the account to delete',
          },
        ],
        responses: {
          '200': {
            description: 'Account deleted',
          },
        },
      },
    },
    '/account/transaction': {
      post: {
        tags: ['account'],
        summary: 'Performs deposit / withdrawal transactions on accounts',
        consumes: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description:
              "Transaction object. The property 'value' must be positive for deposits or negative for withdrawals.",
            required: true,
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  example: 1,
                },
                value: {
                  type: 'integer',
                  example: 743.34,
                },
              },
            },
          },
        ],
        responses: {
          '200': {
            description: 'Transaction completed!',
          },
          '400': {
            description: 'Insufficient funds',
          },
          '404': {
            description: 'Account ID: 1 not found',
          },
        },
      },
    },
  },
  definitions: {
    Account: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          example: 1,
        },
        name: {
          type: 'string',
          example: 'Guilherme Assis',
        },
        balance: {
          type: 'integer',
          example: 743.34,
        },
      },
    },
  },
  externalDocs: {
    description: 'Find out more about Swagger',
    url: 'http://swagger.io',
  },
};

module.exports = swaggerDocument;
