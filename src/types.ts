export interface Routes {
    route: string; // /profile/:id
    component: () => void;
    subRoutes?: Routes[];
  }



  export interface  UIMessage {
    name: string;
    description: string;
  }

  export interface UIMessageOptional extends Partial<UIMessage>{
    name?: string;
    description?: string;
  }