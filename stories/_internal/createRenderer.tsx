import createContainerModel from '../_shared/createContainerModel';
import type { LayoutName, StoryArgs } from '../_shared/types';
import LayoutContainer from './LayoutContainer';
import LAYOUTS from './layouts';

export default function createRenderer(name: LayoutName) {
  const layout = LAYOUTS[name];
  return (args: StoryArgs) => (
    <LayoutContainer layout={layout} model={createContainerModel(args)} />
  );
}
