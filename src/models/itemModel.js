// Very simple helper to create an inventory item object

export function createItem({ id, name, category, stock, price, vendor }) {
  return { id, name, category, stock, price, vendor };
}