import { vi, assert, expect, test } from 'vitest'
import { store as _store } from './store'

// Debugger workaround
// https://youtrack.jetbrains.com/issue/WEB-53343/Typescript-Debug-Console-emits-undefined-errors#focus=Comments-27-5363210.0-0
const store = _store

test('Add category', () => {
  store.addCategory('Swimming');
  expect(store.categories).toEqual(
    [{
      id: 1,
      title: 'Swimming',
      bookmarks: []
    }]
  );
  expect(store.bookmarks).toEqual([]);

  store.addCategory('Bowling');
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
  );
  expect(store.bookmarks).toEqual([]);
});

test('Add bookmark', () => {
  store.addBookmark('My pool', 'http://pool.com/', 1);
  store.addBookmark('Bowling', 'http://bowling.com/', 2);

  expect(store.categories).toEqual(
    [{
      id: 1,
      title: 'Swimming',
      bookmarks: [1],
    },
    {
      id: 2,
      title: 'Bowling',
      bookmarks: [2],
    }]
  );
  expect(store.bookmarks).toEqual(
    [
      {
        id: 1,
        title: 'My pool',
        url: 'http://pool.com/',
      },
      {
        id: 2,
        title: 'Bowling',
        url: 'http://bowling.com/',
      }
    ]
  );
});

test('Get bookmarks for category', () => {
  let result = store.getBookmarksFor(1);
  expect(result).toEqual([{
    id: 1,
    title: 'My pool',
    url: 'http://pool.com/',
  }]);
  result = store.getBookmarksFor(2);
  expect(result).toEqual([{
    id: 2,
    title: 'Bowling',
    url: 'http://bowling.com/',
  }]);

});

test('Delete bookmark', () => {
  store.deleteBookmark(1, 1);
  expect(store.categories).toEqual(
    [{
      id: 1,
      title: 'Swimming',
      bookmarks: [],
    },
    {
      id: 2,
      title: 'Bowling',
      bookmarks: [2],
    }]
  );
  expect(store.bookmarks).toEqual(
    [
      {
        id: 2,
        title: 'Bowling',
        url: 'http://bowling.com/',
      }
    ]
  );
});
