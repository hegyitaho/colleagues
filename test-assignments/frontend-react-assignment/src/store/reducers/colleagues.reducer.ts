import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Colleague } from '../types/colleague.type'

export type ColleaguesState = Colleague[]

const initialState: ColleaguesState = [
  createColleague({
    name: 'Tori Broughton'
  }),
  createColleague({
    name: 'Marcie Tyson',
    title: 'boss'
  }),
  createColleague({
    name: 'Zaydan Navarro'
  }),
  createColleague({
    name: 'Carmen Ahmed'
  }),
  createColleague({
    name: 'Leanna Bowman'
  })
]

export const colleaguesSlice = createSlice({
  name: 'colleagues',
  initialState: [...initialState],
  reducers: {
    addColleague: (state, action: PayloadAction<ColleagueToBeCreated>) => {
      state.push(createColleague(action.payload))
    },
    removeColleague: (state, action: PayloadAction<{ id: string }>) =>
      state.filter(({ id }) => id !== action.payload.id),
    favoriteColleagueToggle: (state, action: PayloadAction<{ id: string }>) => {
      const targetColleague = state.find((colleague) => colleague.id === action.payload.id)
      targetColleague!.favorite = !targetColleague?.favorite
    },
    reset: () => [...initialState]
  }
})

export const { addColleague, removeColleague, favoriteColleagueToggle, reset } =
  colleaguesSlice.actions

export const { reducer: colleaguesReducer } = colleaguesSlice

type ColleagueToBeCreated = Pick<Colleague, 'name'> & Partial<Colleague>

function createColleague({ name, favorite = false, title = '' }: ColleagueToBeCreated): Colleague {
  return {
    name,
    favorite,
    title,
    id: crypto.randomUUID()
  }
}
