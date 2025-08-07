function daysUntil(targetDate, fromDate = new Date()) {
  const target = new Date(targetDate);
  const from = new Date(fromDate);
  const diff = target - from;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

module.exports = { daysUntil };
