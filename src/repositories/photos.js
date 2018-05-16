export default function photosRepository(client) {
  return {
    async getByRoverAndEarthDate(roverName, earthDate) {
      const response = await client.get(`rovers/${roverName.toLowerCase()}/photos?earth_date=${earthDate}`);
      return response.photos;
    },
  };
}
