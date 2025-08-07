const { daysUntil } = require('./utils');

test('daysUntil calculates difference in days', () => {
  const from = new Date('2026-05-10');
  const target = '2026-05-17';
  expect(daysUntil(target, from)).toBe(7);
});
