import { text } from '../../services/site-properties/data';

const useText = (key: string, lang?: string): string => {
  return text[lang || 'ro-RO'][key]?.value ?? '';
};

export default useText;
