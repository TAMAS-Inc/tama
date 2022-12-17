import { tw } from '@/utils/tailwindMerge';
import { AD, NavigationHeader } from '@/components';
import { TERMS_OF_SERVICE } from '@/utils/termsOfService';

type TermsProps<T extends React.ElementType> = Component<T>;

export default function Terms({ className, ...restProps }: TermsProps<'div'>) {
  const { term } = TERMS_OF_SERVICE;
  return (
    <div className={tw('', className)} {...restProps}>
      <NavigationHeader>이용약관</NavigationHeader>
      <div className="mt-8 mr-4 ml-4">
        {term.map(({ title, content }) => (
          <div>
            <h2 className="text-body2 font-bold">{title}</h2>
            <p className="mt-2 mb-4 text-body3 text-Gray-600">
              {typeof content === 'string'
                ? content
                : content.map((item) => <p className="pt-2">{item}</p>)}
            </p>
          </div>
        ))}
      </div>
      <AD />
    </div>
  );
}
