// Define una función que crea decoradores para los campos del formulario
function FormField(configFn: (options: any) => any) {
  return function (target: any, propertyName: string) {
    // Si la clase no tiene metadatos de formulario, añade un objeto vacío
    if (!target.constructor._formMetadata) {
      target.constructor._formMetadata = {};
    }

    // Añade la función de configuración del campo del formulario para la propiedad
    target.constructor._formMetadata[propertyName] = configFn;
  };
}
