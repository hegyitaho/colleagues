import { useAppSelector } from '../../hooks/redux'
import { ColleagueRow } from '../colleague-row/colleague-row.component'
import { withPagination } from '../pagination/Pagination'

const PaginatedColleagues = withPagination(ColleagueRow, { minHeight: 320 })

export function ColleaguesList() {
  const colleagues = useAppSelector((state) => state.colleagues)

  return (
    <div className='divide-y divide-slate-300'>
      <PaginatedColleagues items={colleagues} />
    </div>
  )
}
