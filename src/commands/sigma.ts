import { GluegunCommand } from 'gluegun';

const command: GluegunCommand = {
  name: 'sigma',
  run: async ({ print, parameters, generateProject, initProject }) => {
    if(parameters.options.init || parameters.options.i) {
      initProject();

      return;
    }

    if(parameters.options.generate || parameters.options.g) {
      generateProject();

      return;
    }

    print.success('Welcome to Sigma! A cli to create React/React Native/Expo components');
    print.info('use sigma -h to see all commands');
  },
};

export default command;
