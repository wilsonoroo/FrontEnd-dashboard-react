function FirebaseRouteDecorador(route: string) {
  return function (constructor: Function) {
    // Añade la ruta de acceso a la clase
    constructor.prototype._route = route;
  };
}
