interface User {
  userId: string | null;
  commutes: UserCommute[];
  agreement: UserAgreement;
  currentComId: UserCommute['comId'];
}

interface UserAgreement {
  allowLocation: boolean;
  allowMarketing: boolean;
}

interface Route {
  routeId: string;
  routeName: string;
}

interface Station {
  stationId: string;
  stationName: string;
}

interface UserCommute {
  comId: string;
  comName: string;
  station: Station;
  routes: Route[];
}

interface Inquiry {
  inquiryId: string;
  email: string;
  title: string;
  content: string;
  agreement: string
}