import { useNavigate } from 'react-router-dom';

type IntroProps<T extends React.ElementType> = Component<T>;

export default function Intro({ className, ...restProps }: IntroProps<'div'>) {
  const navigate = useNavigate();

  setTimeout(() => navigate('/main'), 1000);

  return (
    <div className="" {...restProps}>
      로고띄움
    </div>
  );
}
