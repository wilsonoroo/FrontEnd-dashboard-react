export class UsuarioVaku {
  permisos: Permisos | null;
  areaCargi: string | null;
  cargo: string | null;
  displayName: string | null;
  email: string | null;
  empresa: string | null;
  empresaId: string | null;
  fechaFirmado: string | null;
  fotografia: {
    url: string | null;
  };
  rut: string | null;
  rol: {
    displayName: string | null;
    nombre: string | null;
  };
  sexo: string | null;
}
export class Permisos {
  administrador: boolean;
}
