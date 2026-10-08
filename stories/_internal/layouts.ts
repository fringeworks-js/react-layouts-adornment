/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from 'react';
import withAffixItem from '../../src/with-css/withAffixItem';
import withAffixLayout from '../../src/with-css/withAffixLayout';
import withStickerItem from '../../src/with-css/withStickerItem';
import withStickerLayout from '../../src/with-css/withStickerLayout';
import type { LayoutName } from '../_shared/types';

/**
 * storyで表示するレイアウト
 *
 * オプションはargsから組み立てるため、型はここで緩める
 */
const LAYOUTS: Record<
  LayoutName,
  {
    Container: ComponentType<any>;
    Item: ComponentType<any>;
  }
> = {
  affix: {
    Container: withAffixLayout('div'),
    Item: withAffixItem('div'),
  },
  sticker: {
    Container: withStickerLayout('div'),
    Item: withStickerItem('div'),
  },
};
export default LAYOUTS;
