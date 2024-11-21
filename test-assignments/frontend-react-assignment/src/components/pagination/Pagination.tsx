import { PropsWithChildren, useEffect, useState } from 'react'

const DEFAULT_PAGE_SIZE = 5

export function withPagination<P extends { id: string | number }>(
  ComponentToRender: React.FC<P>,
  options: { minHeight: number }
) {
  return function PaginatedComponent({
    items
  }: PropsWithChildren<{
    items: Array<P>
  }>) {
    const [currentPage, setCurrentPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)

    useEffect(() => {
      setMaxPage(Math.max(Math.ceil(items.length / DEFAULT_PAGE_SIZE) - 1, 0))
    }, [items.length])

    useEffect(() => {
      const isCurrentPageOverMaxPageBound = currentPage > maxPage
      if (isCurrentPageOverMaxPageBound) {
        setCurrentPage(Math.min(maxPage, currentPage))
      }
    }, [currentPage, maxPage])

    const itemsToShow = items.slice(
      DEFAULT_PAGE_SIZE * currentPage,
      Math.min(DEFAULT_PAGE_SIZE * (currentPage + 1), items.length + 1)
    )

    return (
      <>
        {itemsToShow.length ? (
          <ul style={{ minHeight: options.minHeight }}>
            {itemsToShow.map((i) => (
              <li key={i.id}>
                <ComponentToRender {...i} />
              </li>
            ))}
          </ul>
        ) : (
          <div
            style={{ minHeight: options.minHeight }}
            className='flex items-center justify-center'
          >
            no users to display
          </div>
        )}
        <Controls currentPage={currentPage} maxPage={maxPage} setPage={setCurrentPage} />
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
        disabled={currentPage < 1}
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
