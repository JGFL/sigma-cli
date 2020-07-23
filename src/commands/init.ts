import { GluegunCommand } from 'gluegun';

const command: GluegunCommand = {
  name: '--init',
  alias: ['-i'],
  description: 'Initialize sigma in existing project',
  run: () => {},
};

export default command;
