interface MonthPickerProps {
  year: number
  month: number
}

export function MonthPicker({ year, month }: MonthPickerProps) {
  const months = [
    'Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec',
    'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień',
  ]
  return (
    <span className="month-label">{months[month - 1]} {year}</span>
  )
}
