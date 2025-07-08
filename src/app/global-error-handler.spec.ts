import { GlobalErrorHandler } from './global-error-handler';

describe('GlobalErrorHandler', () => {
  it('should log and alert on error', () => {
    const handler = new GlobalErrorHandler();
    spyOn(console, 'error');
    spyOn(window, 'alert');
    const error = new Error('Test error');

    handler.handleError(error);

    expect(console.error).toHaveBeenCalledWith('Global error:', error);
    expect(window.alert).toHaveBeenCalledWith('An unexpected error occurred. Please try again later.');
  });
}); 