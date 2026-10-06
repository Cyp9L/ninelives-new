# Nine Lives Paris 🐱

Site web de l'association **Nine Lives Paris**, une association loi 1901 dédiée au sauvetage et à l'adoption de chats abandonnés à Paris.

🌐 **[ninelives.fr](https://ninelives.fr)**

---

## À propos

Nine Lives Paris recueille les chats abandonnés, trouvés, errants ou sortis de fourrière en région parisienne. Bénévoles et familles d'accueil les soignent et les préparent à trouver un foyer aimant (Paris et petite couronne — 75, 92, 93, 94).

## Fonctionnalités

- **Catalogue d'adoption** — Liste des chats disponibles à l'adoption, alimentée en temps réel depuis Trello
- **Formulaire d'adoption** — Dossier de candidature en ligne
- **Abandon** — Formulaire pour signaler un abandon ou un chat trouvé
- **Bénévolat** — Candidature pour devenir famille d'accueil
- **Galerie** — Photos des chats adoptés
- **Contact** — Formulaire de contact général

## Stack technique

| Couche | Techno |
|---|---|
| Framework | [Next.js 15+](https://nextjs.org) (App Router) |
| Langage | TypeScript |
| Style | Tailwind CSS v4 |
| Polices | Poppins (Google Fonts) + Hello Casual (locale) |
| Déploiement | [Vercel](https://vercel.com) |
| Analytique | Vercel Analytics + Speed Insights |

### Variables d'environnement requises

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique du site |
| `TRELLO_API_KEY` | Clé API Trello |
| `TRELLO_TOKEN` | Token Trello |
| `TRELLO_BOARD_ID` | ID du tableau Trello contenant les chats |
| `RESEND_API_KEY` | Clé API Resend (envoi d'emails) |
| `ADMIN_SECRET` | Secret pour l'accès à l'interface admin |

## Structure du projet

```
app/
├── adopter/          # Catalogue & fiches d'adoption
├── abandon/          # Formulaire d'abandon / chat trouvé
├── benevole/         # Candidature bénévole / famille d'accueil
├── galerie/          # Galerie photos
├── contact/          # Formulaire de contact
├── partenaires/      # Page partenaires
└── api/              # Routes API (formulaires, Trello, admin)

components/           # Composants React réutilisables
lib/                  # Utilitaires (client Trello, sanitisation)
public/               # Assets statiques (images, polices)
scripts/              # Scripts d'optimisation d'images
```

## Contact

📧 [asso@ninelives.fr](mailto:asso@ninelives.fr)
📍 133 rue du Faubourg du Temple, 75010 Paris

[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/ninelivesparis)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=flat&logo=facebook&logoColor=white)](https://www.facebook.com/NineLivesParis/)
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=flat&logo=youtube&logoColor=white)](https://www.youtube.com/channel/UCM5TNRKUzUebUnw4OwLfZKA)

---

*Association loi 1901 — Sauvetage et adoption de chats à Paris depuis 2018.*
