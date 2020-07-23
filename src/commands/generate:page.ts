import { GluegunCommand } from 'gluegun';

const command: GluegunCommand = {
  name: 'generate:page',
  alias: ['g:p'],
  description: 'Generate React/React Native/Expo pages',
  run: async ({ parameters, print, createComponent, filesystem }) => {
    if(!filesystem.exists('.sigmaconfig.json')) {
      return print.error('Please execute sigma --init to configure sigma in project');
    }

    const { projectType, useTypescript, pagesPath } = await filesystem.read('.sigmaconfig.json', 'json');

    const name = parameters.first;

    await createComponent(pagesPath, name, useTypescript, projectType);

    return null;
  },
};
export default command;
