import casimirPhoto from '../assets/images/team/casimir-guivens.webp';
import endrickPhoto from '../assets/images/team/endrick-tessier.webp';
import marcPhoto from '../assets/images/team/marc-laurin.webp';
import nikchelinePhoto from '../assets/images/team/nikcheline-fanfan.webp';

const teamMembers = [
  {
    id: 'nikcheline-fanfan',
    fullName: 'Nikcheline FANFAN',
    initials: 'NF',
    responsibility: 'Maquettage, sémantique et accessibilité',
    description:
      'Membre de l’équipe responsable de la conception visuelle, de la structure sémantique et de l’accessibilité.',
    githubUsername: 'isteahnfanfan-ux',
    photo: nikchelinePhoto,
    photoAlt: 'Nikcheline FANFAN',
    isPlaceholder: false,
  },
  {
    id: 'endrick-tessier',
    fullName: 'Endrick TESSIER',
    initials: 'ET',
    responsibility: 'Composants React et routage',
    description:
      'Membre de l’équipe responsable des composants graphiques réutilisables et de la navigation React.',
    githubUsername: 'olikwan-fullstacker',
    photo: endrickPhoto,
    photoAlt: 'Endrick TESSIER',
    isPlaceholder: false,
  },
  {
    id: 'casimir-guivens',
    fullName: 'Casimir GUIVENS',
    initials: 'CG',
    responsibility: 'Context API et API GitHub',
    description:
      'Membre de l’équipe responsable des états globaux et de la récupération asynchrone des données GitHub.',
    githubUsername: 'Guivens509',
    photo: casimirPhoto,
    photoAlt: 'Portrait provisoire pour la fiche de Casimir GUIVENS',
    isPlaceholder: false,
  },
  {
    id: 'marc-laurin',
    fullName: 'Jonathan Marc-Laurin FRANÇOIS',
    initials: 'ML',
    responsibility: 'Backend Express, qualité et déploiement',
    description:
      'Membre de l’équipe responsable du serveur Express, des contrôles de qualité et du déploiement.',
    githubUsername: 'Francois-M04',
    photo: marcPhoto,
    photoAlt: 'Portrait provisoire pour la fiche de Marc LAURIN',
    isPlaceholder: false,
  },
];

export default teamMembers;