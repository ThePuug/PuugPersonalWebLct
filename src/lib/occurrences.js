import { RRule } from "rrule"
import { DateTime } from "luxon"

const weekdayMap = {
  monday: RRule.MO,
  tuesday: RRule.TU,
  wednesday: RRule.WE,
  thursday: RRule.TH,
  friday: RRule.FR,
  saturday: RRule.SA,
  sunday: RRule.SU,
}

// Recurring event occurrences within the next `weeks`, expressed in Eastern time.
// Mirrors the original EventsBrowser logic so behaviour is unchanged.
export function eventOccurrences(frontmatter, weeks = 2) {
  const after = DateTime.now().startOf("day")
  const before = after.plus({ weeks })
  const start = DateTime.fromISO(frontmatter.date)
  const rule = new RRule({
    freq: RRule.WEEKLY,
    interval: frontmatter.repeat.interval,
    byweekday: frontmatter.repeat.byWeekDays.map((e) => {
      const day = weekdayMap[e]
      if (!day) throw new Error("day not recognised")
      return day
    }),
    dtstart: start.toJSDate(),
    until: before.toJSDate(),
  })
  return rule
    .between(after.toJSDate(), before.toJSDate(), true)
    .map((dt) =>
      DateTime.fromISO(DateTime.fromJSDate(dt).toString().substr(0, 19), {
        zone: "America/New_York",
      })
    )
}

// The next upcoming occurrence of each event, soonest first.
export function nextOccurrencePerEvent(events, weeks = 2) {
  return events
    .map((event) => {
      const dates = eventOccurrences(event.frontmatter, weeks)
      return dates.length ? { ...event, next: dates[0] } : null
    })
    .filter(Boolean)
    .sort((a, b) => a.next - b.next)
}
