export enum Lang {
  'ro-RO',
  'en-US',
}
type Text = {
  [locale: string]: {
    [key: string]: {
      value: string;
    };
  };
};

export const text: Text = {
  'ro-RO': {
    ['test']: {
      value: 'test',
    },
  },
  'en-US': {
    ['test']: {
      value: 'test',
    },
  },
};
