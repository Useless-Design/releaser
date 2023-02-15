import { readConfig } from '../utils/file.js';

const configLoader = async () => {
  const config = await readConfig();
  console.log('5-「config-loader」', config);
};

export default configLoader;
