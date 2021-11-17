export interface Global {
  analytics: {
    page: jest.Mock;
    track: jest.Mock;
    identify: jest.Mock;
    load: jest.Mock;
  };
}

declare const global: Global;

global.analytics = {
  page: jest.fn(),
  track: jest.fn(),
  identify: jest.fn(),
  load: jest.fn(),
};

jest.mock('@circleci/exception-logger', () => ({
  default: () => ({
    error: jest.fn(),
  }),
}));
