/* eslint-disable @typescript-eslint/no-explicit-any */
type LooseDictionary = Record<string, any>;

// 文字列→数値への変換を行うargs
const NUMBER_PROPS = [
  'containerWidth',
  'containerHeight',
  'gap',
  'gapX',
  'gapY',
  'inset',
  'insetX',
  'insetY',
  'topGap',
  'insideInset',
];

// JSON.parseを行うargs
const JSON_PROPS: string[] = [];

// 数値にpxを付与するargs
const UNIT_PROPS = [
  'containerWidth',
  'containerHeight',
  'top',
  'left',
  'width',
  'height',
];

export default function toAttributesObj(
  args: LooseDictionary,
  options: {
    unit?: boolean;
  } = {},
): LooseDictionary {
  let style: LooseDictionary = _fromStory(args);
  if (options.unit) {
    style = _putUnit(style);
  }
  return style;
}

// storyの入力からの変換
function _fromStory<O extends LooseDictionary>(obj: O) {
  const result: LooseDictionary = { ...obj };
  for (const name in result) {
    if (result[name] === undefined) {
      delete result[name];
    }
  }
  for (const np of NUMBER_PROPS) {
    if (np in result) {
      result[np] = _fromNumericString(result[np]);
    }
  }
  for (const jp of JSON_PROPS) {
    if (jp in result) {
      result[jp] = _fromJson(result[jp]);
    }
  }
  return result as O;
}

function _fromNumericString(value: any) {
  if (_isNumericString(value)) {
    return Number(value);
  }
  return value || undefined;
}

function _isNumericString(value: any) {
  return value != null && value !== '' && !isNaN(Number(value));
}

function _fromJson(value: any) {
  try {
    return value ? JSON.parse(value) : undefined;
  } catch {
    return undefined;
  }
}

function _putUnit<O extends LooseDictionary>(obj: O) {
  const result: LooseDictionary = { ...obj };
  for (const up of UNIT_PROPS) {
    if (up in result) {
      result[up] = _unit(result[up]);
    }
  }
  return result as O;
}

function _unit(value: any) {
  return typeof value === 'number' ? `${value}px` : value;
}
