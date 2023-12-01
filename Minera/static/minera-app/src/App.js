import React, {useEffect, useState} from 'react';
import Button from '@atlaskit/button';
import { view } from "@forge/bridge";

function App() {
  const [data, setData] = useState(null);
  let localhostURL = 'http://localhost:4200';

  useEffect(() => {
    const fetchData = async () => {
      return await view.getContext();
    };

    fetchData().then(r => {
      setData(r);
    });
  }, []);

  return (
    <div>
      {data ? (
        <Button href={localhostURL + '/' + data.extension.issue.key} appearance="primary">Generate estimation</Button>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
