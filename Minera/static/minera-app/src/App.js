import React from 'react';
import Button from '@atlaskit/button';

function App() {
  const localhostURL = 'http://localhost:4200';

  return (
    <Button href={localhostURL} appearance="primary">Primary button</Button>
  );
}

export default App;
