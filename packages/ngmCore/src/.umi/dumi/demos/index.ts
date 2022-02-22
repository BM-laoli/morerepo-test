// @ts-nocheck
import React from 'react';
import { dynamic } from 'dumi';
import rawCode1 from '!!dumi-raw-code-loader!/Users/wcmismac020/Desktop/origin/lerna-repo/packages/ngmCore/src/Alert/demo/basic.tsx?dumi-raw-code';
import rawCode2 from '!!dumi-raw-code-loader!/Users/wcmismac020/Desktop/origin/lerna-repo/packages/ngmCore/src/Alert/index.tsx?dumi-raw-code';
import rawCode3 from '!!dumi-raw-code-loader!/Users/wcmismac020/Desktop/origin/lerna-repo/packages/ngmCore/src/Alert/style/index.ts?dumi-raw-code';
import rawCode4 from '!!dumi-raw-code-loader!/Users/wcmismac020/Desktop/origin/lerna-repo/packages/ngmCore/src/Alert/style/index.less?dumi-raw-code';

export default {
  'alert-basic': {
    component: dynamic({
      loader: async () => (await import(/* webpackChunkName: "demos_trelA" */'/Users/wcmismac020/Desktop/origin/lerna-repo/packages/ngmCore/src/Alert/demo/basic.tsx')).default,
      loading: () => null,
    }),
    previewerProps: {"sources":{"_":{"tsx":rawCode1},"index.tsx":{"import":"../../Alert/","content":rawCode2},"style/index.ts":{"import":"../style","content":rawCode3},"style/index.less":{"import":"./index.less","content":rawCode4}},"dependencies":{"react":{"version":"17.0.2"},"prop-types":{"version":"15.8.1"}},"componentName":"Alert","identifier":"alert-basic"},
  },
};
