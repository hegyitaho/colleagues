import { PropsWithChildren, useState } from 'react'

const DEFAULT_PAGE_SIZE = 5

export function withPagination<P extends { id: any }>(
  ComponentToRender: React.FC<P>,
  options: { minHeight: number }
) {
  return function PaginatedComponent({
    items
  }: PropsWithChildren<{
    items: Array<P>
  }>) {
    const [currentPage, setPage] = useState(0)
    const itemsToShow = items.slice(
      DEFAULT_PAGE_SIZE * currentPage,
      Math.min(DEFAULT_PAGE_SIZE * (currentPage + 1), items.length + 1)
    )
    const maxPage = Math.ceil(items.length / DEFAULT_PAGE_SIZE) - 1

    return (
      <>
        <ul style={{ minHeight: options.minHeight }}>
          {itemsToShow.map((i) => (
            <li key={i.id}>
              <ComponentToRender {...i} />
            </li>
          ))}
        </ul>
        <Controls currentPage={currentPage} maxPage={maxPage} setPage={setPage} />
      </>
    )
  }
}

function Controls({
  setPage,
  maxPage,
  currentPage
}: {
  setPage: (value: React.SetStateAction<number>) => void
  maxPage: number
  currentPage: number
}) {
  const prevPage = () => setPage((page) => page - 1)
  const nextPage = () => setPage((page) => page + 1)
  return (
    <div className='flex justify-between items-center'>
      <button
        type='button'
        className='button-default'
        onClick={prevPage}
        disabled={currentPage === 0}
      >
        Prev
      </button>
      <div>
        {currentPage + 1} / {maxPage + 1}
      </div>
      <button
        type='button'
        className='button-default'
        onClick={() => nextPage()}
        disabled={currentPage === maxPage}
      >
        Next
      </button>
    </div>
  )
}
