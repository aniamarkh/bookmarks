import { vi, assert, expect, test } from 'vitest'
import { store as _store } from './store'

// Debugger workaround
// https://youtrack.jetbrains.com/issue/WEB-53343/Typescript-Debug-Console-emits-undefined-errors#focus=Comments-27-5363210.0-0
const store = _store

test('Add category', () => {
  store.addCategory('Swimming')
  expect(store.categories).lengthOf(1)
  expect(store.categories[0].id).toBe(1)
  expect(store.categories[0].title).toBe('Swimming')
  expect(store.categories[0].bookmarks).toEqual([])
})

test('Add second category', () => {
  store.addCategory('Bowling')
  expect(store.categories).lengthOf(2)
  expect(store.categories[0].id).toBe(1)
  expect(store.categories[1].id).toBe(2)
  expect(store.categories[0].title).toBe('Swimming')
  expect(store.categories[1].title).toBe('Bowling')
  expect(store.categories[0].bookmarks).toEqual([])
  expect(store.categories[1].bookmarks).toEqual([])
})
