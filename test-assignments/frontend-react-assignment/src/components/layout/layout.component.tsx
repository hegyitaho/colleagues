import { useAppSelector } from '../../hooks/redux'
import { AddColleague } from '../add-colleague/add-colleague.component'
import { ColleagueRow } from '../colleague-row/colleague-row.component'
import { FavoriteColleagueRow } from '../colleague-row/FavoriteColleagueRow'
import { ColleaguesList } from '../colleagues-list/colleagues-list.component'
import { withPagination } from '../pagination/Pagination'

const PaginatedColleagues = withPagination(ColleagueRow, { minHeight: 320 })
const FavoritePaginatedColleagues = withPagination(FavoriteColleagueRow, { minHeight: 320 })

export function Layout() {
  const colleagues = useAppSelector((state) => state.colleagues)
  const favoriteColleagues = colleagues.filter(({ favorite }) => !!favorite)

  return (
    <div className='flex flex-col items-center justify-center mt-40 w-100'>
      <div className='container'>
        <div className='flex flex-wrap md:flex-nowrap gap-5'>
          <div className='w-full md:w-1/2'>
            <div className='border border-slate-300' data-testid='all-colleagues'>
              <h2 className='bg-sky-600 font-semibold text-white py-4 px-2'>Colleagues List</h2>
              <AddColleague />
              <ColleaguesList>
                <PaginatedColleagues items={colleagues} />
              </ColleaguesList>
            </div>
          </div>
          <div className='w-full md:w-1/2'>
            <div className='border border-slate-300' data-testid='favorite-colleagues'>
              <h2 className='bg-orange-500 font-semibold text-white py-4 px-2'>Favorites List</h2>
              <ColleaguesList>
                <FavoritePaginatedColleagues items={favoriteColleagues} />
              </ColleaguesList>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
