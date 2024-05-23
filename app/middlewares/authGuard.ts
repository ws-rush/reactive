import {
  type LoaderFunction,
  type LoaderFunctionArgs,
  redirect,
} from 'react-router-dom'

export function authGuard(role: string, loader?: LoaderFunction) {
  return (parameters: LoaderFunctionArgs) => {
    if (localStorage.getItem('role') !== role) return redirect('/')
    return loader ? loader(parameters) : null
  }
}
