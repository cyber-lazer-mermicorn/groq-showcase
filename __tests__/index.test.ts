import { chatWithGroq } from '../lib/groq';

describe('chatWithGroq', () => {
  it('should be defined', () => {
    expect(chatWithGroq).toBeDefined();
  });

  it('should be a function', () => {
    expect(typeof chatWithGroq).toBe('function');
  });
});
