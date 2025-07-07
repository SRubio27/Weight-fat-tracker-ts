export const parseValidDate = (input?: string | Date | null): Date | null => {
  if (input === null || input === undefined) return null

  const date = input instanceof Date ? input : new Date(input)
  return isNaN(date.getTime()) ? null : date
}
