
type ID = string | number
export type TreeItem = {
  id: ID
  parent: ID
  type?: string | null
}

export class TreeStore {
  items: TreeItem[]
  item: Map<ID, TreeItem>
  parentItem: Map<ID, TreeItem[]>

  constructor(items: TreeItem[]) {
    this.items = items
    this.item = new Map()
    this.parentItem = new Map()

    for (const item of items) {
      this.item.set(item.id, item)
      if (!this.parentItem.has(item.parent)) {
        this.parentItem.set(item.parent, [])
      }
      this.parentItem.get(item.parent)!.push(item)
    }
  }

  getAll(): TreeItem[] {
    return this.items
  }

  getItem(id: ID): TreeItem | undefined {
    return this.item.get(id)
  }

  getChildren(id: ID): TreeItem[] {
    return this.parentItem.get(id) || []
  }

  getAllChildren(id: ID): TreeItem[] {
    const result: TreeItem[] = []
    const queue: ID[] = []
    const rootItem = this.item.get(id)
    if (rootItem) {
      result.push(rootItem)
      queue.push(id)
    }
    while (queue.length > 0) {
      const currentId = queue.shift()!
      const children = this.parentItem.get(currentId)
      if (children) {
        for (const child of children) {
          result.push(child)
          queue.push(child.id)
        }
      }
    }

    return result
  }

  getAllParents(id: ID): TreeItem[] {
    const result: TreeItem[] = []
    let currentItem = this.item.get(id)
    if (currentItem) {
      result.push(currentItem)
    }
    while (currentItem && currentItem.parent !== 'root') {
      const parentItem = this.item.get(currentItem.parent)
      if (parentItem) {
        result.push(parentItem)
        currentItem = parentItem
      } else {
        break
      }
    }
    return result
  }
}
