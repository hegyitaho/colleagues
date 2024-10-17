import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { addColleague } from '../../store/reducers/colleagues.reducer'

export function AddColleague() {
  const [name, setName] = useState('')
  const dispatch = useAppDispatch()

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  function handleAddColleague(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (name.trim().length > 0) {
      dispatch(addColleague({ name, favorite: false }))
    }
    setName('')
  }

  return (
    <form onSubmit={handleAddColleague} className='flex h-10 drop-shadow-sm'>
      <input
        autoFocus
        type='text'
        required
        className='w-full px-2 focus:outline-none border-b border-gray-400'
        onChange={handleChange}
        placeholder='Name'
        value={name}
      />
      <button type='submit' className='button-default'>
        Add
      </button>
    </form>
  )
}
