import createTsdownConfig from '@fringeworks/dev/createTsdownConfig';

export default createTsdownConfig({
  css: true,
  exports: {
    extraExports: { './*.css': './css/*.css' },
  },
});
