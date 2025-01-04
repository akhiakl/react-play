import { FIELD_TEMPLATE } from './filter-template';

export const ParseQuery = (queryString: string) => {
  if (!queryString) {
    return undefined;
  }
  const query: Record<string, string> = {};
  const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }

  return query;
};

export const QueryExtractValue = (query: Record<string, string>) => {
  const targetQuery: Record<string, string[]> = {};
  Object.keys(query).forEach((key) => {
    targetQuery[key] = query[key].split(',');
  });

  return targetQuery;
};
export const QueryDBTranslator = (query: Record<string, string>) => {
  const extractedValue = QueryExtractValue(query);
  const res: Record<string, string | string[]> = {};
  FIELD_TEMPLATE.forEach((field) => {
    if (extractedValue[field.datafield]) {
      if (field.dbfield) {
        res[field.dbfield] = extractedValue[field.datafield];
      } else {
        res[field.datafield] = extractedValue[field.datafield];
      }
    }
  });
  if (query.text) {
    res['text'] = extractedValue['text'][0];
  }

  return res;
};
