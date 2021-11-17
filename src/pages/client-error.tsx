import * as React from 'react';

export default () => {
  React.useEffect(() => {
    throw new Error('Test error from /client-error');
  });
  return <div>Testing Clientside Errors</div>;
};
