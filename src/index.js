import { createModule as exportedCreate } from './createModule';
import { connectModule as exportedConnect } from './connectModule';

export const createModule = exportedCreate;
export const connectModule = exportedConnect;


console.log(createModule, connectModule);
export default createModule;
