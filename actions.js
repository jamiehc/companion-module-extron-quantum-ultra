module.exports = function (self) {
	return {
	  changeLayout: {
		name: 'Change Layout',
		options: [
		  {
			type: 'dropdown',
			label: 'Layout',
			id: 'layout',
			choices: [
			  { id: '1', label: 'Layout 1' },
			  { id: '2', label: 'Layout 2' }
			  // Add more layouts as needed
			],
			default: '1'
		  }
		],
		callback: async (event) => {
		  const opt = event.options;
		  const cmd = `SET LAYOUT ${opt.layout}\n`;
  
		  try {
			await self.device.sendCommand(cmd);
		  } catch (error) {
			self.log('error', `Error sending command: ${error.message}`);
		  }
		}
	  }
	};
  };  