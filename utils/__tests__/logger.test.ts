import { transports } from 'winston';
import { logger } from '..';

describe('Logger', () => {
  it('Logger creation', () => {
    expect(logger).toBeDefined();
    expect(logger.transports).toHaveLength(1);
    expect(logger.transports[0]).toBeInstanceOf(transports.Console);
  });

  it('Info', () => {
    const spy = jest.spyOn(process.stdout, 'write').mockImplementation();

    logger.info('info message');

    expect(spy).toHaveBeenCalledWith(expect.stringContaining('info message'));
  });

  it('Warn', () => {
    const spy = jest.spyOn(process.stdout, 'write').mockImplementation();

    logger.info('warn message');

    expect(spy).toHaveBeenCalledWith(expect.stringContaining('warn message'));
  });

  it('Error', () => {
    const spy = jest.spyOn(process.stdout, 'write').mockImplementation();

    logger.info('error message');

    expect(spy).toHaveBeenCalledWith(expect.stringContaining('error message'));
  });
});