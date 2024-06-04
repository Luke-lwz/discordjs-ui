
interface Routes {
    route: string; // /profile/:id
    component: () => void;
    subRoutes?: Routes[];
}



interface UIOptions {
    prefix?: string; // default: 'ui' 
    routeDirectory?: string; // default: '/ui'
    customRoutes?: Routes[]; // when provided, directory is not used
}


export default function createUI(options: UIOptions) {

  console.log('createUI');
}
