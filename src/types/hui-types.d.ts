export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  interface RoutesType {
    name: string;
    layout: string;
    component: () => JSX.Element;
    icon: JSX.Element | string;
    path: string;
    secondary?: boolean;
    sections?: any;
    id?: string;
  }

  interface Menus {
    id?: string;
    menu: Categoria[];
    views: string[];
    icon?: JSX.Element | string;
  }
  interface Categoria {
    titulo: string;
    layout: string;
    icon: JSX.Element | string;
    path: string;
    secondary?: boolean;
    sections?: SubCatergoria[];
    id?: string;
    route?: string;
  }
  interface SubCatergoria {
    id?: string;
    titulo: string;
    icon?: JSX.Element | string;
    route?: string;
    items?: ItemMenu[];
    isVisible?: boolean;
  }
  interface ItemMenu {
    titulo: string;
    route: string;
    isVisible?: boolean;
  }

  interface RouteObjectVaku {
    caseSensitive?: boolean;
    children?: RouteObject[];
    element?: React.ReactNode;
    index?: boolean;
    path?: string;
  }

  declare function createRoutesFromElements(
    children: React.ReactNode
  ): RouteObject[];
}
