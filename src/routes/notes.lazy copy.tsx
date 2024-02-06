import { useLoaderData } from "react-router-dom"

export const loader = async () => {
  // sleep 2 seconds then return data
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return ['Note 1', 'Note 2', 'Note 3']
}

export function Component() {
  const notes = useLoaderData() as string[]
  console.log(notes)
  return <>
    <h1>Notes</h1>
    {notes.map(note => <p key={note}>{note}</p>)}
  </>
}