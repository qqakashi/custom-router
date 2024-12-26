import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { DynamicComponentLoaderProps } from './utils/interface';

const loadComponent = <P extends object>(componentName: string): React.ComponentType<P> => {
  return React.lazy(() => import(`./pages/${componentName}`));
};

export default function DynamicComponentLoader<P extends object>({componentName, componentProps}: DynamicComponentLoaderProps<P>) {

  // 使用Suspense组件来处理异步加载过程中的等待状态
  return (
    <Suspense fallback={<div className="comp-loader"><span>载入中&emsp;</span><Spin /></div>}>
      {/* 使用动态导入的组件，并传递参数 */}
      {React.createElement(loadComponent<P>(componentName), componentProps)}
    </Suspense>
  );
};