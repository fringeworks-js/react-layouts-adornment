import type { StickerItemOptions } from '@fringeworks/style-layouts-adornment/sticker';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { describe, expectTypeOf, it } from 'vitest';
import withStickerItem from './withStickerItem';

/**
 * JSXが型として成立するかのみを検証するためのヘルパー
 */
const render = (node: ReactNode): ReactNode => node;

// 型引数を明示せずに生成する
const StickerSpan = withStickerItem('span');

type StickerSpanProps = ComponentProps<typeof StickerSpan>;

describe('withStickerItem', () => {
  it('装飾のオプションを`withLayoutBase`へ引き渡せている', () => {
    expectTypeOf<StickerItemOptions>().toExtend<StickerSpanProps>();
    render(<StickerSpan side="top" alignX="left" gap={8} id="label" />);
    render(
      <StickerSpan side="inside" alignX="right" alignY="top" inset={-8} />,
    );
  });

  it('sideは必須', () => {
    // @ts-expect-error `side`の指定が無い
    render(<StickerSpan />);
  });

  it('sideごとに指定できるオプションが絞り込まれる', () => {
    // @ts-expect-error top / bottomにalignYは指定できない
    render(<StickerSpan side="top" alignY="top" />);
    // @ts-expect-error left / rightにalignXは指定できない
    render(<StickerSpan side="left" alignX="left" />);
    // @ts-expect-error top / bottomにgapXは指定できない
    render(<StickerSpan side="bottom" gapX={4} />);
    // @ts-expect-error left / rightにgapYは指定できない
    render(<StickerSpan side="right" gapY={4} />);
    // @ts-expect-error 外側にinsetは指定できない
    render(<StickerSpan side="right" inset={4} />);
    // @ts-expect-error 内側にgapは指定できない
    render(<StickerSpan side="inside" gap={4} />);
  });

  it('対象コンポーネントのプロパティとrefを引き継ぐ', () => {
    expectTypeOf<{ side: 'top'; id: string }>().toExtend<StickerSpanProps>();
    expectTypeOf<
      ComponentRef<typeof StickerSpan>
    >().toEqualTypeOf<HTMLSpanElement>();
  });
});
