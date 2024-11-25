import { Link, type LinkProps, useParams } from '@remix-run/react'
import { type ReactNode } from 'react'

type LocalizedLinkProps = {
  readonly children: ReactNode
  readonly to: string
} & Omit<LinkProps, 'to'>

export const LocalizedLink = ({
  children,
  to,
  ...props
}: LocalizedLinkProps) => {
  // Get the lang parameter from the URL
  const { lang } = useParams()

  // Construct the localized path
  const localizedPath = lang ? `/${lang}${to}` : to

  return (
    <Link
      to={localizedPath}
      {...props}
    >
      {children}
    </Link>
  )
}
