import { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { addColleague } from '../../store/reducers/colleagues.reducer'

export function AddColleague() {
  const [name, setName] = useState('')
  const dispatch = useAppDispatch()

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  function handleAddColleague() {
    dispatch(addColleague({ name, favorite: false }))
    setName('')
  }

  return (
    <div className='flex h-10 drop-shadow-sm'>
      <input
        type='text'
        className='w-full px-2 focus:outline-none border-b border-gray-400'
        onChange={handleChange}
        placeholder='Name'
        value={name}
      />
      <button type='button' className='button-default' onClick={handleAddColleague}>
        Add
      </button>
    </div>
  )
}
