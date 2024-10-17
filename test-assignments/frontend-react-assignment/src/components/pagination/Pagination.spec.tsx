import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { withPagination } from './Pagination'
import { PropsWithChildren } from 'react'
import userEvent from '@testing-library/user-event'

test('shows 5 items at a time', async () => {
  const PaginatedComponent = getComponent()
  const items = Items()
  render(<PaginatedComponent items={items} />)

  expect(screen.getByRole('list')).toHaveTextContent('01234')
})

test('clicking next shows next 5 items', async () => {
  const PaginatedComponent = getComponent()

  render(<PaginatedComponent items={Items()} />)

  await userEvent.click(screen.getByText('Next'))

  expect(screen.getByRole('list')).toHaveTextContent('56789')
})

test('clicking previous shows previous 5 items', async () => {
  const PaginatedComponent = getComponent()

  render(<PaginatedComponent items={Items()} />)

  await userEvent.click(screen.getByText('Next'))
  await userEvent.click(screen.getByText('Prev'))

  expect(screen.getByRole('list')).toHaveTextContent('01234')
})

test('prev is disabled if first page is shown', async () => {
  const PaginatedComponent = getComponent()

  render(<PaginatedComponent items={Items()} />)

  expect(screen.getByRole('button', { name: 'Prev' })).toBeDisabled()
})

test('next is disabled if first page is shown', async () => {
  const PaginatedComponent = getComponent()

  render(<PaginatedComponent items={Items(5)} />)

  expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()
})

function Component(props: PropsWithChildren<{ text: string; id: number }>) {
  return <div>{props.text}</div>
}

function getComponent() {
  return withPagination(Component, { minHeight: 0 })
}

function Items(numberOfItems = 100) {
  return new Array(numberOfItems)
    .fill(null)
    .map((_val, index) => ({ id: index, text: index.toString() }))
}
