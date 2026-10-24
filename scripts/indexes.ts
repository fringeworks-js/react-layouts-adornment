import { PRIVATE, TEST_FILE } from '@fringeworks/dev';
import generateIndexFiles from '@fringeworks/dev/generateIndexFiles';

/**
 * 型テストのファイル
 * `TEST_FILE`は`*.test.*`のみを対象とするため別途除外する
 */
const TYPE_TEST_FILE = {
  valueType: 'base',
  conditions: /.*\.test-d\.(ts|tsx|js|jsx)$/i,
} as const;

/**
 * with-css の index ファイル
 */
const WITH_CSS_INDEX = 'src/with-css/index.ts';

generateIndexFiles({
  exclude: [
    PRIVATE,
    TEST_FILE,
    TYPE_TEST_FILE,
    // with-css は CSS を読み込むため、ルートからは export しない（`./with-css` から読み込む）
    {
      valueType: 'path',
      conditions: /^src\/with-css$/,
    },
  ],
  // with-css では全体の CSS を読み込み、定数も読み込めるようにする
  // CSS は sideEffects の対象（CSS のファイル）にするため、JS のモジュールを介さずに直接 import する
  transform: (exports, { indexPath }) => {
    if (indexPath !== WITH_CSS_INDEX) {
      return exports;
    }
    // 副作用のための import の後に置く
    const imports = exports.filter((line) => line.startsWith('import '));
    const rest = exports.filter((line) => !line.startsWith('import '));
    return [
      "import '../css/styles.scss';",
      ...imports,
      "export * from '../constants';",
      ...rest,
    ];
  },
});
