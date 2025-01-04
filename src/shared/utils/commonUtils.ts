/**
 *
 * @param {Object} optionText
 * @param {String} searchText
 * @returns Boolean
 */
export const compareTextValue = (optionText: any, searchText: string) => {
  if (typeof optionText === 'string') {
    return optionText.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  }

  return optionText?.props?.children[1].toLowerCase().indexOf(searchText.toLowerCase()) > -1;
};

/**
 *
 * @param {String} path cover path
 * @returns String
 */
export const getProdUrl = (path: string) => {
  return `https://reactplay.io${path}`;
};

/**
 *
 * @param {Array} obj
 * @param {String} key
 * @param {String} value
 * @returns Number
 */
export default function countByProp(obj: Array<any>, key: string, value: any) {
  return obj.reduce((acc, item) => (item?.[key] === value ? ++acc : acc), 0);
}

/**
 * Formats a date string in ISO 8601 format to the following format:
 * `Joined {day} {month} {year}`
 *
 * @param {string} dateString A date string in ISO 8601 format.
 * @returns {string} A formatted date string.
 */
export function formatDate(dateString: string): string {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return ''; // Invalid date
  }

  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

  return `Joined ${day} ${monthName} ${year}`;
}
