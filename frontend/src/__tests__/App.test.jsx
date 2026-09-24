import { describe, expect, it } from 'vitest';
import { describeResults } from '../App.jsx';

describe('describeResults', () => {
  it('shows loading when items are loading and count is zero', () => {
    expect(
      describeResults({
        status: 'loading',
        count: 0,
        category: null,
        query: '',
      }),
    ).toBe('Loading items…');
  });

  it('describes a single item', () => {
    expect(
      describeResults({
        status: 'ready',
        count: 1,
        category: null,
        query: '',
      }),
    ).toBe('Showing 1 item');
  });

  it('describes multiple items in a category', () => {
    expect(
      describeResults({
        status: 'ready',
        count: 5,
        category: 'Nature',
        query: '',
      }),
    ).toBe('Showing 5 items in Nature');
  });

  it('includes the search query', () => {
    expect(
      describeResults({
        status: 'ready',
        count: 3,
        category: null,
        query: 'sunset',
      }),
    ).toBe('Showing 3 items matching “sunset”');
  });
});