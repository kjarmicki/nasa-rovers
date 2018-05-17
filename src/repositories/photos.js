export default function photosRepository(client) {
  return {
    async getByRoverAndEarthDate(roverName, earthDate, options = {}) {
      const { limit } = options;
      const response = await client.get(`rovers/${roverName.toLowerCase()}/photos?earth_date=${earthDate}`);
      if (typeof limit === 'number' && !Number.isNaN(limit)) {
        return response.photos.slice(0, options.limit);
      }
      return response.photos;
    },
  };
}
