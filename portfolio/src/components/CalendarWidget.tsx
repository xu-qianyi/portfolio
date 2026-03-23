"use client";

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export default function CalendarWidget() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const todayDate = today.getDate();

  const monthName = today
    .toLocaleString("en-US", { month: "long" })
    .toUpperCase();

  const firstDow = new Date(year, month, 1).getDay();
  const startOffset = firstDow === 0 ? 6 : firstDow - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = Array(startOffset).fill(null);

  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return (
    <div className="cal">
      <div className="cal-header">
        {monthName} {year}
      </div>

      <div className="cal-row cal-labels">
        {DAY_LABELS.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>

      <div className="cal-body">
        {weeks.map((w, wi) => (
          <div key={wi} className="cal-row">
            {w.map((d, di) => (
              <span
                key={di}
                className={
                  d === todayDate
                    ? "cal-date cal-today"
                    : d
                      ? "cal-date"
                      : "cal-date cal-empty"
                }
              >
                {d ?? ""}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
