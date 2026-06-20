import { RRule } from "rrule"
import { DateTime } from "luxon"

// The guild's home timezone. Event wall-clock times in frontmatter are defined
// in this zone; occurrences are anchored here, then displayed in each viewer's
// local timezone via .toLocal().
export const HOME_ZONE = "America/New_York"

const weekdayMap = {
  monday: RRule.MO,
  tuesday: RRule.TU,
  wednesday: RRule.WE,
  thursday: RRule.TH,
  friday: RRule.FR,
  saturday: RRule.SA,
  sunday: RRule.SU,
}

// Upcoming occurrences within the next `weeks`, as luxon DateTimes anchored to
// HOME_ZONE (correct absolute instants regardless of the runtime's own timezone,
// and DST-aware). RRule operates on naive UTC, so we encode the Eastern
// wall-clock fields as UTC going in and decode them back to HOME_ZONE coming out.
export function eventOccurrences(frontmatter, weeks = 2) {
  const startNY = DateTime.fromISO(frontmatter.date, { zone: HOME_ZONE })
  const dtstart = new Date(Date.UTC(startNY.year, startNY.month - 1, startNY.day, startNY.hour, startNY.minute))

  const nowNY = DateTime.now().setZone(HOME_ZONE).startOf("day")
  const after = new Date(Date.UTC(nowNY.year, nowNY.month - 1, nowNY.day))
  const before = new Date(after.getTime() + weeks * 7 * 24 * 60 * 60 * 1000)

  const rule = new RRule({
    freq: RRule.WEEKLY,
    interval: frontmatter.repeat.interval,
    byweekday: frontmatter.repeat.byWeekDays.map((e) => {
      const day = weekdayMap[e]
      if (!day) throw new Error("day not recognised")
      return day
    }),
    dtstart,
  })

  return rule.between(after, before, true).map((d) =>
    DateTime.fromObject(
      {
        year: d.getUTCFullYear(),
        month: d.getUTCMonth() + 1,
        day: d.getUTCDate(),
        hour: d.getUTCHours(),
        minute: d.getUTCMinutes(),
      },
      { zone: HOME_ZONE }
    )
  )
}
