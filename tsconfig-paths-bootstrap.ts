import * as path from 'path';
import * as moduleAlias from 'module-alias';

moduleAlias.addAliases({
  '@drink': path.resolve(__dirname + '/src'),
});