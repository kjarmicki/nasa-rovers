import URL from 'url-parse';

export default function nasaApiClient(httpClient, config = {}) {
  const defaults = {
    baseUrl: 'https://api.nasa.gov/mars-photos/api/v1',
    apiKey: 'DEMO_KEY',
  };
  const resolvedConfig = Object.assign({}, defaults, config);

  function createUrl(relativePath) {
    return new URL(`${resolvedConfig.baseUrl}/${relativePath}`, true);
  }

  function withApiKey(url) {
    const decorated = Object.create(url);
    decorated.query = Object.assign({}, url.query, {
      api_key: resolvedConfig.apiKey,
    });
    return decorated;
  }

  function expand(relativePath) {
    return withApiKey(createUrl(relativePath)).toString();
  }

  function createError(response) {
    const error = new Error(response.statusText);
    error.status = response.status;
    return error;
  }

  return {
    async get(relativePath) {
      const response = await httpClient(expand(relativePath));
      if (!response.ok) {
        throw createError(response);
      }
      return response.json();
    },
  };
}
