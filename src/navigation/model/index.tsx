import { ComponentType, ReactNode } from "react";
import {
  ActionFunction,
  LazyRouteFunction,
  LoaderFunction,
  NonIndexRouteObject,
  ShouldRevalidateFunction,
} from "react-router-dom";

export interface IRouteObject extends NonIndexRouteObject {
  name?: string;
  children?: IRouteObject[];
}

export class RouterJson implements IRouteObject {
  name?: string;
  children?: IRouteObject[];
  caseSensitive?: boolean;
  path?: string;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  hasErrorBoundary?: boolean;
  shouldRevalidate?: ShouldRevalidateFunction;
  handle?: any;
  index?: false;
  element?: ReactNode;
  errorElement?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/ban-types
  Component?: ComponentType<{}>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  ErrorBoundary?: ComponentType<{}>;
  lazy?: LazyRouteFunction<NonIndexRouteObject>;
  isSubMenu?: boolean;
  categoria?: string;
}
