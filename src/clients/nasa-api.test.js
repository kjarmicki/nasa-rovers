import nasaApiClient from './nasa-api';

const MOCK_HTTP_CLIENT_RESPONSE = {
  ok: true,
};
function mockHttpClient() {
  return jest.fn(() => ({
    json() {
      return MOCK_HTTP_CLIENT_RESPONSE;
    },
  }));
}

describe('NASA API Client', () => {
  it('should use sane defaults', async () => {
    // given
    const httpClient = mockHttpClient();
    const client = nasaApiClient(httpClient);

    // when
    await client.get('someurl');

    // then
    expect(httpClient).toHaveBeenCalledTimes(1);
    expect(httpClient).toHaveBeenCalledWith('https://api.nasa.gov/mars-photos/api/v1/someurl?api_key=DEMO_KEY');
  });

  it('should allow to override base url', async () => {
    // given
    const changedBaseUrl = 'https://totally-not-api.nasa.gov';
    const httpClient = mockHttpClient();
    const client = nasaApiClient(httpClient, {
      baseUrl: changedBaseUrl,
    });

    // when
    await client.get('someurl');

    // then
    expect(httpClient).toHaveBeenCalledTimes(1);
    const [callUrl] = httpClient.mock.calls[0];
    expect(callUrl.startsWith(changedBaseUrl)).toBe(true);
  });

  it('should allow to override API key', async () => {
    // given
    const changedApiKey = 'DIFFERENT_KEY';
    const httpClient = mockHttpClient();
    const client = nasaApiClient(httpClient, {
      apiKey: changedApiKey,
    });

    // when
    await client.get('someurl');

    // then
    expect(httpClient).toHaveBeenCalledTimes(1);
    const [callUrl] = httpClient.mock.calls[0];
    expect(callUrl.includes('api_key=DIFFERENT_KEY')).toBe(true);
  });

  it('should pass the response through', async () => {
    // given
    const httpClient = mockHttpClient();
    const client = nasaApiClient(httpClient);

    // when
    const response = await client.get('someurl');

    // then
    expect(response).toEqual(MOCK_HTTP_CLIENT_RESPONSE);
  });
});
