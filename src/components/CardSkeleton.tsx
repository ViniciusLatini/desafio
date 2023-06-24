import React from 'react';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function CardSkeleton() {
  return(
    <Skeleton
      height={205.99}
      width={365}
      borderRadius={8}
    />
  )
}

export default CardSkeleton;