import Ajv from 'ajv';

const schema = {
  type: 'object',
  required: [
    'image',
    'animation_url',
    'name',
    'royalty_percentage',
    'description',
    'collection_metadata',
    'mint_channel',
    'properties',
    'attributes',
  ],
  properties: {
    image: { type: 'string' },
    animation_url: { type: 'string' },
    name: { type: 'string' },
    royalty_percentage: { type: 'integer', minimum: 0, maximum: 100 },
    description: { type: 'string' },
    collection_metadata: { type: 'string' },
    mint_channel: { type: 'string' },
    properties: { type: 'object' },
    attributes: {
      type: 'array',
      items: {
        type: 'object',
        required: ['trait_type', 'value'],
        properties: {
          trait_type: { type: 'string' },
          value: {},
        },
      },
    },
  },
};

const ajv = new Ajv();
const validateMetadata = ajv.compile(schema);

export default validateMetadata;
