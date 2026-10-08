import type { AffixOptions } from '@fringeworks/style-layouts-adornment/affix';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { describe, expectTypeOf, it } from 'vitest';
import withAffixLayout from './withAffixLayout';

/**
 * JSXが型として成立するかのみを検証するためのヘルパー
 */
const render = (node: ReactNode): ReactNode => node;

// 型引数を明示せずに生成する
const AffixDiv = withAffixLayout('div');

type AffixDivProps = ComponentProps<typeof AffixDiv>;

describe('withAffixLayout', () => {
  it('コンテナのオプションを`withLayoutBase`へ引き渡せている', () => {
    expectTypeOf<AffixOptions>().toExtend<AffixDivProps>();
    render(
      <AffixDiv
        sizingX="hug"
        sizingY="fill"
        gap={4}
        inset={-8}
        id="container"
      />,
    );
    // @ts-expect-error sizingXに指定できない値
    render(<AffixDiv sizingX="stretch" />);
    // @ts-expect-error 装飾のオプションは受け付けない
    render(<AffixDiv side="top" />);
  });

  it('対象コンポーネントのプロパティとrefを引き継ぐ', () => {
    expectTypeOf<{ id: string }>().toExtend<AffixDivProps>();
    expectTypeOf<
      ComponentRef<typeof AffixDiv>
    >().toEqualTypeOf<HTMLDivElement>();
  });
});
