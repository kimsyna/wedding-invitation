/**
 * @jest-environment jsdom
 */

describe('scroll behavior', () => {
  test('container class changes stepwise based on scroll position', () => {
    document.body.innerHTML = '<div id="container"></div>';

    window.innerHeight = 1000;

    require('../script');

    const container = document.getElementById('container');

    window.scrollY = 0;
    window.dispatchEvent(new Event('scroll'));
    expect(container.classList.contains('stage1')).toBe(false);
    expect(container.classList.contains('stage2')).toBe(false);

    window.scrollY = 600; // between 0.5vh and 1.5vh
    window.dispatchEvent(new Event('scroll'));
    expect(container.classList.contains('stage1')).toBe(true);
    expect(container.classList.contains('stage2')).toBe(false);

    window.scrollY = 1600; // beyond 1.5vh
    window.dispatchEvent(new Event('scroll'));
    expect(container.classList.contains('stage1')).toBe(true);
    expect(container.classList.contains('stage2')).toBe(true);
  });
});

