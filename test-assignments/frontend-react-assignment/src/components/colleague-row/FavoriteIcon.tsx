import { PropsWithChildren } from 'react'
import { ReactComponent as StarFillIcon } from '../../assets/star-fill.svg'
import { ReactComponent as StarIcon } from '../../assets/star.svg'

export function FavoriteIcon(props: PropsWithChildren<{ favorite: boolean }>) {
  return props.favorite ? <StarFillIcon title='unfavorite' /> : <StarIcon title='favorite' />
}
