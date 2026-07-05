export type FramingAction = 'vue-complète' | 'focus-large' | 'focus-serré';

export interface ChapterZone {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  text: string;
  microNote: string;
  zone: ChapterZone;
  framing: FramingAction;
}

export const MAP_CANVAS = { width: 10880, height: 8160 } as const;

export const MAP_IMAGE_URL =
  'https://iiif.digitalcommonwealth.org/iiif/2/commonwealth:x633f9472/full/2400,/0/default.jpg';

export const SOURCE_CREDIT =
  'Digital Commonwealth · Boston Public Library · Leventhal Map & Education Center';

export const chapters: Chapter[] = [
  {
    id: 'ch-1-theatre-entier',
    number: 1,
    title: 'Le théâtre entier',
    text:
      "La feuille présente un monde entier, contenu dans une seule page. L'ovale y encadre des terres et des mers que l'œil embrasse d'un seul tenant, sans défilement ni coupure. La carte donne à voir, en une image, le globe rendu regardable : terres émergées, étendues marines, et un large continent austral qui en occupe le bas. La composition ne hiérarchise pas d'emblée les régions ; elle installe d'abord une scène commune.\n\nCette vue d'ensemble est le point depuis lequel chaque chapitre déplacera ensuite le regard. L'organisation distingue déjà, en creux, ce que l'on nomme avec assurance et ce que la feuille laisse en suspens. Tout est posé, rien n'est encore précisé.",
    microNote:
      "À regarder : l'ovale qui contient toutes les terres, et la masse austral occupant tout le bas de la feuille.",
    zone: { x: 0, y: 0, width: 10880, height: 8160 },
    framing: 'vue-complète',
  },
  {
    id: 'ch-2-monde-annonce',
    number: 2,
    title: 'Le monde annoncé',
    text:
      "Au sommet de la feuille, le cartouche supérieur déploie un titre monumental : Typus Orbis Terrarum. Cette zone permet de lire le monde avant de le parcourir, comme un programme graphique posé au-dessus de l'image. L'ornementation y est dense : bandeaux, figures allégoriques, culs-de-lampe, lettres travaillées. Ce dispositif encadre la carte d'une autorité éditoriale, mais ne la commente pas directement.\n\nLa représentation suggère que la feuille se présente d'abord comme un objet à exhiber, un titre déclaré. Rien, dans cette zone, ne décrit encore les terres ; tout annonce qu'il y aura lieu de les nommer. La lecture commence ici par la déclaration, non par le contenu. Le cartouche donne le ton de ce qui suit.",
    microNote:
      "À regarder : les lettres du titre, Typus Orbis Terrarum, encadrées par l'ornementation du bandeau supérieur.",
    zone: { x: 3046, y: 0, width: 4787, height: 1387 },
    framing: 'focus-serré',
  },
  {
    id: 'ch-3-mesurer-monde',
    number: 3,
    title: 'Mesurer le monde',
    text:
      "La carte donne à voir le monde dans une forme ovale, et cette forme n'est pas neutre : elle impose une mesure. Autour de l'ovale, des degrés sont gravés, traçant un réseau régulier de méridiens et de parallèles.\n\nCette zone permet de lire un monde quadrillé, rapporté à des coordonnées plutôt qu'abandonné à sa seule silhouette. Le bord de l'ovale porte ces repères chiffrés, comme une échelle posée sur l'image. Ce détail rend visible une opération : la Terre devient calculable, découpée en degrés. La représentation suggère une géographie ordonnée, où chaque point peut être situé. L'organisation distingue, par ce réseau, le regard savant d'une simple énumération de terres. Mesurer, ici, précède la description.",
    microNote:
      "À regarder : les degrés chiffrés gravés tout autour de l'ovale, à l'extérieur de la carte.",
    zone: { x: 1523, y: 1306, width: 7834, height: 5222 },
    framing: 'focus-large',
  },
  {
    id: 'ch-4-noyau-certitude',
    number: 4,
    title: 'Le noyau de certitude',
    text:
      "Sur l'Europe et le bassin méditerranéen, la carte se lit plus nettement. Les toponymes y sont plus serrés, les contours plus assurés, les côtes plus détaillées. Cette zone permet de lire un gradient de connaissance : on y nomme plus de lieux, plus densément, qu'ailleurs. L'organisation distingue des régions décrites avec précision et d'autres, plus lointaines, restées approximatives.\n\nLa représentation ne fait pas de l'Europe un centre politique absolu ; elle reflète, par sa densité de noms, un état inégal des savoirs géographiques. Ce détail rend visible une hiérarchie de lisibilité plutôt qu'une hiérarchie de valeur. On aperçoit, à la densité des inscriptions, où la carte s'appuie sur des sources plus fournies. Le noyau n'écrase pas le reste : il éclaire, par contraste, ce qui reste plus vague.",
    microNote:
      "À regarder : le resserrement des noms de villes et de régions autour de la Méditerranée, à comparer avec les marges.",
    zone: { x: 4026, y: 2693, width: 2611, height: 1632 },
    framing: 'focus-serré',
  },
  {
    id: 'ch-5-monde-inacheve',
    number: 5,
    title: 'Le monde inachevé',
    text:
      "Aux bords occidentaux, la carte devient plus hésitante. Cette zone permet de lire, dans le tracé des côtes américaines, un savoir partiel : les contours y sont plus vagues, les noms plus clairsemés, le trait haché. On aperçoit, à la périphérie de l'image, où la description s'arrête.\n\nLa représentation suggère une limite de la connaissance, non une intention de cacher. Ce détail rend visible le moment où la feuille cesse de nommer avec assurance. L'organisation distingue, par contraste avec l'Europe, des régions que l'on devine plus que l'on ne les décrit. La carte donne à voir, dans ces bords, le propre de toute cartographie : un savoir qui s'amincit vers ses marges. Le monde, ici, reste inachevé — non par négligence, mais par état des sources.",
    microNote:
      "À regarder : le tracé hésitant et les noms clairsemés de la côte occidentale américaine, à la lisière de la feuille.",
    zone: { x: 1088, y: 2530, width: 2611, height: 2938 },
    framing: 'focus-large',
  },
  {
    id: 'ch-6-mers-passage-conjecture',
    number: 6,
    title: 'Les mers : passage et conjecture',
    text:
      "La mer n'est pas ici un vide. Cette ceinture atlantique permet de lire un espace de passage entre l'Europe, l'Afrique et les Amériques : on y aperçoit des navires, des trajectoires esquissées, des îles ponctuant la traversée. La représentation suggère un océan pratiqué, non un simple intervalle.\n\nMais la mer ouvre aussi un espace de conjecture. Ce détail rend visible un savoir maritime inégal : certaines étendues sont nommées, d'autres demeurent plus indécises. L'organisation distingue des mers traversées et des mers davantage imaginées. La carte donne à voir, dans le même bleu, du connu et du pressenti. Vers l'est, l'océan Indien prolonge ce geste : ses îles et ses annotations laissent deviner une zone de connaissance encore partielle. La mer, sur cette feuille, tient lieu à la fois de lien et d'inconnu.",
    microNote:
      "À regarder : les navires et trajectoires esquissées dans la ceinture atlantique ; puis, vers l'est, l'océan Indien, second repère où le tracé maritime devient plus incertain.",
    zone: { x: 2611, y: 2203, width: 2611, height: 2448 },
    framing: 'focus-large',
  },
  {
    id: 'ch-7-sud-hypothetique',
    number: 7,
    title: 'Le sud hypothétique',
    text:
      "En bas de la feuille, une vaste masse ferme la carte : la Terra Australis. Cette zone permet de lire un sud dessiné comme une terre, avec des côtes, des noms, des golfes — et pourtant largement conjectural. La représentation suggère un continent posé par déduction plus que par observation. Ce détail rend visible une cartographie qui comble le vide plutôt qu'elle ne le désigne. L'organisation distingue, ici, ce que l'on imagine de ce que l'on a parcouru.\n\nSous cette masse, le cartouche inférieur porte une citation de Cicéron rappelant l'étroitesse du monde habité. La carte donne ainsi à se refermer sur une pensée : l'immensité du globe, et la part minuscule que l'on en connaît. La feuille se referme, non sur une réponse, mais sur une question posée au lecteur.",
    microNote:
      "À regarder : la Terra Australis, grande masse découpée de côtes et de noms, et, sous elle, le cartouche inférieur portant la citation de Cicéron.",
    zone: { x: 1958, y: 5630, width: 6746, height: 1469 },
    framing: 'focus-large',
  },
];
