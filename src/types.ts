export interface Routes {
    route: string; // /profile/:id
    component: () => void;
    subRoutes?: Routes[];
  }