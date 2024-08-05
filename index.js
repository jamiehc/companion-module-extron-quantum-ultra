const net = require('net');
const config = require('./config');
const actions = require('./actions');

class ExtronQuantumUltra {
  constructor(config) {
    this.config = config;
    this.socket = null;
  }

  init() {
    this.connect();
  }

  connect() {
    this.socket = new net.Socket();
    this.socket.connect(this.config.port, this.config.host, () => {
      console.log('Connected to Extron Quantum Ultra');
    });

    this.socket.on('data', (data) => {
      console.log('Received:', data.toString());
    });

    this.socket.on('close', () => {
      console.log('Connection closed');
      setTimeout(() => this.connect(), 5000); // Reconnect after 5 seconds
    });

    this.socket.on('error', (err) => {
      console.error('Error:', err.message);
    });
  }

  async sendCommand(cmd) {
    return new Promise((resolve, reject) => {
      if (this.socket) {
        this.socket.write(cmd, 'utf8', (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      } else {
        reject(new Error('Socket not connected'));
      }
    });
  }
}

module.exports = {
  // Module definition
  name: 'Extron Quantum Ultra',
  id: 'extron-quantum-ultra',
  description: 'Controls the Extron Quantum Ultra video wall processor',
  version: '1.0.0',
  author: 'Your Name',

  init: function () {
    this.config = {
      host: this.config.host,
      port: this.config.port
    };

    this.device = new ExtronQuantumUltra(this.config);
    this.device.init();
  },

  // Exporting configuration and actions
  config: config,
  actions: actions(this),

  // Instance feedbacks, if any
  feedbacks: function (self) {
    return {};
  },

  // Instance variables, if any
  variables: function (self) {
    return {};
  },

  // Handle updated configurations
  updateConfig: function (config) {
    this.config = config;
    this.device = new ExtronQuantumUltra(this.config);
    this.device.init();
  },

  // Handle module shutdown
  destroy: function () {
    if (this.device && this.device.socket) {
      this.device.socket.destroy();
    }
  }
};