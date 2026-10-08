# @fringeworks/react-layouts-adornment

`@fringeworks/react-layouts-adornment` is a library some will find handy, for placing labels, badges, and other adornments around or over a main element with CSS in React.
It provides HOCs that automatically set class names and CSS custom properties based on props.

**[日本語のREADMEはこちら](./README.ja.md)**

## Features

- The React version of [`@fringeworks/style-layouts-adornment`](https://github.com/fringeworks-js/style-layouts-adornment)
- HOCs that turn any component into a container or an adornment
- Option names and values are the same as in `@fringeworks/style-layouts-adornment`
- Leaves the main element almost untouched (only what placement requires, with zero specificity)
- Works with SSR / React Server Components
- Fully typed with TypeScript (available props are narrowed by `side`)

This library is part of the `@fringeworks/react-layouts` series, but it can be used independently of `@fringeworks/react-layouts`.

## Installation

```bash
npm install @fringeworks/react-layouts-adornment
# or
pnpm add @fringeworks/react-layouts-adornment
```

## Usage

Each layout comes as a pair of HOCs: one for the container (`with<LayoutName>Layout`) and one for adornments (`with<LayoutName>Item`). Any child element that does not go through the adornment HOC becomes the main element.

```tsx
import {
  withAffixItem,
  withAffixLayout,
} from '@fringeworks/react-layouts-adornment';

// Note: the component must pass through className and style (for CSS custom properties)
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

### CSS

The HOCs do not import CSS, so they work as-is in SSR and React Server Components. Import the CSS separately.

```ts
// Import all layouts at once
import '@fringeworks/react-layouts-adornment/styles.css';

// Import only the layouts you need
import '@fringeworks/react-layouts-adornment/affix.css';
import '@fringeworks/react-layouts-adornment/sticker.css';
```

To load CSS automatically, use the modules under `with-css`. This requires a bundler that handles CSS imports.

```ts
import {
  withAffixItem,
  withAffixLayout,
} from '@fringeworks/react-layouts-adornment/with-css';
```

## Main Element and Adornments

- Any child element that does not go through the adornment HOC becomes the main element
- Unless `sizingX` / `sizingY` is set, only the minimum styles each layout needs for placement are applied to the main element. All of them have zero specificity, so styles you set on the main element always take precedence
- The main element must be an element. Text placed directly inside the container is not treated as the main element
- Specify where an adornment goes with `side`, and how it aligns to the main element with `alignX` / `alignY`

```
                 top
          ┌──────────────┐
    left  │    inside    │  right
          └──────────────┘
                bottom
```

## Sizing

The container's `sizingX` (horizontal) and `sizingY` (vertical) set how the sizes of the main element and the container are determined. Every layout uses the same values, and each axis can be set independently.

| Value    | Container size                                              | Main element size                                                                                     |
| -------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Not set  | Width follows the parent, height follows the content        | Left untouched (a main element without a set width expands horizontally; otherwise it keeps its size) |
| `'fill'` | Width follows the parent, height follows the content        | Grows and shrinks to fit the container                                                                |
| `'keep'` | Width follows the parent, height follows the content        | Keeps its own size and is centered in the container                                                   |
| `'hug'`  | Shrinks to fit the main element (and adornments in `affix`) | Keeps its own size                                                                                    |

```tsx
// Progress bar: width fits the container, height stays as the bar's
<AffixBox sizingX="fill" sizingY="keep">…</AffixBox>

// Avatar badge: fit the container to the avatar so adornments line up with it
<StickerBox sizingX="hug" sizingY="hug">…</StickerBox>
```

For how `'fill'` / `'keep'` / `'hug'` affect the main element and how they interact with a size set on the container, see [Sizing in `@fringeworks/style-layouts-adornment`](https://github.com/fringeworks-js/style-layouts-adornment#sizing).

## Layout Types

| Layout    | Adornments above, below, left, right | Suited for                                                                         |
| --------- | ------------------------------------ | ---------------------------------------------------------------------------------- |
| `affix`   | Take up space in the layout          | Adornments that must not overlap surrounding elements, such as progress bar labels |
| `sticker` | Stuck on top without taking up space | Adornments that should not shift the layout, such as notification badges           |

For details on placement, spacing, and limitations of each layout, see [Layout Types in `@fringeworks/style-layouts-adornment`](https://github.com/fringeworks-js/style-layouts-adornment#layout-types).

### `affix`

Places adornments above, below, left, right of, or inside the main element. Adornments above, below, left, and right take up space in the layout, so they do not overlap surrounding elements.

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

Sticks adornments above, below, left, right of, or inside the main element. Adornments do not take up space in the layout, so their presence or size does not change the size of the main element or the placement of surrounding elements.

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

Adds container behavior to a component.

| Parameter   | Type                                                  | Description                                       |
| ----------- | ----------------------------------------------------- | ------------------------------------------------- |
| `Component` | `C`                                                   | The component or tag name to use as the container |
| `options?`  | `WithAffixLayoutOptions` / `WithStickerLayoutOptions` | See [HOC Options](#hoc-options) below             |

The created component accepts the following props in addition to the original component's props. These props are not passed to the original component.

| Property     | Type                       | Description                                                                                   |
| ------------ | -------------------------- | --------------------------------------------------------------------------------------------- |
| `sizingX?`   | [`Sizing`](#sizing-values) | How the horizontal size is determined (the main element is left untouched when not set)       |
| `sizingY?`   | [`Sizing`](#sizing-values) | How the vertical size is determined (the main element is left untouched when not set)         |
| `gap?`       | `number`                   | Spacing between the main element and adornments above, below, left, right (px, both axes)     |
| `gapX?`      | `number`                   | Spacing between the main element and adornments on the left and right (px)                    |
| `gapY?`      | `number`                   | Spacing between the main element and adornments above and below (px)                          |
| `inset?`     | `number`                   | Distance from the main element's edges to adornments inside (px, both axes, negative allowed) |
| `insetX?`    | `number`                   | Distance from the main element's left and right edges to adornments inside (px)               |
| `insetY?`    | `number`                   | Distance from the main element's top and bottom edges to adornments inside (px)               |
| `className?` | `string`                   | Class applied together with the layout's classes                                              |
| `style?`     | `CSSProperties`            | Style applied together with the layout's CSS custom properties                                |

### `withAffixItem` / `withStickerItem`

```ts
withAffixItem<C extends ElementType>(Component: C, options?: WithAffixItemOptions): AffixItemComponent<C>
withStickerItem<C extends ElementType>(Component: C, options?: WithStickerItemOptions): StickerItemComponent<C>
```

Adds adornment behavior to a component. The parameters are the same as for [`withAffixLayout`](#withaffixlayout--withstickerlayout).

The created component accepts the following props in addition to the original component's props. The available props depend on `side`, and combinations that are not allowed (such as `alignY` with `side="top"`) are type errors.

| Property     | Type                       | Description                                                                          | Available `side`                            |
| ------------ | -------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------- |
| `side`       | [`Side`](#side-values)     | Placement relative to the main element                                               | All                                         |
| `alignX?`    | [`AlignX`](#alignx-values) | Horizontal position (default `'center'`)                                             | `'top'` / `'bottom'` / `'inside'`           |
| `alignY?`    | [`AlignY`](#aligny-values) | Vertical position (default `'middle'`)                                               | `'left'` / `'right'` / `'inside'`           |
| `gap?`       | `number`                   | Spacing from the main element; overrides the container value (px, both axes)         | `'top'` / `'bottom'` / `'left'` / `'right'` |
| `gapX?`      | `number`                   | Same as above (px, horizontal)                                                       | `'top'` / `'bottom'` / `'left'` / `'right'` |
| `gapY?`      | `number`                   | Same as above (px, vertical)                                                         | `'top'` / `'bottom'` / `'left'` / `'right'` |
| `inset?`     | `number`                   | Distance from the main element's edge; overrides the container value (px, both axes) | `'inside'`                                  |
| `insetX?`    | `number`                   | Same as above (px, horizontal)                                                       | `'inside'`                                  |
| `insetY?`    | `number`                   | Same as above (px, vertical)                                                         | `'inside'`                                  |
| `className?` | `string`                   | Class applied together with the layout's classes                                     | All                                         |
| `style?`     | `CSSProperties`            | Style applied together with the layout's CSS custom properties                       | All                                         |

### HOC Options

Options that can be passed as the second argument of each HOC.

| Option            | Type                  | Description                                                                                                                            |
| ----------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `displayName?`    | `string`              | The `displayName` of the created component (default `withLayout(original component name)`)                                             |
| `className?`      | `string`              | A class that is always applied                                                                                                         |
| `styleProp?`      | `string`              | The name of the prop that receives the CSS custom properties (default `'style'`). Also works with CSS-in-JS props such as `css` / `sx` |
| `styleMergeMode?` | `'merge' \| 'append'` | How to combine with the user's style (default `'merge'`). See `@fringeworks/react-style-proxy` for details                             |

### `Side` Values

| Value      | Placement                        |
| ---------- | -------------------------------- |
| `'top'`    | Above the main element           |
| `'bottom'` | Below the main element           |
| `'left'`   | Left of the main element         |
| `'right'`  | Right of the main element        |
| `'inside'` | Overlaid inside the main element |

### `AlignX` Values

`'left'` | `'center'` | `'right'`

### `AlignY` Values

`'top'` | `'middle'` | `'bottom'`

### `Sizing` Values

| Value    | How sizes are determined                                    |
| -------- | ----------------------------------------------------------- |
| `'fill'` | Fit the main element to the container                       |
| `'keep'` | Keep the main element's size and center it in the container |
| `'hug'`  | Fit the container to the main element                       |

The `Side` / `AlignX` / `AlignY` / `Sizing` constants can be imported from `@fringeworks/react-layouts-adornment` (or `@fringeworks/react-layouts-adornment/constants`).

### Types

| Type                        | Description                               |
| --------------------------- | ----------------------------------------- |
| `WithAffixLayoutProps`      | Props added by `withAffixLayout`          |
| `WithAffixLayoutOptions`    | HOC options for `withAffixLayout`         |
| `AffixLayoutComponent<C>`   | Component returned by `withAffixLayout`   |
| `WithAffixItemProps`        | Props added by `withAffixItem`            |
| `WithAffixItemOptions`      | HOC options for `withAffixItem`           |
| `AffixItemComponent<C>`     | Component returned by `withAffixItem`     |
| `WithStickerLayoutProps`    | Props added by `withStickerLayout`        |
| `WithStickerLayoutOptions`  | HOC options for `withStickerLayout`       |
| `StickerLayoutComponent<C>` | Component returned by `withStickerLayout` |
| `WithStickerItemProps`      | Props added by `withStickerItem`          |
| `WithStickerItemOptions`    | HOC options for `withStickerItem`         |
| `StickerItemComponent<C>`   | Component returned by `withStickerItem`   |

## Browser Support

Like `@fringeworks/style-layouts-adornment`, this library supports the following major browser versions. React 18 or later is required.

| Browser         | Supported Versions           |
| --------------- | ---------------------------- |
| Google Chrome   | 88 (January 2021) and later  |
| Microsoft Edge  | 88 (January 2021) and later  |
| Mozilla Firefox | 94 (November 2021) and later |
| Apple Safari    | 14.1 (April 2021) and later  |

## License

MIT
