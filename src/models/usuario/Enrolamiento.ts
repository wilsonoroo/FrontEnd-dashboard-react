export class Enrolamiento {
  fechaEnrolamiento: string;
  isCompletado: boolean;
  isTerminosCondicionesAceptada: boolean;
  versionTerminosCondiciones: string;

  constructor(
    isCompletado: boolean,
    isTerminosCondicionesAceptada?: boolean,
    versionTerminosCondiciones?: string
  ) {
    this.isCompletado = isCompletado;
    this.isTerminosCondicionesAceptada = isTerminosCondicionesAceptada;
    this.versionTerminosCondiciones = versionTerminosCondiciones;
  }
}
