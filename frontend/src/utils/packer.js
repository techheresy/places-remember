export function packer(data) {
  return {
    title: `${data.title}`,
    description: `${data.description}`,
    coordinates: JSON.stringify({
      type: "Point",
      coordinates: [data.coordinates.lat, data.coordinates.lng],
    }),
  };
}
