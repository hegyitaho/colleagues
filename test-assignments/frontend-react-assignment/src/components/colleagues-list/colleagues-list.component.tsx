import { PropsWithChildren } from 'react'
import { Colleague } from '../../store/types/colleague.type'
import { ColleagueRow } from '../colleague-row/colleague-row.component'
import { withPagination } from '../pagination/Pagination'

const PaginatedColleagues = withPagination(ColleagueRow, { minHeight: 320 })

export function ColleaguesList(props: PropsWithChildren<{ colleagues: Colleague[] }>) {
  return (
    <div className='divide-y divide-slate-300'>
      <PaginatedColleagues items={props.colleagues} />
    </div>
  )
}
