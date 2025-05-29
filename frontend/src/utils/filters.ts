export type Filter = [string, string, any]
export type Filters = Filter[]
export function asParams(filters: Filters): { filter?: string } {
  if (!filters || filters.length === 0) {
    return {}
  }
  return {
    filter: JSON.stringify(filters),
  }
}
