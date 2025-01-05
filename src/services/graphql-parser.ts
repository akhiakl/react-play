import { prepareQuery } from 'json-graphql-parser/templates/base-template.js';
import { Validator, type Schema } from 'jsonschema';
import { schema } from 'json-graphql-parser/templates/base-template_schema.js';

const header = {
  'Content-Type': 'application/json'
};

interface RequestConfig {
  function: string;
  callback?: (data: any) => any;
  variables?: Record<string, any>;
}

interface ResponseData {
  [key: string]: any;
}

interface ErrorData {
  name: string;
  status: number;
  message: string;
}

export const config_to_query = (config: any): string => {
  return prepareQuery(config);
};

/**
 * Run GraphQL queries using Fetch API and a simple JSON object
 * @param {object} request           Mandatory.
 * @param {string} [url] Optional.
 * @param {object} [reqheader] Optional.
 * @returns {Promise<any>} single promise
 */
export const submit = async (
  request: RequestConfig,
  url?: string,
  reqheader?: Record<string, string>,
  print_query: boolean = false
): Promise<ResponseData | ErrorData> => {
  let updatedHeader = { ...header };
  if (reqheader) {
    updatedHeader = { ...updatedHeader, ...reqheader };
  }

  return postData(url, request, updatedHeader, print_query)
    .then((res) => {
      try {
        if (!res?.data) {
          return { name: 'Error', status: 500, message: res.message };
        }
        if (res.data.errors && res.data.errors.length) {
          if (request.callback) {
            return request.callback({
              name: 'Error',
              status: 500,
              message: res.data.errors[0].message
            });
          }

          return { name: 'Error', status: 500, message: res.data.errors[0].message };
        }
        if (res.data[request.function]) {
          return res.data[request.function];
        }

        return {};
        // eslint-disable-next-line no-empty
      } catch (err) {}
    })
    .catch((error) => {
      return Promise.reject(error);
    })
    .finally(() => {});
};

/**
 * Run GraphQL queries using Fetch API and multiple JSON objects
 * @param {object[]} requests           Mandatory.
 * @param {string} [url] Optional.
 * @param {object} [reqheader] Optional.
 * @returns {Promise<any[]>}
 */
export const submit_multi = (
  requests: RequestConfig[],
  url?: string,
  reqheader?: Record<string, string>
): Promise<any[]> => {
  console.warn('V1 will be deprecated soon. V2 instead.');

  const promises = requests.map((config) => {
    return submit(config, url, reqheader);
  });

  return Promise.all(promises);
};

/**
 * Validate if the input object satisfies the schema
 * @param {object} conf_object           Mandatory.
 * @returns {Boolean} Returns "true", if the object is valid, else it returns "false"
 */
export const validate_object = (conf_object: object): { result: boolean; error: any[] } => {
  const v = new Validator();
  const validationResult = v.validate(conf_object, schema as Schema);

  return {
    result: validationResult.errors.length === 0,
    error: validationResult.errors
  };
};

const postData = async (
  url: string,
  config: RequestConfig,
  reqheaders: Record<string, string>,
  print_query: boolean
): Promise<any> => {
  const processedBody = config_to_query(config);
  if (print_query) {
    // eslint-disable-next-line no-console
    console.log(`Request: ${processedBody}`);
  }

  const body = {
    query: processedBody,
    variables: config.variables && config.variables instanceof Object ? config.variables : {}
  };

  const options: RequestInit = {
    method: 'POST',
    headers: reqheaders,
    body: JSON.stringify(body)
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (result.errors) {
      console.error('Error encountered while receiving data');
      console.error(JSON.stringify(result.errors, null, 2));

      throw result.errors;
    }

    return result;
  } catch (error) {
    console.error(error?.message);

    throw error;
  }
};
