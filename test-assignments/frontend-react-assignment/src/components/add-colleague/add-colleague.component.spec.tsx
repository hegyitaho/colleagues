import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../store/store'
import { AddColleague } from './add-colleague.component'
import { reset } from '../../store/reducers/colleagues.reducer'

afterEach(() => {
  store.dispatch(reset())
})
describe('can add new colleagues', () => {
  afterEach(() => {
    assertNewUserIsAdded()
  })

  const userName = 'new user'
  test('by hitting enter', async () => {
    Setup()

    await userEvent.type(screen.getByPlaceholderText('Name'), userName + '{enter}')
  })

  test('by clicking the add button', async () => {
    Setup()

    const userName = 'new user'
    await userEvent.type(screen.getByPlaceholderText('Name'), userName)
    await userEvent.click(screen.getByText('Add'))
  })

  function assertNewUserIsAdded() {
    const colleagues = store.getState().colleagues
    expect(colleagues).toHaveLength(6)
    expect(colleagues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'new user', favorite: false, title: '' })
      ])
    )
  }
})

test('can add user with title', async () => {
  Setup()

  const userName = 'new user'
  const titleName = 'new title'
  await userEvent.type(screen.getByPlaceholderText('Name'), userName)
  await userEvent.type(screen.getByPlaceholderText('Title'), titleName)
  await userEvent.click(screen.getByText('Add'))

  const colleagues = store.getState().colleagues
  expect(colleagues).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: 'new user', favorite: false, title: titleName })
    ])
  )
})

test('cannot add colleague without a name', async () => {
  Setup()

  expect(store.getState().colleagues).toHaveLength(5)
  await userEvent.type(screen.getByPlaceholderText('Name'), '        {enter}')
  expect(store.getState().colleagues).toHaveLength(5)
})

function Setup() {
  const Component = () => (
    <Provider store={store}>
      <AddColleague />
    </Provider>
  )

  render(<Component />)
}
