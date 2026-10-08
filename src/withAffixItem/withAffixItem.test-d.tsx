import type { AffixItemOptions } from '@fringeworks/style-layouts-adornment/affix';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { describe, expectTypeOf, it } from 'vitest';
import withAffixItem from './withAffixItem';

/**
 * JSXが型として成立するかのみを検証するためのヘルパー
 */
const render = (node: ReactNode): ReactNode => node;

// 型引数を明示せずに生成する
const AffixSpan = withAffixItem('span');

type AffixSpanProps = ComponentProps<typeof AffixSpan>;

describe('withAffixItem', () => {
  it('装飾のオプションを`withLayoutBase`へ引き渡せている', () => {
    expectTypeOf<AffixItemOptions>().toExtend<AffixSpanProps>();
    render(<AffixSpan side="top" alignX="left" gap={8} id="label" />);
    render(<AffixSpan side="inside" alignX="right" alignY="top" inset={-8} />);
  });

  it('sideは必須', () => {
    // @ts-expect-error `side`の指定が無い
    render(<AffixSpan />);
  });

  it('sideごとに指定できるオプションが絞り込まれる', () => {
    // @ts-expect-error top / bottomにalignYは指定できない
    render(<AffixSpan side="top" alignY="top" />);
    // @ts-expect-error left / rightにalignXは指定できない
    render(<AffixSpan side="left" alignX="left" />);
    // @ts-expect-error 外側にinsetは指定できない
    render(<AffixSpan side="right" inset={4} />);
    // @ts-expect-error 内側にgapは指定できない
    render(<AffixSpan side="inside" gap={4} />);
  });

  it('対象コンポーネントのプロパティとrefを引き継ぐ', () => {
    expectTypeOf<{ side: 'top'; id: string }>().toExtend<AffixSpanProps>();
    expectTypeOf<
      ComponentRef<typeof AffixSpan>
    >().toEqualTypeOf<HTMLSpanElement>();
  });
});
