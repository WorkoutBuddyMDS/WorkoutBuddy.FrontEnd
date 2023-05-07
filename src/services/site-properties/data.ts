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
    test: {
      value: 'test',
    },
    'page.header': {
      value: '',
    },
  },
  'en-US': {
    test: {
      value: 'test',
    },
  },
};
