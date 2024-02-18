import React from 'react';

import { Spin, ConfigProvider } from 'antd';

const Loader = () => (
  <ConfigProvider
    theme={{
      components: {
        Spin: {
          fontSize: 18,
          dotSizeLG: 50,
        },
      },
    }}
  >
    <div className='example'>
      <Spin tip='Loading...' size='large' contentHeight={800} fullscreen>
        <> </>
      </Spin>
    </div>
  </ConfigProvider>
);

export default Loader;
