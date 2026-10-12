import { CONSTANTS, PRIVATE, TEST_FILE } from '@fringeworks/dev/constants';
import generateIndexFiles from '@fringeworks/dev/generateIndexFiles';

/**
 * 型テストのファイル
 * `TEST_FILE`は`*.test.*`のみを対象とするため別途除外する
 */
const TYPE_TEST_FILE = {
  valueType: 'base',
  conditions: /.*\.test-d\.(ts|tsx|js|jsx)$/i,
} as const;

generateIndexFiles({
  exclude: [CONSTANTS, PRIVATE, TEST_FILE, TYPE_TEST_FILE],
});
