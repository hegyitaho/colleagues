import { PropsWithChildren } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { favoriteColleagueToggle } from '../../store/reducers/colleagues.reducer'
import { Colleague } from '../../store/types/colleague.type'
import { FavoriteIcon } from './FavoriteIcon'

export function FavoriteColleagueRow(props: PropsWithChildren<Colleague>) {
  const dispatch = useAppDispatch()

  function handleFavorite() {
    dispatch(favoriteColleagueToggle({ id: props.id }))
  }
  return (
    <div className='flex justify-between items-center px-2 h-16 bg-white'>
      <p className='font-semibold'>{props.name}</p>
      <div className='space-x-2'>
        <button
          type='button'
          className='bg-gray-200 p-2 border border-gray-400 rounded hover:bg-gray-100'
          onClick={handleFavorite}
        >
          <FavoriteIcon favorite={props.favorite} />
        </button>
      </div>
    </div>
  )
}
