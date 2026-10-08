import type { AlignX, AlignY, Sizing } from '../_internal/adapter';

/**
 * レイアウト名
 */
export type LayoutName = 'affix' | 'sticker';

/*
 * storyのargs
 *
 * controlsの入力をそのまま受け取るため、数値も文字列で保持する。
 * オプションへの変換は`toAttributesObj`で行う。
 */

/**
 * sizingX / sizingYに相当するargs
 *
 * `none`の場合は指定しない
 */
export type SizingArgs = {
  sizingX?: Sizing | 'none';
  sizingY?: Sizing | 'none';
};

/**
 * レイアウトのオプションに相当するargs
 */
export type LayoutArgs = {
  gap?: string;
  gapX?: string;
  gapY?: string;
  inset?: string;
  insetX?: string;
  insetY?: string;
};

/**
 * 装飾の配置に相当するargs
 *
 * 各sideに装飾を1つずつ配置し、値はその装飾の位置を表す。`none`の場合は配置しない。
 */
export type ItemArgs = {
  /**
   * 上の装飾の横位置
   */
  top?: AlignX | 'none';

  /**
   * 下の装飾の横位置
   */
  bottom?: AlignX | 'none';

  /**
   * 左の装飾の縦位置
   */
  left?: AlignY | 'none';

  /**
   * 右の装飾の縦位置
   */
  right?: AlignY | 'none';

  /**
   * 内側の装飾の横位置
   */
  insideX?: AlignX | 'none';

  /**
   * 内側の装飾の縦位置
   */
  insideY?: AlignY;

  /**
   * 上の装飾で上書きするgap
   */
  topGap?: string;

  /**
   * 内側の装飾で上書きするinset
   */
  insideInset?: string;
};

/**
 * 表示確認用のargs
 */
export type DebugArgs = {
  /**
   * リサイズ可能な領域の幅
   */
  containerWidth?: string;

  /**
   * リサイズ可能な領域の高さ
   */
  containerHeight?: string;

  /**
   * コンテナーのサイズの決め方
   *
   * - auto: 幅は親に合わせ、高さは内容に合わせる
   * - fill: 幅も高さも親に合わせる
   */
  sizing?: 'auto' | 'fill';

  /**
   * コンテナのdisplay（stickerの確認用。affixではレイアウトが壊れるため使わない）
   *
   * `default`の場合は指定しない（divのため`block`）
   */
  display?:
    | 'default'
    | 'block'
    | 'inline-block'
    | 'flex'
    | 'inline-flex'
    | 'grid'
    | 'inline-grid';

  /**
   * 本体の種類
   *
   * - bar: 高さを固定し、幅は指定しない(プログレスバー)
   * - box: 幅と高さを固定する
   * - auto: 幅も高さも指定しない
   */
  main?: 'bar' | 'box' | 'auto';

  /**
   * 装飾の大きさ
   */
  itemSize?: 'small' | 'large';

  /**
   * コンテナの前後に文章を表示する（装飾が周りの要素と重なるかの確認用）
   */
  surroundings?: boolean;
};

/**
 * stickerの外側の装飾を中央に揃える方法を比較するためのargs
 */
export type CenteringArgs = {
  /**
   * 中央寄せの方法
   *
   * - translate: translateプロパティ（ライブラリの現在の実装）
   * - transform: transformプロパティ
   * - inset: 左右(上下)の位置を外側に広げてautoのmarginで寄せる
   */
  centering?: 'translate' | 'transform' | 'inset';

  /**
   * 装飾に指定するtransform（利用者がtransformを使う場合の再現）
   *
   * - scale / rotate: インラインスタイルで指定する（アニメーションライブラリなどを想定）
   * - pulse: CSSアニメーションで指定する
   */
  itemTransform?: 'none' | 'scale' | 'rotate' | 'pulse';

  /**
   * リサイズ可能な領域のoverflow（はみ出しがスクロール領域に影響するかの確認用）
   */
  stageOverflow?: 'visible' | 'auto';
};

export type StoryArgs = SizingArgs &
  LayoutArgs &
  ItemArgs &
  DebugArgs &
  CenteringArgs;

/**
 * スタイル
 *
 * DOMにもReactの`style`にもそのまま適用できるよう、値は文字列に統一する
 */
export type StyleObj = Record<string, string>;

/**
 * specのstoryのargs
 *
 * `main` / `mainCount` / `items` / `surroundings` 以外はコンテナのオプションとしてそのまま渡す
 */
export type TestStoryArgs = Record<string, unknown> & {
  /**
   * 本体のスタイル（未指定の場合は高さ40px。`mainClassName`を指定した場合はなし）
   */
  main?: StyleObj;

  /**
   * 本体のクラス（`debug.css`で大きさを指定する。インラインスタイルはsizingX / sizingYで上書きできないため）
   */
  mainClassName?: string;

  /**
   * コンテナのクラス（`debug.css`で大きさを指定する）
   */
  containerClassName?: string;

  /**
   * コンテナのスタイル
   */
  containerStyle?: StyleObj;

  /**
   * 本体の数
   */
  mainCount?: number;

  /**
   * 装飾
   *
   * `style`を指定した場合はデフォルトのスタイル（幅40px・高さ20px）を置き換える
   */
  items?: {
    id: string;
    options: Record<string, unknown>;
    style?: StyleObj;
    /**
     * 表示する文字列（未指定の場合はid）
     */
    text?: string;
  }[];

  /**
   * コンテナの前後に要素を置く（レイアウトへの影響の確認用）
   */
  surroundings?: boolean;
};
