import { ConfigSerivce } from '../config/config.service';
class Logger {
  constructor() {
    
  }
  public info(...message) {
    console.info(message);
  }
  public log(...message) {
    console.log(message);
  }
  public error(...message) {
    console.error(message);
  }
}

export const logger = new Logger();
