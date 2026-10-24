import type { StickerOptions } from '@fringeworks/style-layouts-adornment/sticker';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { describe, expectTypeOf, it } from 'vitest';
import withStickerLayout from './withStickerLayout';

/**
 * JSXが型として成立するかのみを検証するためのヘルパー
 */
const render = (node: ReactNode): ReactNode => node;

// 型引数を明示せずに生成する
const StickerDiv = withStickerLayout('div');

type StickerDivProps = ComponentProps<typeof StickerDiv>;

describe('withStickerLayout', () => {
  it('コンテナのオプションを`withLayoutBase`へ引き渡せている', () => {
    expectTypeOf<StickerOptions>().toExtend<StickerDivProps>();
    render(
      <StickerDiv
        sizingX="hug"
        sizingY="fill"
        gap={4}
        inset={-8}
        id="container"
      />,
    );
    // @ts-expect-error sizingXに指定できない値
    render(<StickerDiv sizingX="stretch" />);
    // @ts-expect-error 装飾のオプションは受け付けない
    render(<StickerDiv side="top" />);
  });

  it('対象コンポーネントのプロパティとrefを引き継ぐ', () => {
    expectTypeOf<{ id: string }>().toExtend<StickerDivProps>();
    expectTypeOf<
      ComponentRef<typeof StickerDiv>
    >().toEqualTypeOf<HTMLDivElement>();
  });
});
