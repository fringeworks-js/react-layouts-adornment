import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { describe, expectTypeOf, it } from 'vitest';
import type { LayoutFunction } from '../applyLayout';
import withLayoutBase from './withLayoutBase';

/**
 * テスト用のレイアウトオプション
 */
type TestLayoutOptions = {
  /**
   * 余白
   */
  gap?: number;

  /**
   * 並べる方向
   */
  direction?: 'x' | 'y';
};

/**
 * テスト用のレイアウト
 */
const testLayout: LayoutFunction<TestLayoutOptions> = () => ({});

/**
 * テスト用のコンポーネント
 *
 * - `title`: 必須のプロパティ
 * - `gap`: レイアウトオプションと名前が衝突するプロパティ
 */
const Card = forwardRef<HTMLElement, { title: string; gap?: string }>(
  () => null,
);

/**
 * JSXが型として成立するかのみを検証するためのヘルパー
 */
const render = (node: ReactNode): ReactNode => node;

// 型引数を明示せずに生成する
const LayoutDiv = withLayoutBase('div', testLayout);
const LayoutCard = withLayoutBase(Card, testLayout);

type LayoutDivProps = ComponentProps<typeof LayoutDiv>;
type LayoutCardProps = ComponentProps<typeof LayoutCard>;

describe('withLayoutBase', () => {
  it('型引数を明示しなくてもレイアウトのオプションが型に反映される', () => {
    expectTypeOf<{ gap: number; direction: 'x' }>().toExtend<LayoutDivProps>();
    expectTypeOf<{ direction: 'z' }>().not.toExtend<LayoutDivProps>();
  });

  it('対象コンポーネントのプロパティを引き継ぐ', () => {
    expectTypeOf<{ id: string; lang: string }>().toExtend<LayoutDivProps>();
    expectTypeOf<{ id: number }>().not.toExtend<LayoutDivProps>();
  });

  it('対象コンポーネントの必須のプロパティは必須のまま引き継ぐ', () => {
    expectTypeOf<{ title: string; gap: number }>().toExtend<LayoutCardProps>();
    expectTypeOf<{ gap: number }>().not.toExtend<LayoutCardProps>();
    render(<LayoutCard title="タイトル" gap={8} />);
    // @ts-expect-error `title`の指定が無い
    render(<LayoutCard gap={8} />);
  });

  it('レイアウト機能が消費するプロパティを受け取れる', () => {
    expectTypeOf<{ className: string }>().toExtend<LayoutDivProps>();
  });

  it('未知のプロパティは受け付けない', () => {
    // `LooseDictionary`のようなインデックスシグネチャが混入すると検知できなくなる
    // @ts-expect-error 未知のプロパティは受け付けない
    render(<LayoutDiv typoProp={1} />);
    // @ts-expect-error react-layoutsの`scroll`は持たない
    render(<LayoutDiv scroll />);
  });

  it('名前が衝突するプロパティはレイアウトのオプションが優先される', () => {
    // `Card`の`gap?: string`ではなく`TestLayoutOptions`の`gap?: number`になる
    expectTypeOf<{ title: string; gap: number }>().toExtend<LayoutCardProps>();
    expectTypeOf<{
      title: string;
      gap: string;
    }>().not.toExtend<LayoutCardProps>();
  });

  it('refは対象コンポーネントから導出される', () => {
    expectTypeOf<
      ComponentRef<typeof LayoutDiv>
    >().toEqualTypeOf<HTMLDivElement>();
    expectTypeOf<
      ComponentRef<typeof LayoutCard>
    >().toEqualTypeOf<HTMLElement>();
  });

  it('displayNameを設定できる', () => {
    expectTypeOf(LayoutDiv).toHaveProperty('displayName');
  });
});
