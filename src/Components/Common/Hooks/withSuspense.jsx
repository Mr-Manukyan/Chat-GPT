import React from 'react';
import { Loading } from '../Loading/Loading';



export const withSuspense = (Component) => {
  return (props) => {
    return (
      <React.Suspense fallback={<Loading />}>
        <Component {...props} />
      </React.Suspense>
    )
  }
}