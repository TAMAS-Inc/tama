import { useNavigate } from 'react-router-dom';
import { ReactComponent as FullLogo } from '@/assets/logo/full_logo.svg';

export default function Intro() {
  const navigate = useNavigate();

  setTimeout(() => navigate('/main'), 1000);

  return (
    <div className="mt-64 p-12">
      <FullLogo className="w-full" />
    </div>
  );
}
