import { GluegunToolbox } from 'gluegun/build/types/domain/toolbox';

const createComponentExtension = (toolbox: GluegunToolbox) => {
  const { template, print, strings } = toolbox;

  function handdleName(name: string) {
    const namePath = name.split('/');

    return namePath.map((path) => strings.pascalCase(path));
  }

  const createComponentFunc = async (folder: string, name: string, useTypescript: boolean, projectType: string) => {
    if(!name) {
      return print.error('Name must be specified');
    }

    if(!projectType || !folder) {
      return print.error('Please execute \'sigma -init\' to reconfigure sigma config file.');
    }

    const isRn = projectType === 'react-native' || projectType === 'expo';

    const finalName = handdleName(name);
    const componentPath = finalName.map((path) => strings.pascalCase(path)).join('/');

    // Generate index
    await template.generate({
      template: 'component-react.ejs',
      target: `${folder}/${componentPath}/index.${useTypescript ? 'tsx' : 'js'}`,
      props: {
        name: finalName[finalName.length - 1],
        tsType: useTypescript ? ': React.FC' : '',
      },
    });

    // Generate styles
    await template.generate({
      template: 'styles-react.ejs',
      target: `${folder}/${componentPath}/styles.${useTypescript ? 'ts' : 'js'}`,
      props: {
        native: isRn ? '/native' : '',
        styledItem: isRn ? 'View' : 'div',
        name: finalName[finalName.length - 1],
      },
    });

    print.success(`Generated '${finalName[finalName.length - 1]}' on '${folder}/${componentPath}'!`);
    print.success(`For react${isRn ? '-native/expo' : 'js'}, using ${useTypescript ? 'typescript' : 'javascript'} template!`);

    return null;
  };

  toolbox.createComponent = createComponentFunc;
};

export default createComponentExtension;
