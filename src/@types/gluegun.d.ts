import 'gluegun';

import { Responses } from '../types';

declare namespace Gluegun {
  export interface GluegunToolbox {
    initProject(): void;
    generateProject(): void;
    createComponent(folder: string, name: string, useTypescript: boolean, projectType: string): void;
    createReact(responses: Responses): void;
    createReactNative(responses: Responses): void;
    createExpo(responses: Responses): void;
  }
}
