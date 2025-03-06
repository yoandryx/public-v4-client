import RenderMultisigRoute from '@/components/RenderMultisigRoute';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Suspense } from 'react';

const Index = () => {
  return (
    <Suspense>
      <RenderMultisigRoute />
    </Suspense>
  );
};

export default Index;
