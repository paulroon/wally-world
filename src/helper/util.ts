export function formatDate(date: Date): string {
  let day = String(date.getDate()).padStart(2, "0")
  let month = String(date.getMonth() + 1).padStart(2, "0") // Months are 0-indexed
  let year = date.getFullYear()
  return `${year}-${month}-${day}`
}
