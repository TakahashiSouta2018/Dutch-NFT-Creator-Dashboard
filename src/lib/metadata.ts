import { AttributeI, ConstrucMetadataI, NftDataI } from '@/types';
import Ajv from 'ajv';
import assert from 'assert';

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
export const validateMetadata = ajv.compile(schema);

export const construcMetadata = ({
  imageNames,
  csvFileContents,
  folderCID,
  animationUrlNames,
  collectionMetadata,
  mintChannel = 'Loopring',
}: ConstrucMetadataI): NftDataI[] => {
  return imageNames.map((imageName, index) => {
    const csvFileContent = csvFileContents[index];

    const splitProperties = csvFileContent.properties.split(',');

    const properties: Record<string, string> = {};
    const attributes: AttributeI[] = [];

    splitProperties.forEach((splitProperty) => {
      const pair = splitProperty.split(':');
      assert(pair.length === 2, 'Invalid Properties');

      const propertyKey = splitProperty.split(':')[0].trim();
      const propertyValue = splitProperty.split(':')[1].trim();

      properties[propertyKey] = propertyValue;
      attributes.push({ trait_type: propertyKey, value: propertyValue });
    });

    return {
      image: `ipfs://${folderCID}/${imageName}`,
      animation_url: `ipfs://${folderCID}/${animationUrlNames[index]}`,
      name: csvFileContent.name,
      royalty_percentage: Number(csvFileContent.royalties),
      description: csvFileContent.description,
      collection_metadata: collectionMetadata,
      mint_channel: mintChannel,
      properties,
      attributes: attributes,
    };
  });
};
