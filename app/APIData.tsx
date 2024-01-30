import { useQuery } from 'urql';

export default function APIData() {
  const [result] = useQuery({
    query: `
      query {
        person(id: "cGVvcGxlOjE=") {
          name
          birthYear
        }
      }
    `
  });

  if (result.fetching) {
    return <p>Loading...</p>;
  }

  if (result.error) {
    return <p className="text-6xl text-red-500">Oh no... {result.error.message}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold">API Data</h1>
      <h2 className="mt-7 text-2xl font-semibold">{result.data.person.name}</h2>
      <p className="text-lg">{result.data.person.birthYear}</p>
    </div>
  );
}
