export async function loader() {
  return 'hello';
}

export async function action() {
  return 'action';
}

export function Component() {
  return <h1>Dynamic</h1>;
}
