// import { vi, assert, expect, test } from 'vitest';
// import { store as _store } from './store';
// import { settings as _settings, columnsCount as _columnsCount } from './settings';

// // Debugger workaround
// // https://youtrack.jetbrains.com/issue/WEB-53343/Typescript-Debug-Console-emits-undefined-errors#focus=Comments-27-5363210.0-0
// const store = _store;
// const settings = _settings;

// test('Add category', () => {
//   store.addCategory('Swimming');
//   expect(store.data).toEqual(
//     {
//       id: 0,
//       title: 'root',
//       columns: [[
//         {
//           id: 1,
//           title: 'Swimming',
//           children: []
//         },
//       ]]
//     }
//   );

//   store.addCategory('Bowling');
//   expect(store.data).toEqual(
//     {
//       id: 0,
//       title: 'root',
//       columns: [[
//         {
//           id: 1,
//           title: 'Swimming',
//           children: [],
//         },
//         {
//           id: 2,
//           title: 'Bowling',
//           children: [],
//         }
//       ]]
//     }
//   );
// });

// test('Arrange cards', () => {
//   settings.styles.columnsCount = 3;
//   store.arrangeCards(store.data.columns.flat());
//   expect(store.data.columns.length).toEqual(3);

//   settings.styles.columnsCount = 6;
//   store.arrangeCards(store.data.columns.flat());
//   expect(store.data.columns.length).toEqual(6);

//   settings.styles.columnsCount = 1;
//   store.arrangeCards(store.data.columns.flat());
//   expect(store.data.columns.length).toEqual(1);
// });

// test('Edit category', () => {
//   store.editCategory(2, "Fun");
//   expect(store.data.columns).toEqual([[
//     {
//       id: 1,
//       title: 'Swimming',
//       children: [],
//     },
//     {
//       id: 2,
//       title: 'Fun',
//       children: [],
//     }
//   ]])
// });

// test('Delete node', () => {
//   store.deleteNode(1);
//   expect(store.data.columns).toEqual(
//     [[
//       {
//         id: 2,
//         title: 'Fun',
//         children: [],
//       }
//     ]]
//   );
// });

// test('Find Node by Id', () => {
//   let result = store.findNodeById(store.data, 2);
//   expect(result).toEqual({
//     id: 2,
//     title: 'Fun',
//     children: [],
//   });
// });

// test('Find Parent Node by ID', () => {
//   let result = store.findParentNodeById(store.data, 2);
//   expect(result).toEqual({
//     id: 0,
//     title: 'root',
//     columns: [[
//       {
//         id: 2,
//         title: 'Fun',
//         children: [],
//       }
//     ]],
//   });
// });

// test('FindMaxId', () => {
//   let result = store.findMaxId(store.data);
//   expect(result).toEqual(2);
// });