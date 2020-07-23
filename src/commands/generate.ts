import { GluegunCommand } from 'gluegun';

const command: GluegunCommand = {
  name: '--generate',
  alias: ['-g'],
  description: 'Generate project with sigma template',
  run: () => {},
};

export default command;
