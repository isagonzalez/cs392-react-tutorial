function hasTimeConflict(class1, class2) {
  // checking if it's on the same term
  if (class1.term !== class2.term) return false;

  // getting the meeting times for each class
  // { days: [String], startMins: Number, endMins: Number }
  const meeting1 = parseMeetingTimes(class1.meets);
  const meeting2 = parseMeetingTimes(class2.meets);

  // checking if the meeting days overlap
  // arr1.some((value) => arr2.includes(value))
  if (!meeting1.days.some((value) => meeting2.days.includes(value)))
    return false;

  // checking if the meeting times overlap
  if (
    meeting1.startMins < meeting2.endMins &&
    meeting2.startMins < meeting1.endMins
  )
    return true;

  return false;
}

function parseMeetingTimes(meetingString) {
  let [daysStr, timesStr] = meetingString.split(" ");

  // creates an array of days
  let days = parseDays(daysStr);

  // convert the times to minutes of the day
  let [startTime, endTime] = timesStr.split("-");
  let startMins = parseTime(startTime);
  let endMins = parseTime(endTime);

  return { days, startMins, endMins };
}

function parseDays(dayStr) {
  let dayRegex = /(M|Tu|W|Th|F)/g;
  let days = dayStr.match(dayRegex);

  if (!days || days.join("") !== dayStr) {
    throw new Error(`Invalid day in meeting string: ${dayStr}`);
  }

  return days;
}

function parseTime(time) {
  let [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export { hasTimeConflict };
