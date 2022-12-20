interface User {
  userId: string | null;
  commutes: Commute[];
  agreement: Agreement;
  currentComId: Commute['comId'];
  editing: Commute;
}

interface Agreement {
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

interface Commute {
  comId: string;
  comName: string;
  station: Station | null;
  routes: Route[];
}

interface Inquiry {
  inquiryId: string;
  email: string;
  title: string;
  content: string;
  agreement: string;
}
