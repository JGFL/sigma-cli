import { print } from 'gluegun';
import { Toolbox } from 'gluegun/build/types/domain/toolbox';

import { Responses } from '../types';

const createReactExtension = (toolbox: Toolbox) => {
  const { template, strings } = toolbox;

  const createReactFunc = async (responses: Responses) => {
    const projectName = strings.kebabCase(responses.projectName);
    const useTypescript = responses.useTypescript === 'Yes';
    const templateBasePath = useTypescript ? 'react-template-ts' : 'react-template';

    /* ./ */
    await template.generate({
      template: `${useTypescript ? 'react-template-ts' : 'react-template'}/package.json.ejs`,
      target: `${projectName}/package.json`,
      props: { projectName },
    });

    await template.generate({
      template: `${templateBasePath}/.gitignore.ejs`,
      target: `${projectName}/.gitignore`,
    });

    await template.generate({
      template: `${templateBasePath}/.eslintrc.json.ejs`,
      target: `${projectName}/.eslintrc.json`,
    });

    await template.generate({
      template: `${templateBasePath}/.editorconfig.ejs`,
      target: `${projectName}/.editorconfig`,
    });

    const languageConfigFile = `${useTypescript ? 'tsconfig' : 'jsconfig'}.json`;
    await template.generate({
      template: `${templateBasePath}/${languageConfigFile}.ejs`,
      target: `${projectName}/${languageConfigFile}`,
    });

    const pathConfigFile = `${useTypescript ? 'config-overrides' : 'craco.config'}.js`;
    await template.generate({
      template: `${templateBasePath}/${pathConfigFile}.ejs`,
      target: `${projectName}/${pathConfigFile}`,
    });

    /* ./src */
    const filesExtension = useTypescript ? '.tsx' : '.js';

    await template.generate({
      template: `${templateBasePath}/src/App${filesExtension}.ejs`,
      target: `${projectName}/src/App${filesExtension}`,
    });

    await template.generate({
      template: `${templateBasePath}/src/index${filesExtension}.ejs`,
      target: `${projectName}/src/index${filesExtension}`,
    });

    /* ./public */
    await template.generate({
      template: `${templateBasePath}/public/favicon.ico.ejs`,
      target: `${projectName}/public/favicon.ico`,
    });

    await template.generate({
      template: `${templateBasePath}/public/index.html.ejs`,
      target: `${projectName}/public/index.html`,
    });

    if(useTypescript) {
      await template.generate({
        template: 'react-template-ts/tsconfig.paths.json.ejs',
        target: `${projectName}/tsconfig.paths.json`,
      });

      await template.generate({
        template: 'react-template-ts/src/react-app-env.d.ts.ejs',
        target: `${projectName}/src/react-app-env.d.ts`,
      });
    }

    print.info(`run cd ${projectName}`);
    print.info('run yarn');
    print.info('run yarn upgrade');
  };

  toolbox.createReact = createReactFunc;
};

export default createReactExtension;
