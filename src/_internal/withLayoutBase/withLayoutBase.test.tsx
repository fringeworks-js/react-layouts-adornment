import type { LooseDictionary } from '@fringeworks/types';
import { createRef, forwardRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import withAffixItem from '../../withAffixItem';
import withAffixLayout from '../../withAffixLayout';
import withStickerItem from '../../withStickerItem';
import withStickerLayout from '../../withStickerLayout';

/**
 * 受け取ったプロパティ（refを除く）をJSONで出力するコンポーネント
 */
const Probe = ({ ref: _ref, ...props }: LooseDictionary) => (
  <pre>{JSON.stringify(props)}</pre>
);

/**
 * Probeが受け取ったプロパティを取り出す
 */
const renderProps = (node: React.ReactNode): LooseDictionary =>
  JSON.parse(
    renderToStaticMarkup(node)
      .replace(/^<pre>|<\/pre>$/g, '')
      .replace(/&quot;/g, '"'),
  );

describe('withLayoutBase', () => {
  describe('プロパティの振り分け', () => {
    test('コンテナは、そのレイアウトのオプション以外をコンポーネントへ渡す', () => {
      const Affix = withAffixLayout(Probe);
      const props = renderProps(
        <Affix gap={8} {...{ side: 'top', alignX: 'right', title: 'a' }} />,
      );
      expect(props).toMatchObject({ side: 'top', alignX: 'right', title: 'a' });
      expect(props).not.toHaveProperty('gap');
    });

    test('装飾は、コンテナのオプションをコンポーネントへ渡す', () => {
      const StickerItem = withStickerItem(Probe);
      const props = renderProps(
        <StickerItem side="top" {...{ sizingX: 'fill', sizingY: 'hug' }} />,
      );
      expect(props).toMatchObject({ sizingX: 'fill', sizingY: 'hug' });
      expect(props).not.toHaveProperty('side');
    });

    test('装飾は、レイアウトの関数へ渡さないプロパティも含めてオプションを取り除く', () => {
      // side="top"ではinsetを使わないが、装飾のオプションなのでコンポーネントへは渡さない
      const AffixItem = withAffixItem(Probe);
      const props = renderProps(
        <AffixItem side="top" {...{ inset: 4, id: 'label' }} />,
      );
      expect(props).toMatchObject({ id: 'label' });
      expect(props).not.toHaveProperty('inset');
    });

    test('classNameは、HOCのオプション・プロパティ・レイアウトの順に結合する', () => {
      const Sticker = withStickerLayout(Probe, { className: 'static' });
      const props = renderProps(<Sticker className="custom" />);
      expect(props['className']).toBe('static custom frg-layout-sticker');
    });
  });

  describe('スタイル', () => {
    const Affix = withAffixLayout('div');

    test('レイアウトのCSS変数とユーザーのstyleをマージする', () => {
      const html = renderToStaticMarkup(
        <Affix gap={8} style={{ color: 'red' }} />,
      );
      expect(html).toContain('--frg-layout-affix-gapX:8px');
      expect(html).toContain('color:red');
    });

    test('ユーザーのstyleがレイアウトのスタイルより優先される', () => {
      const html = renderToStaticMarkup(
        <Affix
          gap={8}
          style={{ '--frg-layout-affix-gapX': '20px' } as never}
        />,
      );
      expect(html).toContain('--frg-layout-affix-gapX:20px');
      expect(html).toContain('--frg-layout-affix-gapY:8px');
    });

    test('styleProp以外のstyleは、そのままコンポーネントへ渡す', () => {
      const SxAffix = withAffixLayout(Probe, { styleProp: 'sx' });
      const props = renderProps(
        <SxAffix gap={8} style={{ margin: 1 }} {...{ sx: { color: 'red' } }} />,
      );
      expect(props['style']).toEqual({ margin: 1 });
      expect(props['sx']).toMatchObject({
        color: 'red',
        '--frg-layout-affix-gapX': '8px',
        '--frg-layout-affix-gapY': '8px',
      });
    });
  });

  describe('ref', () => {
    test('対象のコンポーネントへrefを渡す', () => {
      let received: unknown;
      const Target = (props: LooseDictionary) => {
        received = props['ref'];
        return null;
      };
      const AffixItem = withAffixItem(Target);
      const ref = createRef<unknown>();
      renderToStaticMarkup(<AffixItem ref={ref} side="inside" />);
      expect(received).toBe(ref);
    });
  });

  describe('styleMergeMode', () => {
    test('appendを指定すると、レイアウトのスタイルとユーザーの指定を配列で結合する', () => {
      const SxItem = withAffixItem(Probe, {
        styleProp: 'sx',
        styleMergeMode: 'append',
      });
      const props = renderProps(
        <SxItem side="top" gap={8} {...{ sx: { color: 'red' } }} />,
      );
      // 後ろの要素が優先される（ユーザーの指定が末尾）
      expect(props['sx']).toEqual([
        { '--frg-layout-affix-gapY': '8px' },
        { color: 'red' },
      ]);
    });
  });

  describe('displayName', () => {
    test('HOCの名前と対象のコンポーネントの名前から作る', () => {
      const Named = forwardRef<HTMLDivElement>(() => null);
      Named.displayName = 'Named';
      function Card() {
        return null;
      }
      expect(withAffixLayout('div').displayName).toBe('withAffixLayout(div)');
      expect(withAffixItem(Named).displayName).toBe('withAffixItem(Named)');
      expect(withStickerLayout(Card).displayName).toBe(
        'withStickerLayout(Card)',
      );
      expect(withStickerItem('span').displayName).toBe('withStickerItem(span)');
    });

    test('名前の無いコンポーネントはUnknownにする', () => {
      expect(withAffixLayout(() => null).displayName).toBe(
        'withAffixLayout(Unknown)',
      );
    });

    test('オプションで指定した値を優先する', () => {
      expect(
        withAffixLayout('div', { displayName: 'MyAffix' }).displayName,
      ).toBe('MyAffix');
    });
  });
});
