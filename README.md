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

### Gestion de l'état :

- **nowMovies**: variable d'état contient un tableau de films actuellement à l'affiche. Elle est initialisée comme un tableau vide.

### Fonctions

- `getNowListedMovies`: fonction asynchrone qui récupère les films du moment à partir d'une URL donnée, analyse la réponse en JSON et met à jour l'état `nowMovies` avec les résultats.

- gestion d'erreurs: utilisation de `try / catch` pour la capture et le traitement des erreurs => si la requête vers l'API échoue ou si la réponse renvoyée par l'API n'est pas dans le format attendu, une erreur sera lancée. Évite de laisser l'application échouer silencieusement ou se briser complètement et garantit que l'application puisse continuer à fonctionner de manière prévisible.

### Hooks

- **useEffect**: Un hook React qui s'exécute une fois lorsque le composant est monté. Il construit l'URL pour récupérer les films du moment et appelle `getNowListedMovies`.

### Structure JSX

- `<main>`: L'élément principal de la page.
   - `<div className='container'>`: Contient le contenu principal de la page.
   - `<CarouselMovie />`: Un composant qui affiche un carrousel de films mieux notés.
   - `<h2 className="title">`Films du moment :`</h2>`: Un en-tête pour la section des films.
   - `<div className="movies-container">`: Contient la liste des cartes de films.
   -  `<MovieCard key={movie.id} movie={movie} />`: Rend une carte pour chaque film dans le tableau `nowMovies`.