import { PropsWithChildren } from 'react'

export function ColleaguesList(props: PropsWithChildren<{}>) {
  return <div className='divide-y divide-slate-300'>{props.children}</div>
}
