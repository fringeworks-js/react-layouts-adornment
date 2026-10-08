import indexes from '@fringeworks/dev/indexes';
import {
  CONSTANTS,
  PRIVATE,
  TEST_FILE,
} from '@fringeworks/dev/indexes/constants';

/**
 * 型テストのファイル
 * `TEST_FILE`は`*.test.*`のみを対象とするため別途除外する
 */
const TYPE_TEST_FILE = {
  valueType: 'base',
  conditions: /.*\.test-d\.(ts|tsx|js|jsx)$/i,
} as const;

indexes({
  exclude: [CONSTANTS, PRIVATE, TEST_FILE, TYPE_TEST_FILE],
});
