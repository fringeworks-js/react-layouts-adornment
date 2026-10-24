import { renderToStaticMarkup } from 'react-dom/server';
import {
  withAffixItem,
  withAffixLayout,
  withStickerItem,
  withStickerLayout,
} from './index';

const AffixDiv = withAffixLayout('div');
const AffixSpan = withAffixItem('span');
const StickerDiv = withStickerLayout('div');
const StickerSpan = withStickerItem('span');

/**
 * 描画した最初の要素のclass属性とstyle属性を取り出す
 *
 * - CSS変数の出力順に依存しないよう、styleは宣言ごとに分ける
 */
const renderAttributes = (
  node: React.ReactNode,
): { html: string; classNames: string[]; styles: string[] } => {
  const html = renderToStaticMarkup(node);
  const tag = /^<[^>]*>/.exec(html)?.[0] ?? '';
  const classNames = (/ class="([^"]*)"/.exec(tag)?.[1] ?? '')
    .split(' ')
    .filter(Boolean);
  const styles = (/ style="([^"]*)"/.exec(tag)?.[1] ?? '')
    .split(';')
    .filter(Boolean);
  return { html, classNames, styles };
};

describe('withAffixLayout', () => {
  test('コンテナのクラスとCSS変数を適用し、オプションはDOMへ渡さない', () => {
    const { html, classNames, styles } = renderAttributes(
      <AffixDiv
        sizingX="hug"
        sizingY="fill"
        gap={4}
        id="container"
        className="custom"
      />,
    );
    expect(classNames).toEqual([
      'custom',
      'frg-layout-affix',
      'frg-layout-affix-sizingX-hug',
      'frg-layout-affix-sizingY-fill',
    ]);
    expect(styles).toEqual(
      expect.arrayContaining([
        '--frg-layout-affix-gapX:4px',
        '--frg-layout-affix-gapY:4px',
      ]),
    );
    expect(html).toContain('id="container"');
    expect(html).not.toMatch(/ (sizingX|sizingY|gap)=/);
  });

  test('利用者のstyleとマージする', () => {
    const { styles } = renderAttributes(
      <AffixDiv inset={2} style={{ color: 'red' }} />,
    );
    expect(styles).toEqual(
      expect.arrayContaining([
        'color:red',
        '--frg-layout-affix-insetX:2px',
        '--frg-layout-affix-insetY:2px',
      ]),
    );
  });
});

describe('withAffixItem', () => {
  test('装飾のクラスとCSS変数を適用し、オプションはDOMへ渡さない', () => {
    const { html, classNames, styles } = renderAttributes(
      <AffixSpan side="top" alignX="left" gap={8}>
        label
      </AffixSpan>,
    );
    expect(classNames).toEqual([
      'frg-layout-affix-item',
      'frg-layout-affix-side-top',
      'frg-layout-affix-alignX-left',
    ]);
    expect(styles).toEqual(['--frg-layout-affix-gapY:8px']);
    expect(html).not.toMatch(/ (side|alignX|gap)=/);
  });
});

describe('withStickerLayout / withStickerItem', () => {
  test('stickerのクラスとCSS変数を適用する', () => {
    const container = renderAttributes(
      <StickerDiv sizingX="hug" sizingY="hug" inset={-8} />,
    );
    expect(container.classNames).toEqual([
      'frg-layout-sticker',
      'frg-layout-sticker-sizingX-hug',
      'frg-layout-sticker-sizingY-hug',
    ]);
    expect(container.styles).toEqual(
      expect.arrayContaining([
        '--frg-layout-sticker-insetX:-8px',
        '--frg-layout-sticker-insetY:-8px',
      ]),
    );

    const item = renderAttributes(
      <StickerSpan side="inside" alignX="right" alignY="top">
        3
      </StickerSpan>,
    );
    expect(item.classNames).toEqual([
      'frg-layout-sticker-item',
      'frg-layout-sticker-side-inside',
      'frg-layout-sticker-alignX-right',
      'frg-layout-sticker-alignY-top',
    ]);
  });
});

describe('HOCのオプション', () => {
  test('classNameとdisplayNameを指定できる', () => {
    const Label = withAffixItem('span', {
      className: 'label',
      displayName: 'Label',
    });
    expect(Label.displayName).toBe('Label');
    expect(renderAttributes(<Label side="bottom" />).classNames).toEqual([
      'label',
      'frg-layout-affix-item',
      'frg-layout-affix-side-bottom',
      'frg-layout-affix-alignX-center',
    ]);
  });
});
