import { useLoaderData } from 'react-router-dom';

export async function loader() {
  // sleep 2 seconds then return data
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 2_000));
  return ['Note 1', 'Note 2', 'Note 3'];
}

export function Component() {
  const notes = useLoaderData() as string[];
  return (
    <>
      <h1>Notes</h1>
      {notes.map((note) => (
        <p key={note}>{note}</p>
      ))}
    </>
  );
}
