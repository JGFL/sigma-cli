import { Toolbox } from 'gluegun/build/types/domain/toolbox';

import { Responses } from '../types';
import cCls from '../utils/consoleColors';

const generateExtension = (toolbox: Toolbox) => {
  const { template, print, strings, prompt, createReact } = toolbox;

  const generateFunc = async () => {
    const askProjectType = {
      type: 'select',
      name: 'projectType',
      message: 'Project Type',
      choices: ['React', 'React Native', 'Expo'],
    };

    const askProjectName = {
      type: 'input',
      name: 'projectName',
      message: 'Project Name',
      default: 'awesome-project',
    };

    const askTypescript = {
      type: 'select',
      name: 'useTypescript',
      message: 'Use Typescript?',
      choices: ['Yes', 'No'],
    };

    const askComponentPath = {
      type: 'input',
      name: 'componentsPath',
      message: 'Components Path:',
      default: 'src/components',
    };

    const askPagesPath = {
      type: 'input',
      name: 'pagesPath',
      message: 'Components Path:',
      default: 'src/pages',
    };

    print.warning('React Native and Expo work in progress!');

    const questions = [
      askProjectType,
      askProjectName,
      askTypescript,
      askComponentPath,
      askPagesPath,
    ];
    const responses: Responses = await prompt.ask(questions);

    if(responses.projectType !== 'React') {
      return print.error('React Native and Expo work in progress! You can use React only!');
    }

    if(responses.projectType) {
      print.info(
        '{\n'
        + `  projectType:    ${cCls.bright + cCls.tc.blue + responses.projectType + cCls.reset},\n`
        + `  projectName:    ${cCls.bright + cCls.tc.green + strings.kebabCase(responses.projectName) + cCls.reset},\n`
        + `  useTypescript:  ${cCls.bright + cCls.tc.blue + responses.useTypescript + cCls.reset},\n`
        + `  componentsPath: ${cCls.bright + cCls.tc.green + responses.componentsPath + cCls.reset},\n`
        + `  pagesPath:      ${cCls.bright + cCls.tc.green + responses.pagesPath + cCls.reset}\n`
        + '}',
      );
    }

    if(!await prompt.confirm('All ok?', true)) {
      return print.error('Operation aborted!');
    }

    await createReact(responses);

    await template.generate({
      template: '.sigmaconfig.ejs',
      target: `./${strings.kebabCase(responses.projectName)}/.sigmaconfig.json`,
      props: {
        projectType: strings.kebabCase(responses.projectType),
        useTypescript: responses.useTypescript === 'Yes' ? 'true' : 'false',
        componentsPath: responses.componentsPath,
        pagesPath: responses.pagesPath,
      },
    });

    return print.success('Sigma cli configured for this project!');
  };

  toolbox.generateProject = generateFunc;
};

export default generateExtension;
