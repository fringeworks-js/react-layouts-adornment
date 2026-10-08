# @fringeworks/react-layouts-adornment

`@fringeworks/react-layouts-adornment` は、本体となる要素の周りや上にラベルやバッジなどの装飾をCSSで配置する、誰かにとっては便利なReact向けのライブラリです。\
プロパティに応じたクラス名とCSS変数を自動的に設定するHOCを提供します。

**[English README is available here](./README.md)**

## 特徴

- [`@fringeworks/style-layouts-adornment`](https://github.com/fringeworks-js/style-layouts-adornment/blob/main/README.ja.md) のReact版
- 任意のコンポーネントをコンテナや装飾にできるHOC
- オプションの名前と値は `@fringeworks/style-layouts-adornment` と同じ
- 本体にはスタイルをほとんど当てない（配置に必要な指定のみ、詳細度0）
- SSR / React Server Components対応
- TypeScriptによる完全な型サポート（`side` に応じて指定できるプロパティが絞り込まれる）

`@fringeworks/react-layouts` シリーズのライブラリですが、`@fringeworks/react-layouts` とは独立して使用できます。

## インストール

```bash
npm install @fringeworks/react-layouts-adornment
# または
pnpm add @fringeworks/react-layouts-adornment
```

## 使い方

各レイアウトは、コンテナ用のHOC（`with<レイアウト名>Layout`）と装飾用のHOC（`with<レイアウト名>Item`）の組で提供します。装飾用のHOCを通していない子要素が本体になります。

```tsx
import {
  withAffixItem,
  withAffixLayout,
} from '@fringeworks/react-layouts-adornment';

// ※ classNameやstyle（CSS変数用）を透過するコンポーネントである必要があります
const AffixBox = withAffixLayout('div');
const AffixLabel = withAffixItem('span');
```

```tsx
<AffixBox gap={4} sizingX="fill">
  <ProgressBar value={45} />
  <AffixLabel side="top" alignX="left">
    Uploading...
  </AffixLabel>
  <AffixLabel side="right">3 / 10</AffixLabel>
  <AffixLabel side="inside">45%</AffixLabel>
</AffixBox>
```

### CSSの読み込み

HOCはCSSをインポートしないため、SSRやReact Server Componentsでもそのまま使用できます。CSSは別途インポートしてください。

```ts
// 全レイアウトをまとめてインポート
import '@fringeworks/react-layouts-adornment/styles.css';

// 必要なレイアウトのみインポート
import '@fringeworks/react-layouts-adornment/affix.css';
import '@fringeworks/react-layouts-adornment/sticker.css';
```

CSSを自動的に読み込みたい場合は `with-css` 配下のモジュールを使用してください。CSSのインポートを扱えるバンドラーが必要です。

```ts
import {
  withAffixItem,
  withAffixLayout,
} from '@fringeworks/react-layouts-adornment/with-css';
```

## 本体と装飾

- 装飾用のHOCを通していない子要素が本体になります
- `sizingX` / `sizingY` を指定しない場合、本体に当てるスタイルは、レイアウトごとの配置に必要な最小限のものだけです。どれも詳細度0なので、本体に指定したスタイルが常に優先されます
- 本体は要素である必要があります。コンテナの直下に置いたテキストは本体として扱われません
- 装飾の位置は `side` で指定し、本体に対する揃え方を `alignX` / `alignY` で指定します

```
                 top
          ┌──────────────┐
    left  │    inside    │  right
          └──────────────┘
                bottom
```

## 大きさの決め方

コンテナの `sizingX`（横方向）と `sizingY`（縦方向）で、本体とコンテナの大きさの決め方を指定します。どのレイアウトでも同じ値を使い、縦と横で別々に指定できます。

| 値       | コンテナの大きさ                           | 本体の大きさ                                                         |
| -------- | ------------------------------------------ | -------------------------------------------------------------------- |
| 未指定   | 横は親要素に合わせ、縦は中身に合わせる     | 本体に触れない（幅を指定しない本体は横に広がり、それ以外はそのまま） |
| `'fill'` | 横は親要素に合わせ、縦は中身に合わせる     | コンテナに合わせて伸び縮みする                                       |
| `'keep'` | 横は親要素に合わせ、縦は中身に合わせる     | 本体の大きさのまま、コンテナの中央に置く                             |
| `'hug'`  | 本体（affix では本体と装飾）に合わせて縮む | 本体の大きさのまま                                                   |

```tsx
// プログレスバー: 幅はコンテナに合わせ、高さはバーのまま
<AffixBox sizingX="fill" sizingY="keep">…</AffixBox>

// アバターのバッジ: コンテナをアバターに合わせ、装飾をアバターに揃える
<StickerBox sizingX="hug" sizingY="hug">…</StickerBox>
```

`'fill'` / `'keep'` / `'hug'` を指定した場合の本体への影響や、コンテナの大きさの指定との優先順位などの詳細は、[`@fringeworks/style-layouts-adornment` の「大きさの決め方」](https://github.com/fringeworks-js/style-layouts-adornment/blob/main/README.ja.md#大きさの決め方) を参照してください。

## レイアウト種別

| レイアウト | 上下左右の装飾の場所         | 向いている用途                                             |
| ---------- | ---------------------------- | ---------------------------------------------------------- |
| `affix`    | レイアウト上の場所を確保する | プログレスバーのラベルなど、周りの要素と重ねたくない装飾   |
| `sticker`  | 場所を確保せず、上に貼る     | 通知バッジなど、装飾の有無でレイアウトを動かしたくない装飾 |

各レイアウトの配置・間隔・制限事項の詳細は、[`@fringeworks/style-layouts-adornment` の「レイアウト種別」](https://github.com/fringeworks-js/style-layouts-adornment/blob/main/README.ja.md#レイアウト種別) を参照してください。

### `affix`

本体の上下左右や内側に装飾を配置します。上下左右の装飾はレイアウト上の場所を確保するため、周りの要素と重なりません。

```tsx
import {
  withAffixItem,
  withAffixLayout,
} from '@fringeworks/react-layouts-adornment';

const AffixBox = withAffixLayout('div');
const AffixLabel = withAffixItem('span');

// ----------------------

<AffixBox gap={4} inset={4}>
  <Main />
  <AffixLabel side="top" alignX="left" gap={16}>
    Title
  </AffixLabel>
  <AffixLabel side="inside" alignX="right" alignY="top">
    New
  </AffixLabel>
</AffixBox>;
```

### `sticker`

本体の上下左右や内側に装飾を貼り付けます。装飾はレイアウト上の場所を確保しないため、装飾の有無や大きさによって本体の大きさや周りの要素の配置は変わりません。

```tsx
import {
  withStickerItem,
  withStickerLayout,
} from '@fringeworks/react-layouts-adornment';

const StickerBox = withStickerLayout('div');
const Badge = withStickerItem('span');

// ----------------------

<StickerBox sizingX="hug" sizingY="hug" inset={-8}>
  <Avatar />
  <Badge side="inside" alignX="right" alignY="top">
    3
  </Badge>
</StickerBox>;
```

## API

### `withAffixLayout` / `withStickerLayout`

```ts
withAffixLayout<C extends ElementType>(Component: C, options?: WithAffixLayoutOptions): AffixLayoutComponent<C>
withStickerLayout<C extends ElementType>(Component: C, options?: WithStickerLayoutOptions): StickerLayoutComponent<C>
```

コンポーネントにコンテナの機能を追加します。

| 引数        | 型                                                    | 説明                                      |
| ----------- | ----------------------------------------------------- | ----------------------------------------- |
| `Component` | `C`                                                   | コンテナにするコンポーネントまたはタグ名  |
| `options?`  | `WithAffixLayoutOptions` / `WithStickerLayoutOptions` | 下記の[HOCのオプション](#hocのオプション) |

作成したコンポーネントは、元のコンポーネントのプロパティに加えて、次のプロパティを受け付けます。これらのプロパティは元のコンポーネントには渡されません。

| プロパティ   | 型                       | 説明                                                      |
| ------------ | ------------------------ | --------------------------------------------------------- |
| `sizingX?`   | [`Sizing`](#sizing-の値) | 横方向の大きさの決め方（未指定の場合は本体に触れない）    |
| `sizingY?`   | [`Sizing`](#sizing-の値) | 縦方向の大きさの決め方（未指定の場合は本体に触れない）    |
| `gap?`       | `number`                 | 本体と上下左右の装飾との間隔 (px,横縦共通)                |
| `gapX?`      | `number`                 | 本体と左右の装飾との間隔 (px)                             |
| `gapY?`      | `number`                 | 本体と上下の装飾との間隔 (px)                             |
| `inset?`     | `number`                 | 本体の端から内側の装飾までの距離 (px,横縦共通,負の値も可) |
| `insetX?`    | `number`                 | 本体の左右の端から内側の装飾までの距離 (px)               |
| `insetY?`    | `number`                 | 本体の上下の端から内側の装飾までの距離 (px)               |
| `className?` | `string`                 | レイアウトのクラスと合わせて適用するクラス                |
| `style?`     | `CSSProperties`          | レイアウトのCSS変数と合わせて適用するスタイル             |

### `withAffixItem` / `withStickerItem`

```ts
withAffixItem<C extends ElementType>(Component: C, options?: WithAffixItemOptions): AffixItemComponent<C>
withStickerItem<C extends ElementType>(Component: C, options?: WithStickerItemOptions): StickerItemComponent<C>
```

コンポーネントに装飾の機能を追加します。引数は [`withAffixLayout`](#withaffixlayout--withstickerlayout) と同じです。

作成したコンポーネントは、元のコンポーネントのプロパティに加えて、次のプロパティを受け付けます。指定できるプロパティは `side` によって異なり、指定できない組み合わせ（`side="top"` に `alignY` を指定するなど）は型エラーになります。

| プロパティ   | 型                       | 説明                                                       | 指定できる `side`                           |
| ------------ | ------------------------ | ---------------------------------------------------------- | ------------------------------------------- |
| `side`       | [`Side`](#side-の値)     | 本体に対する配置                                           | すべて                                      |
| `alignX?`    | [`AlignX`](#alignx-の値) | 横位置 (デフォルト `'center'`)                             | `'top'` / `'bottom'` / `'inside'`           |
| `alignY?`    | [`AlignY`](#aligny-の値) | 縦位置 (デフォルト `'middle'`)                             | `'left'` / `'right'` / `'inside'`           |
| `gap?`       | `number`                 | 本体との間隔。コンテナの値を上書きする (px,横縦共通)       | `'top'` / `'bottom'` / `'left'` / `'right'` |
| `gapX?`      | `number`                 | 同上 (px,横方向)                                           | `'top'` / `'bottom'` / `'left'` / `'right'` |
| `gapY?`      | `number`                 | 同上 (px,縦方向)                                           | `'top'` / `'bottom'` / `'left'` / `'right'` |
| `inset?`     | `number`                 | 本体の端からの距離。コンテナの値を上書きする (px,横縦共通) | `'inside'`                                  |
| `insetX?`    | `number`                 | 同上 (px,横方向)                                           | `'inside'`                                  |
| `insetY?`    | `number`                 | 同上 (px,縦方向)                                           | `'inside'`                                  |
| `className?` | `string`                 | レイアウトのクラスと合わせて適用するクラス                 | すべて                                      |
| `style?`     | `CSSProperties`          | レイアウトのCSS変数と合わせて適用するスタイル              | すべて                                      |

### HOCのオプション

各HOCの第2引数に指定できるオプションです。

| オプション        | 型                    | 説明                                                                                                          |
| ----------------- | --------------------- | ------------------------------------------------------------------------------------------------------------- |
| `displayName?`    | `string`              | 作成したコンポーネントの `displayName`（デフォルト `withLayout(元のコンポーネント名)`）                       |
| `className?`      | `string`              | 常に適用するクラス                                                                                            |
| `styleProp?`      | `string`              | CSS変数を適用するプロパティの名前（デフォルト `'style'`）。`css` / `sx` などのCSS-in-JSのプロパティにも使える |
| `styleMergeMode?` | `'merge' \| 'append'` | 利用者のスタイルとの組み合わせ方（デフォルト `'merge'`）。詳細は `@fringeworks/react-style-proxy` を参照      |

### `Side` の値

| 値         | 配置               |
| ---------- | ------------------ |
| `'top'`    | 本体の上           |
| `'bottom'` | 本体の下           |
| `'left'`   | 本体の左           |
| `'right'`  | 本体の右           |
| `'inside'` | 本体の内側に重ねる |

### `AlignX` の値

`'left'` | `'center'` | `'right'`

### `AlignY` の値

`'top'` | `'middle'` | `'bottom'`

### `Sizing` の値

| 値       | 大きさの決め方                           |
| -------- | ---------------------------------------- |
| `'fill'` | 本体をコンテナに合わせる                 |
| `'keep'` | 本体の大きさを保ち、コンテナの中央に置く |
| `'hug'`  | コンテナを本体に合わせる                 |

`Side` / `AlignX` / `AlignY` / `Sizing` の定数は `@fringeworks/react-layouts-adornment`（または `@fringeworks/react-layouts-adornment/constants`）からインポートできます。

### 型

| 型                          | 説明                                     |
| --------------------------- | ---------------------------------------- |
| `WithAffixLayoutProps`      | `withAffixLayout` が追加するプロパティ   |
| `WithAffixLayoutOptions`    | `withAffixLayout` のHOCのオプション      |
| `AffixLayoutComponent<C>`   | `withAffixLayout` が返すコンポーネント   |
| `WithAffixItemProps`        | `withAffixItem` が追加するプロパティ     |
| `WithAffixItemOptions`      | `withAffixItem` のHOCのオプション        |
| `AffixItemComponent<C>`     | `withAffixItem` が返すコンポーネント     |
| `WithStickerLayoutProps`    | `withStickerLayout` が追加するプロパティ |
| `WithStickerLayoutOptions`  | `withStickerLayout` のHOCのオプション    |
| `StickerLayoutComponent<C>` | `withStickerLayout` が返すコンポーネント |
| `WithStickerItemProps`      | `withStickerItem` が追加するプロパティ   |
| `WithStickerItemOptions`    | `withStickerItem` のHOCのオプション      |
| `StickerItemComponent<C>`   | `withStickerItem` が返すコンポーネント   |

## 動作環境（対応ブラウザー）

`@fringeworks/style-layouts-adornment` と同じく、下記のメジャーなブラウザーのバージョンに対応しています。React 18以降が必要です。

| ブラウザー      | 対応バージョン        |
| --------------- | --------------------- |
| Google Chrome   | 88 (2021年1月) 以降   |
| Microsoft Edge  | 88 (2021年1月) 以降   |
| Mozilla Firefox | 94 (2021年11月) 以降  |
| Apple Safari    | 14.1 (2021年4月) 以降 |

## ライセンス

MIT
