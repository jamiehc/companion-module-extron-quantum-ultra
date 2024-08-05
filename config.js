const config = [
    {
      type: 'textinput',
      id: 'host',
      label: 'Device IP',
      width: 6,
      default: '192.168.1.100',
      regex: self.REGEX_IP
    },
    {
      type: 'textinput',
      id: 'port',
      label: 'Port Number',
      width: 3,
      default: '23',
      regex: self.REGEX_PORT
    }
  ];
  
  module.exports = config;
  