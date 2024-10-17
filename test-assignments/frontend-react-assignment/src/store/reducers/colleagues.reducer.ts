import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Colleague } from '../types/colleague.type'

export type ColleaguesState = Colleague[]

const initialState: ColleaguesState = [
  Collegaue({
    name: 'Tori Broughton'
  }),
  Collegaue({
    name: 'Marcie Tyson',
    title: 'boss'
  }),
  Collegaue({
    name: 'Zaydan Navarro'
  }),
  Collegaue({
    name: 'Carmen Ahmed'
  }),
  Collegaue({
    name: 'Leanna Bowman'
  })
]

export const colleaguesSlice = createSlice({
  name: 'colleagues',
  initialState: [...initialState],
  reducers: {
    addColleague: (state, action: PayloadAction<ColleagueToBeCreated>) =>
      state.concat(Collegaue(action.payload)),
    removeColleague: (state, action: PayloadAction<{ id: string }>) =>
      state.filter(({ id }) => id !== action.payload.id),
    favoriteColleagueToggle: (state, action: PayloadAction<{ id: string }>) =>
      state.map((colleague) =>
        colleague.id === action.payload.id
          ? { ...colleague, favorite: !colleague.favorite }
          : colleague
      ),
    reset: () => [...initialState]
  }
})

export const { addColleague, removeColleague, favoriteColleagueToggle, reset } =
  colleaguesSlice.actions

export const { reducer: colleaguesReducer } = colleaguesSlice

type ColleagueToBeCreated = Pick<Colleague, 'name'> & Partial<Colleague>

function Collegaue({ name, favorite = false, title = '' }: ColleagueToBeCreated): Colleague {
  return {
    name,
    favorite,
    title,
    id: crypto.randomUUID()
  }
}
