import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { Navigate, Route, Routes } from 'react-router-dom';
import { isUserValidState } from '@/state/atom';

interface Module {
  [modulePath: string]: { default: string };
}

const ROUTES: Module = import.meta.glob('/src/pages/**/[a-z[]*.tsx', {
  eager: true,
});
const PRESERVED: Module = import.meta.glob('/src/pages/(_app|404).tsx', {
  eager: true,
});

const routes = Object.keys(ROUTES).map((route) => {
  const path = route
    .replace(/\/src\/pages|index|\.tsx$/g, '')
    .replace(/\[\.{3}.+\]/, '*')
    .replace(/\[(.+)\]/, ':$1');

  return { path, component: ROUTES[route].default };
});

const preserved: { [key: string]: string } = Object.keys(PRESERVED).reduce(
  (result, file) => {
    const key = file.replace(/\/src\/pages\/|\.tsx$/g, '');
    return { ...result, [key]: PRESERVED[file].default };
  },
  {}
);

export const Router = () => {
  // eslint-disable-next-line @typescript-eslint/dot-notation
  const App = preserved?.['_app'] || Fragment;
  const NotFound = preserved?.['404'] || Fragment;
  const isUserValid = useRecoilValue(isUserValidState);
  return (
    <App>
      <Routes>
        {routes.map(({ path, component: Component = Fragment }) => (
          <Route
            key={path}
            path={path}
            element={
              path === '/Main/' && !isUserValid ? (
                <Navigate to="/landing/agreement" />
              ) : (
                <Component />
              )
            }
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </App>
  );
};
