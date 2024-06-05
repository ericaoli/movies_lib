# Movie_lib - utilisation de l'API TMDB avec REACT + VITE

## Technologies et dependences :
- React (version: 18.2.0), Vite (version: 5.2.0), Sass (version: 1.77.2);
- Dependencies: React-icons (version: 5.2.1), React-youTube (version: 10.1.0), better-react-carousel (version: 1.1.2);
- Deploy: gh-pages (version: 6.1.1), projet sur github pages;

### Objectifs :
- Projet réalisé en cadre d'études en autonomie en mai/2024. Vise l'apprentissage de la communication avec une API externe (TMDB), l'élaboration d'un site multi-pages en React, la consommation de différentes types de données de l'API (images, videos, textes).

# Documentation des composants:

## Home
- Page principale de l'application. Le composant récupère et affiche une liste de films actuellement à l'affiche, les présentant sous forme de liste et les films mieux notés dans un carrousel.

- Les films avec informations manquantes ne seront pas affichés (voir gestion d'erreurs dans le composant MovieCard).

### Gestion de l'état :

- **nowMovies**: variable d'état contient un tableau de films actuellement à l'affiche. Elle est initialisée comme un tableau vide.

### Fonctions

- `getNowListedMovies`: fonction asynchrone qui récupère les films du moment à partir d'une URL donnée, analyse la réponse en JSON et met à jour l'état `nowMovies` avec les résultats.

#### Gestion d'erreurs: 
- Utilisation de `try / catch` pour la capture et le traitement des erreurs => si la requête vers l'API échoue ou si la réponse renvoyée par l'API n'est pas dans le format attendu, une erreur sera lancée. Évite de laisser l'application échouer silencieusement ou se briser complètement et garantit que l'application puisse continuer à fonctionner de manière prévisible.

### Hooks

- **useEffect**: Un hook React qui s'exécute une fois lorsque le composant est monté. Il construit l'URL pour récupérer les films du moment et appelle `getNowListedMovies`.

### Structure JSX

- `<main>`
   - `<div className='container'>`: Contient le contenu principal de la page.
   - `<CarouselMovie />`: Composant qui affiche le carrousel de films mieux notés.
   - `<h2 className="title">`Films du moment :`</h2>`: En-tête pour la section des films.
   - `<div className="movies-container">`: Contient la liste des cartes de films.
   -  `<MovieCard key={movie.id} movie={movie} />`: Rend une carte pour chaque film dans le tableau `nowMovies`.

## Movie
- Page qui affichera les details des films (titre, slogan, bande-annonce, burget, facturation, durée et description) quand ils seront disponibles.

### Gestion de l'état :

#### Extraction de l'ID du film avec useParams :

- `const { id }` : Utilise la déstructuration pour extraire directement le paramètre id de l'objet retourné par useParams. Cet ID sera utilisé pour récupérer les détails du film via l'API.

#### Hooks d'état avec useState :

- `movie`: Variable d'état qui contiendra les informations détaillées du film récupérées à partir de l'API. Initialise l'état `movie` avec la valeur null, indiquant qu'aucune information de film n'a encore été chargée.
- `setMovie` : Fonction qui permet de mettre à jour l'état `movie`.

- `trailerId`: Variable d'état qui contiendra l'ID de la bande-annonce YouTube du film. Initialise l'état `trailerId` avec la valeur null, indiquant qu'aucune bande-annonce n'a encore été chargée.
- `setTrailerId` : Fonction qui permet de mettre à jour l'état `trailerId`.

- `error`: Variable d'état contiendra les messages d'erreur relatifs à la récupération des informations du film.
- `setError` : Fonction qui permet de mettre à jour l'état `error`. Initialise l'état `error` avec la valeur null, indiquant qu'aucune erreur n'est présente au départ.

- `trailerError`: Variable d'état contiendra les messages d'erreur relatifs à la récupération de la bande-annonce du film. Initialise l'état `trailerError` avec la valeur null, indiquant qu'aucune erreur n'est présente au départ pour la bande-annonce.
- `setTrailerError` : Fonction qui permet de mettre à jour l'état `trailerError`. 

### Fonctions
- `getMovie` et `getTrailer`: mettent à jour les états `movie` et `trailerId` respectivement, ou définissent les erreurs en utilisant `setError` et `setTrailerError` en cas de problème.

- Le rendu conditionnel basé sur les états (`movie`, `error`, `trailerId`, `trailerError`) permet d'afficher ou de masquer certaines parties de l'interface utilisateur en fonction des données disponibles et des erreurs éventuelles.

- `formatCurrency` : formate les nombres en devise americaine.

- `renderMovieInfo` : affiche les informations du film avec icône, label, valeur et le message "Information non disponible", si c'est le cas.