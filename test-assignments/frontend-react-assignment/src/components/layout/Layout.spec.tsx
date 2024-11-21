/* eslint-disable testing-library/no-node-access */
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../store/store'
import { reset } from '../../store/reducers/colleagues.reducer'
import { Layout } from './layout.component'

afterEach(() => {
  store.dispatch(reset())
})
const favoriteUser = 'Marcie Tyson'

test('favoriting a colleague puts it also in the favorites column', async () => {
  const colleagueRow = await setup()

  await assertNewFavoriteUserIsAlsoDisplayedInFavoritesColumn(colleagueRow)
})

test('unfavoriting user removes them from favorites column', async () => {
  const colleagueRow = await setup()
  await assertNewFavoriteUserIsAlsoDisplayedInFavoritesColumn(colleagueRow)

  const favoriteColleagueRow = getFavoriteColleagueRow()
  await userEvent.click(within(favoriteColleagueRow!).getByTitle('unfavorite'))

  expect(screen.getByTestId('favorite-colleagues')).not.toHaveTextContent(favoriteUser)
  expect(screen.getByTestId('all-colleagues')).toHaveTextContent(favoriteUser)
})

test('title is displayed next to the user', async () => {
  const colleagueRow = await setup()

  expect(colleagueRow).toHaveTextContent('boss')
})

function getFavoriteColleagueRow() {
  return within(screen.getByTestId('favorite-colleagues')).getByText(favoriteUser).closest('li')
}

async function assertNewFavoriteUserIsAlsoDisplayedInFavoritesColumn(colleagueRow: HTMLLIElement) {
  await userEvent.click(within(colleagueRow!).getByTitle('favorite'))
  expect(screen.getByTestId('favorite-colleagues')).toHaveTextContent(favoriteUser)
  expect(screen.getByTestId('all-colleagues')).toHaveTextContent(favoriteUser)
}

async function setup() {
  render(
    <Provider store={store}>
      <Layout />
    </Provider>
  )

  const colleagueRow = getColleagueRow()
  expect(screen.getByTestId('favorite-colleagues')).not.toHaveTextContent(favoriteUser)
  return colleagueRow as HTMLLIElement
}

function getColleagueRow() {
  return screen.getByText(favoriteUser).closest('li')
}
