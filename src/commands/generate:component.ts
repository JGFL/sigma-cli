import { GluegunCommand } from 'gluegun';

const command: GluegunCommand = {
  name: 'generate:component',
  alias: ['g:c'],
  description: 'Generate React/React Native/Expo component',
  run: async ({ parameters, print, createComponent, filesystem }) => {
    if(!filesystem.exists('.sigmaconfig.json')) {
      return print.error('Please execute sigma --init to configure sigma in project');
    }

    const { projectType, useTypescript, componentsPath } = await filesystem.read('.sigmaconfig.json', 'json');
    const name = parameters.first;

    await createComponent(componentsPath, name, useTypescript, projectType);

    return null;
  },
};

export default command;
