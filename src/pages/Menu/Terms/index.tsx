import { tw } from '@/utils/tailwindMerge';
import { AD, NavigationHeader } from '@/components';
import { TERMS_OF_SERVICE } from '@/assets/data/termsOfServices';

type TermsProps<T extends React.ElementType> = Component<T>;

export default function Terms({ className, ...restProps }: TermsProps<'div'>) {
  const { term } = TERMS_OF_SERVICE;
  return (
    <div className={tw('', className)} {...restProps}>
      <NavigationHeader>이용약관</NavigationHeader>
      <div className="mt-8 mr-4 ml-4">
        {term.map(({ title, content }) => (
          <div key={title}>
            <h2 className="text-body2 font-bold">{title}</h2>
            <div className="mt-2 mb-4 text-body3 text-Gray-600">
              {typeof content === 'string'
                ? content
                : content.map((item) => (
                    <p key={item} className="pt-2">
                      {item}
                    </p>
                  ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
