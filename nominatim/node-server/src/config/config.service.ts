import * as fs from 'fs';
import * as dotenv from 'dotenv';
interface DatabaseInfo {
  database: string;
  user: string;
  password: string;
  host: string;
  port: number;
}
interface EnvConfig {
  PORT: number;
  bodyLimit: string;

  nodeEnv: string;
  redisHost: string;
  redisPort: string;
  
}
class ConfigServiceClass {
  public readonly env: EnvConfig;

  constructor(filePath?: string) {
    // console.log('filepath', filePath);
    const config = dotenv.parse(fs.readFileSync(filePath ? filePath : '.env'));
    // console.log('config', config);
    // this.envConfig = this.validateInput(config);
    this.env = {
      PORT: config.PORT,
      bodyLimit: config.bodyLimit,
      
      nodeEnv: config.NODE_ENV,
      redisHost: config.redisHost,
      redisPort: config.redisPort,
      
    };
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    return null;
  }
}

export const ConfigSerivce = new ConfigServiceClass();
