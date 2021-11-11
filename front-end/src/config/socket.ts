import io from 'socket.io-client';
import { config } from './config';

class SocketClient {
  io: any;

  constructor(private readonly baseURL: string) {}

  connect(id: string) {
    this.io = io(this.baseURL);

    this.io.on('connect_error', (error: Error) => {
      throw new Error(`socket error ${error.message}`);
    });

    this.io.emit('join', { roomId: id }, (error: Error) => {
      console.log('join error', error.message);
    });
  }

  close() {
    this.io.close();
  }

  compile(source: string, inputData: string, language: string) {
    let realLanguage;
    switch (language) {
      case 'C++':
        realLanguage = 'cpp';
        break;
      case 'Java':
        realLanguage = 'java';
        break;
      case 'JavaScript':
        realLanguage = 'nodejs';
        break;
      case 'Python':
        realLanguage = 'python3';
        break;
      default:
        throw new Error(`unknown language ${language}`);
    }

    this.io.emit(
      'compile',
      {
        source,
        input_data: inputData,
        language: realLanguage
      },
      (error: Error) => {
        console.log('compile send error', error.message);
      }
    );
  }
}

export default new SocketClient(config.compileApi);
