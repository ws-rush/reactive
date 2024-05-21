import TheCounter from '../app/components/TheCounter'
import { cleanup, fireEvent, render } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'

describe('Counter component', () => {
  afterEach(() => {
    cleanup() // This ensures components are unmounted after each test
  })

  it('should render', () => {
    const { getByText } = render(<TheCounter initial={10} />)
    expect(getByText('10')).toBeTruthy()
    expect(getByText('10')).toMatchSnapshot()
  })

  it('should be interactive', () => {
    const { getByTestId, getByText } = render(<TheCounter initial={0} />)
    expect(getByText('0')).toBeTruthy()

    expect(getByTestId('inc-button')).toBeTruthy()
    expect(getByTestId('dec-button')).toBeTruthy()

    fireEvent.click(getByTestId('inc-button'))
    expect(getByText('1')).toBeTruthy()

    fireEvent.click(getByTestId('dec-button'))
    expect(getByText('0')).toBeTruthy()
  })
})
