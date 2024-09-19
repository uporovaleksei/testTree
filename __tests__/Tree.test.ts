import { TreeStore, TreeItem } from '../tree'

const items = [
  { id: 1, parent: 'root' },
  { id: 2, parent: 1, type: 'test' },
  { id: 3, parent: 1, type: 'test' },

  { id: 4, parent: 2, type: 'test' },
  { id: 5, parent: 2, type: 'test' },
  { id: 6, parent: 2, type: 'test' },

  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
]  as TreeItem[];


let ts: TreeStore;

beforeEach(() => {
  ts = new TreeStore(items);
});


describe('Tests', () => {
  test('getAll', () => {
    expect(ts.getAll()).toBe(items)
  })

  test('getItem', () => {
    for (const item of items) {
      expect(ts.getItem(item.id)).toBe(item)
    }
  })

  test('getChildren', () => {
    expect(ts.getChildren(4)).toStrictEqual([items[6], items[7]])
  })

  test('getChildren undefined', () => {
    expect(ts.getChildren(5)).toStrictEqual([])
  })

  test('getAllChildren', () => {
    expect(ts.getAllChildren(2)).toStrictEqual([
      { id: 2, parent: 1, type: 'test' },
      { id: 4, parent: 2, type: 'test' },
      { id: 5, parent: 2, type: 'test' },
      { id: 6, parent: 2, type: 'test' },
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null },
    ])
  })

  test('getAllParents', () => {
    expect(ts.getAllParents(7)).toStrictEqual([
      { id: 7, parent: 4, type: null },
      { id: 4, parent: 2, type: 'test' },
      { id: 2, parent: 1, type: 'test' },
      { id: 1, parent: 'root' },
    ])
  })
})