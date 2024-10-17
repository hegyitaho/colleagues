import { PropsWithChildren } from 'react'
import { ReactComponent as StarFillIcon } from '../../assets/star-fill.svg'
import { ReactComponent as StarIcon } from '../../assets/star.svg'
import { ReactComponent as TrashIcon } from '../../assets/trash.svg'
import { useAppDispatch } from '../../hooks/redux'
import { favoriteColleagueToggle, removeColleague } from '../../store/reducers/colleagues.reducer'
import { Colleague } from '../../store/types/colleague.type'
import { FavoriteIcon } from './FavoriteIcon'

export function ColleagueRow(props: PropsWithChildren<Colleague>) {
  const dispatch = useAppDispatch()

  function handleDelete() {
    dispatch(removeColleague({ id: props.id }))
  }

  function handleFavorite() {
    dispatch(favoriteColleagueToggle({ id: props.id }))
  }

  return (
    <div className='flex justify-between items-center px-2 h-16 bg-white'>
      <p className='font-semibold flex-1'>{props.name}</p>
      <p className='flex-1'>{props.title}</p>
      <div className='space-x-2'>
        <button
          type='button'
          className='bg-gray-200 p-2 border border-gray-400 rounded hover:bg-gray-100'
          onClick={handleFavorite}
        >
          <FavoriteIcon favorite={props.favorite} />
        </button>
        <button
          type='button'
          className='bg-gray-200 p-2 border border-gray-400 rounded hover:bg-gray-100'
          onClick={handleDelete}
        >
          <TrashIcon title='delete' />
        </button>
      </div>
    </div>
  )
}
