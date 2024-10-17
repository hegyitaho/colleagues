import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { addColleague } from '../../store/reducers/colleagues.reducer'

export function AddColleague() {
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const dispatch = useAppDispatch()

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }
  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }

  function handleAddColleague(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (name.trim().length > 0) {
      dispatch(addColleague({ name, favorite: false, title: title.trim() }))
      setName('')
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleAddColleague} className='flex h-10 drop-shadow-sm'>
      <input
        autoFocus
        type='text'
        required
        className='input-default border-r'
        onChange={handleNameChange}
        placeholder='Name'
        value={name}
      />
      <input
        type='text'
        className='input-default'
        onChange={handleTitleChange}
        placeholder='Title'
        value={title}
      />
      <button type='submit' className='button-default'>
        Add
      </button>
    </form>
  )
}
