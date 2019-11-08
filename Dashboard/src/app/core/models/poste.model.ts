import { Etat } from './Settings/etat.model';


export class Poste {
  constructor(
    public id: number,
    public titre: string,
    public etat: Etat,
  ) {
  }

  public static empty(): Poste{
    return new Poste(
      0,
      "",
      Etat.empty()
    );
  }
}
