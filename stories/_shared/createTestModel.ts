import './debug.css';
import type { StyleObj, TestStoryArgs } from './types';

/**
 * specの描画内容
 *
 * DOMやReactに依存しない値のみで構成する。
 * 各要素はe2eテストから`data-testid`で特定する。
 */
export type TestModel = {
  /**
   * レイアウトのオプション
   */
  options: Record<string, unknown>;

  /**
   * コンテナを囲む要素のスタイル（コンテナの外に出る装飾が画面内に収まるように余白を設ける）
   */
  wrapperStyle: StyleObj;

  /**
   * コンテナのクラス（レイアウトのクラスは含まない）
   */
  containerClassName: string;

  /**
   * コンテナのスタイル（レイアウトのスタイルは含まない）
   */
  containerStyle: StyleObj;

  /**
   * 本体
   */
  mains: {
    testId: string;
    className: string;
    style: StyleObj;
  }[];

  /**
   * 装飾（本体より前に描画する）
   */
  items: {
    testId: string;
    text: string;
    options: Record<string, unknown>;
    style: StyleObj;
  }[];

  /**
   * コンテナの前後に置く要素（置かない場合は空）
   */
  surroundings: {
    testId: string;
    style: StyleObj;
  }[];
};

const MAIN_STYLE: StyleObj = {
  height: '40px',
};

const ITEM_STYLE: StyleObj = {
  width: '40px',
  height: '20px',
};

const SURROUNDING_STYLE: StyleObj = {
  height: '20px',
  backgroundColor: 'rgba(128, 128, 128, 0.3)',
};

/**
 * specのstoryのargsから描画内容を作る
 * @param args specのstoryのargs
 * @returns
 */
export default function createTestModel(args: TestStoryArgs): TestModel {
  const {
    mainClassName = '',
    main = mainClassName ? {} : MAIN_STYLE,
    containerClassName = '',
    containerStyle = {},
    mainCount = 1,
    items = [],
    surroundings = false,
    ...options
  } = args;

  return {
    options,
    wrapperStyle: {
      padding: '100px',
    },
    containerClassName,
    containerStyle: {
      backgroundColor: 'rgba(128, 128, 128, 0.1)',
      ...containerStyle,
    },
    mains: Array.from({ length: mainCount }).map((_, index) => ({
      testId: index === 0 ? 'main' : `main-${index + 1}`,
      className: mainClassName,
      style: {
        backgroundColor: '#a9c6cf',
        ...main,
      },
    })),
    items: items.map(({ id, options, style, text }) => ({
      testId: id,
      text: text ?? id,
      options,
      style: {
        backgroundColor: 'rgba(237, 138, 15, 0.8)',
        ...(style ?? ITEM_STYLE),
      },
    })),
    surroundings: surroundings
      ? [
          { testId: 'before', style: SURROUNDING_STYLE },
          { testId: 'after', style: SURROUNDING_STYLE },
        ]
      : [],
  };
}
