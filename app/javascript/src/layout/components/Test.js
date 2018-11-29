import React from 'react';

import { api } from 'src/_utils';

class Test extends React.Component {
  componentDidMount() {
    api.get('/users')
      .then((response) => {
        console.log('ok');
      })
      .catch((error) => {
        console.log('not ok');
      });
  }

  render() {
    return (
      <div>123</div>
    );
  }
}

export default Test;
