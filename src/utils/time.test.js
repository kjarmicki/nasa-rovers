import * as time from './time';

describe('Time utilities', () => {
  it('should be able to convert days to miliseconds', () => {
    expect(time.daysToMiliseconds(3)).toBe(259200000);
  });

  it('should be able to convert miliseconds to readable dates', () => {
    expect(time.msToReadableDate(1526297033851)).toBe('2018-05-14');
  });
});
