import config from 'config';

export function getConfig(configName:string) {
  return config.get(configName);
}
