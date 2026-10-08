/**
 * `_shared`とstoryが参照する、パッケージ固有の依存
 *
 * `_shared`とstoryはパッケージ間でそのままコピーして使うため、
 * パッケージによって参照先が異なるものはこのファイルに集約する。
 */
export type { ArgTypes, Meta, StoryObj } from '@storybook/react-vite';
export { AlignX, AlignY, Sizing } from '../../src/constants';
