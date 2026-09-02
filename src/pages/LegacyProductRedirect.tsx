import { Navigate, useParams } from 'react-router-dom';
import { getCanonicalProduct } from '../data/catalogue';
import { NotFoundPage } from './NotFoundPage';

export function LegacyProductRedirect() {
  const { slug = '' } = useParams<{ slug: string }>();
  const match = getCanonicalProduct(slug);

  if (!match) {
    return <NotFoundPage title="MODEL UNFOUND" message="This legacy product URL does not match a published ORION model." />;
  }

  return <Navigate to={match.path} replace />;
}
