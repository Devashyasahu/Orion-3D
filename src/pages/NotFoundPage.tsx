import { useNavigate } from 'react-router-dom';
import { PageMeta } from '../components/common/PageMeta';

interface NotFoundPageProps {
  title?: string;
  message?: string;
}

export function NotFoundPage({
  title = 'PAGE UNCHARTED',
  message = 'This ORION route does not match a published world, series, or model.',
}: NotFoundPageProps) {
  const navigate = useNavigate();

  return (
    <div className="not-found-page min-h-screen bg-[#040406] text-white flex items-center justify-center px-6">
      <PageMeta
        title="Page Not Found | ORION 3D"
        description="This ORION 3D page could not be found. Explore available worlds and character models."
        path="/not-found"
      />
      <div>
        <span>ORION / 404</span>
        <h1>{title}</h1>
        <p>{message}</p>
        <div>
          <button type="button" onClick={() => navigate('/worlds')}>EXPLORE WORLDS -&gt;</button>
          <button type="button" onClick={() => navigate('/')}>RETURN HOME -&gt;</button>
        </div>
      </div>
    </div>
  );
}
