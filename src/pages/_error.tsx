import * as React from 'react';
import NextError from 'next/error';
import ExceptionLogger from '~/backplane/makeExceptionLogger';

interface WebUiError extends Error {
  message: string;
}

interface Props {
  error: WebUiError;
  statusCode?: number;
}

const defaultErrorCode = 400;

const Error = ({ statusCode, error }: Props) => {
  const messagePrefix = statusCode ? `${statusCode} Error - ` : '';
  const messageBody = (error && error.message) || '';
  const message = `${messagePrefix}${messageBody}`;
  ExceptionLogger.error(message, error);

  return (
    <NextError statusCode={statusCode || defaultErrorCode} error={error} />
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode, error: err };
};

export default Error;
