import { vi, assert, expect, test } from 'vitest'
import { store as _store } from './store'

// Debugger workaround
// https://youtrack.jetbrains.com/issue/WEB-53343/Typescript-Debug-Console-emits-undefined-errors#focus=Comments-27-5363210.0-0
const store = _store

test('Add category', () => {
  store.addCategory('Swimming');
  expect(store.data.children).toEqual(
    [{
      id: 1,
      title: 'Swimming',
      children: []
    }]
  );

  store.addCategory('Bowling');
  expect(store.data.children).toEqual(
    [{
      id: 1,
      title: 'Swimming',
      children: [],
    },
    {
      id: 2,
      title: 'Bowling',
      children: [],
    }]
  );
});

test('Add bookmark', () => {
  store.addBookmark(1, 'My pool', 'http://pool.com/');
  store.addBookmark(2, 'Bowling', 'http://bowling.com/');

  expect(store.data.children).toEqual(
    [{
      id: 1,
      title: 'Swimming',
      children: [{
        id: 3,
        title: 'My pool',
        url: 'http://pool.com/',
      }],
    },
    {
      id: 2,
      title: 'Bowling',
      children: [{
        id: 4,
        title: 'Bowling',
        url: 'http://bowling.com/',
      }],
    }]
  );
});

test('Delete node', () => {
  store.deleteNode(3);
  expect(store.data.children).toEqual(
    [{
      id: 1,
      title: 'Swimming',
      children: [],
    },
    {
      id: 2,
      title: 'Bowling',
      children: [{
        id: 4,
        title: 'Bowling',
        url: 'http://bowling.com/',
      }],
    }]
  );
});

test('Find Node by Id', () => {
  let result = store.findNodeById(store.data, 1);
  expect(result).toEqual({
    id: 1,
    title: 'Swimming',
    children: [],
  });

  result = store.findNodeById(store.data, 4);
  expect(result).toEqual({
    id: 4,
    title: 'Bowling',
    url: 'http://bowling.com/',
  });
});

test('Find Parent Node by ID', () => {
  let result = store.findParentNodeById(store.data, 4);
  expect(result).toEqual({
    id: 2,
    title: 'Bowling',
    children: [{
      id: 4,
      title: 'Bowling',
      url: 'http://bowling.com/',
    }],
  });

  result = store.findParentNodeById(store.data, 2);
  expect(result).toEqual({
    id: 0,
    title: 'root',
    children: [{
      id: 1,
      title: 'Swimming',
      children: [],
    },
    {
      id: 2,
      title: 'Bowling',
      children: [{
        id: 4,
        title: 'Bowling',
        url: 'http://bowling.com/',
      }],
    }]
  });
});

test('FindMaxId', () => {
  let result = store.findMaxId(store.data);
  expect(result).toEqual(4);

  store.deleteNode(4);
  result = store.findMaxId(store.data);
  expect(result).toEqual(2);
});

test('Edit Bookmark', () => {
  store.addBookmark(1, 'My pool', 'http://pool.com/');
  store.addBookmark(2, 'Bowling', 'http://bowling.com/');

  store.editBookmark(3, 'My fav pool', 'http://favpool.com/');
  store.editBookmark(4, 'My fav bowling', 'http://bowling.com/');

  expect(store.data.children).toEqual(
    [{
      id: 1,
      title: 'Swimming',
      children: [{
        id: 3,
        title: 'My fav pool',
        url: 'http://favpool.com/',
      }],
    },
    {
      id: 2,
      title: 'Bowling',
      children: [{
        id: 4,
        title: 'My fav bowling',
        url: 'http://bowling.com/',
      }],
    }]
  );
});

test('Edit Category', () => {
  store.editCategory(1, 'Sport');
  store.editCategory(2, 'Fun');

  expect(store.data.children).toEqual(
    [{
      id: 1,
      title: 'Sport',
      children: [{
        id: 3,
        title: 'My fav pool',
        url: 'http://favpool.com/',
      }],
    },
    {
      id: 2,
      title: 'Fun',
      children: [{
        id: 4,
        title: 'My fav bowling',
        url: 'http://bowling.com/',
      }],
    }]
  );
});

test('Delete Category', () => {
  store.deleteNode(2);
  expect(store.data.children).toEqual(
    [{
      id: 1,
      title: 'Sport',
      children: [{
        id: 3,
        title: 'My fav pool',
        url: 'http://favpool.com/',
      }],
    }]
  );
})

