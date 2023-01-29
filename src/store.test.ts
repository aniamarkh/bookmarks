import { vi, assert, expect, test } from 'vitest'
import { store as _store } from './store'

// Debugger workaround
// https://youtrack.jetbrains.com/issue/WEB-53343/Typescript-Debug-Console-emits-undefined-errors#focus=Comments-27-5363210.0-0
const store = _store

test('Add category', () => {
  store.addCategory('Swimming')
  expect(store.categories).toEqual(
    [{
      id: 1,
      title: 'Swimming',
      bookmarks: []
    }]
  )
  expect(store.bookmarks).toEqual([])

  store.addCategory('Bowling')
  expect(store.categories).toEqual(
    [{
      id: 1,
      title: 'Swimming',
      bookmarks: [],
    },
    {
      id: 2,
      title: 'Bowling',
      bookmarks: [],
    }]
  )
  expect(store.bookmarks).toEqual([])
})

