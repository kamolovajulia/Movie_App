import React from 'react';

import { Spin } from 'antd';

function Loader() {
  return (
    <div className="example">
      <Spin tip="Loading..." size="large" contentHeight={800} fullscreen />
    </div>
  );
}

export default Loader;
