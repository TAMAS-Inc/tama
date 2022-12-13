import { tw } from '@/utils/tailwindMerge';
import { AD, NavigationHeader } from '@/components';

type TermsProps<T extends React.ElementType> = Component<T>;

export default function Terms({ className, ...restProps }: TermsProps<'div'>) {
  return (
    <div className={tw('pt-8', className)} {...restProps}>
      <NavigationHeader>이용약관</NavigationHeader>
      <div className="mt-8 mr-4 ml-4">
        <h2 className="text-body2 font-bold">제 1조 (목적)</h2>
        <p className="mt-2 mb-4 text-body3 text-Gray-600">
          이 약관은 타까마까 (이하 “회사”)가 제공하는 위치기반서비스와 관련하여
          회사와 개인위치정보주체와의 권리, 의무 및 책임사항, 기타 필요한 사항을
          규정함을 목적으로 합니다.
        </p>
        <h2 className="text-body2 font-bold">제 2조 (약관 외 준칙)</h2>
        <p className="mt-2 mb-4 text-body3 text-Gray-600">
          이 약관에 명시되지 않은 사항은 위치정보의 보호 및 이용 등에 관한 법률,
          개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률,
          전기통신기본법, 전기통신사업법 등 관계법령과 회사의 이용약관 및
          개인정보처리방침, 회사가 별도로 정한 지침 등에 의합니다.
        </p>
        <h2 className="text-body2 font-bold">제 3조 (법적대리인의 권리)</h2>
        <p className="mt-2 mb-4 text-body3 text-Gray-600">
          ① 회사는 만14세 미만 아동으로부터 개인위치정보를 수집ㆍ이용 또는
          제공하고자 하는 경우에는 만14세 미만 아동과 그 법정대리인의 동의를
          받아야 합니다. ② 법정대리인은 만14세 미만 아동의 개인위치정보를
          수집ㆍ이용ㆍ제공에 동의하는 경우 동의유보권, 동의철회권 및 일시중지권,
          열람ㆍ고지요구권을행사할 수 있습니다.
        </p>
      </div>
      <AD />
    </div>
  );
}
