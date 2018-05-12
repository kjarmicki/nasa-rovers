export default function roversRepository(client) {
  return {
    async getAll() {
      const response = await client.get('rovers');
      return response.rovers;
    },
  };
}
