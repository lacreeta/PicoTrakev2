# Components 

## AdCard.tsx

### Propòsit:
* Component encarregat de mostrar un anunci individual dins la interfície, amb el seu títol, contingut i data de vigència si aplica. Està pensat per adaptar-se segons el tipus d'usuari.

### Props:
* ad: Anuncio – objecte amb les dades de l’anunci: titulo, contenido, tipo_usuario, dates, etc.

### Integració:
* S’utilitza com a component fill dins pantalles o seccions que mostren múltiples anuncis, segons el context de l’usuari.

### Lògica destacada:
* Simple renderitzat de dades amb condicional per mostrar dates només si estan disponibles.

## Footer.tsx
### Propòsit:
* Component de peu de pàgina global, inclou enllaços a seccions clau, el selector d’idioma, enllaços de descàrrega i el logo de l’aplicació.

### Integració:
* Utilitza react-i18next per a la traducció dels textos i context de DarkMode per adaptar estils.

### Lògica destacada:

* Traducció dinàmica amb **t('clau')**.
* Estils adaptats segons mode fosc.
* Càrrega d’imatges locals (/GooglePlay.png, /Logo.png).


## Header.tsx
### Propòsit:
* Barra superior de navegació de l’aplicació, inclou el menú, l'accés a usuari, idiomes, i mode fosc.

### Integració:

* Usa AuthContext per detectar si l’usuari està loguejat.
* Inclou enllaços a rutes amb react-router-dom.
* Manipula el DOM per gestionar el menú desplegable amb useRef.

### Lògica destacada:

* Canvi de idioma.
* Comportament de menú responsive.
* Control de mode fosc via context.

## Logo.tsx
### Propòsit:
* Component SVG reutilitzable per mostrar el logotip de l’app en qualsevol lloc.

### Props:
* className: opcional per passar estils CSS.
* Altres props SVG genèrics.

### Integració:
* S’empra a Header, Footer, o qualsevol lloc on calgui mostrar la marca.

## RutaFormModal.tsx
### Propòsit:
* Formulari modal per introduir les dades d’una ruta abans de guardar-la (nom, descripció, ubicació, dificultat...).

### Props:
* puntos: array de coordenades GPS de la ruta.
* onClose: funció per tancar el modal.

### Integració:

* Envia petició POST amb axios al backend per guardar la ruta.
* Mostra feedback amb SweetAlert segons l’èxit o error.

### Lògica destacada:

* Validació de camps abans d’enviar.
* Construcció d’un objecte GeoJSON a partir dels punts rebuts.
* Comprovació d’autenticació mitjançant token a localStorage.


# Pages

## AboutScreen

### Funcionalitat principal
Aquest component mostra informació general sobre l'aplicació PicoTrake. Inclou descripció, objectius del projecte, i seccions explicatives amb text que es pot traduir.

### Tecnologies utilitzades
- React amb TypeScript
- TailwindCSS
- i18next per a la traducció dels textos

### Dependències i context
- `useTranslation` per accedir a les claus de traducció
- Disseny responsive amb classes utilitzades de Tailwind

### Inputs i estat intern
No utilitza props ni estat intern. Tots els textos són estàtics i traduïts.

### Comportament destacat
Estructura de contingut per seccions amb títol, text i separació clara per l'usuari. Ideal per mostrar informació corporativa o institucional.


## ChangePassword.tsx

### Funcionalitat principal
Permet a un usuari canviarse la contrasenya mitjançant un formulari amb validació. L'usuari ha d'introduir una nova contrasenya i confirmar-la.

### Tecnologies utilitzades
- React amb TypeScript
- SweetAlert2 per mostrar alertes
- TailwindCSS per a l’estilització
- Context d’autenticació
- Validació local amb `useState`

### Inputs i estat
- `useState` per emmagatzemar la nova contrasenya, la confirmació i l'error.
- `AuthContext` per obtenir `id_usuario`.

### Comunicació amb API
- Envia una petició PUT a l’endpoint `/usuarios/contrasena/{id}` amb la nova contrasenya.

### Comportament destacat
- Validació de la contrasenya amb expressió regular.
- Control d'errors i confirmació amb SweetAlert.
- Resposta visual immediata per l'usuari.


## ContactScreen.tsx

### Funcionalitat principal
Mostra la informació de contacte i ofereix un formulari perquè l’usuari enviï un missatge al suport tècnic o administratiu.

### Tecnologies utilitzades
- React amb TypeScript
- TailwindCSS
- i18next
- SweetAlert2

### Inputs i estat
- `useState` per gestionar els camps: nom, email i missatge.

### Comunicació amb API
- Envia una petició POST a `/contacte` (o similar) amb les dades del formulari.

### Comportament destacat
- Validació de correu i control de missatges buits o amb paraules ofensives.
- Mostra alerta en cas d’èxit o error.
- Alterna entre dues vistes: informativa i formulari actiu.


## HelpScreen.tsx

### Funcionalitat principal
Proporciona ajuda contextual a l’usuari sobre funcionalitats específiques de l’app com la creació de rutes, configuració de perfil o mode offline.

### Tecnologies utilitzades
- React
- i18next per a la traducció
- TailwindCSS per l’estil
- FontAwesome per a icones

### Inputs i estat
- `useState` per saber quin tema d'ajuda està seleccionat.

### Comportament destacat
- Interacció dinàmica: canvia de tema d’ajuda segons l’element clicat.
- Carrega textos traduïts per tema.


## Home.tsx

### Funcionalitat principal
Pantalla principal que veu l’usuari un cop autenticat. Mostra el nom, l’historial de rutes i permet buscar i eliminar dades.

### Tecnologies utilitzades
- React amb TypeScript
- Axios per accedir al backend
- TailwindCSS
- i18next
- Context d'autenticació

### Inputs i estat
- Cerca per nom, data inicial i final.
- `useState` i `useEffect` per gestionar rutes filtrades.

### Comunicació amb API
- GET a `/historial/{id}` i DELETE per esborrar historial.

### Comportament destacat
- Filtres amb debounce i actualització reactiva.
- Botó de reinici d’historial amb confirmació.
- Personalització del missatge de benvinguda segons idioma.

## Index.tsx

### Funcionalitat principal
Pantalla de benvinguda per usuaris no registrats. Presenta l’aplicació amb una crida a l'acció destacada i secció d'avantatges visuals.

### Tecnologies utilitzades
- React amb TypeScript
- i18next
- TailwindCSS

### Inputs i estat
Cap. Tot el contingut és estàtic i traduït.

### Comportament destacat
- Layout amb Hero inicial, icones destacades i botons per iniciar sessió o registrar-se.
- Imatge visual que complementa el contingut textual.

## PremiumScreen.tsx

### Funcionalitat principal
Pantalla informativa per a usuaris interessats en subscriure’s al pla premium. Mostra avantatges i funcionalitats exclusives.

### Tecnologies utilitzades
- React + TypeScript
- TailwindCSS
- React Router DOM (`useNavigate`)
- Context de tema fosc (`DarkModeContext`)

### Dependències i context
- `DarkModeContext`: adapta el tema visual.
- `useNavigate()`: per tornar enrere.

### Inputs (props) i estat intern
Sense props ni `useState`.

### Comunicació
No fa crides a API. Navegació local.

### Comportament destacat
Canvi automàtic de tema. Interfície enfocada a conversió premium.


## Profile.tsx

### Funcionalitat principal
Mostra el perfil públic d’un usuari, amb informació com el nom, imatge, estadístiques de rutes i llistat de rutes creades.

### Tecnologies utilitzades
- React
- TailwindCSS
- React Router (`useParams`)
- Axios per obtenir les dades del backend

### Dependències i context
- Fa una petició GET a l’API amb `id` d’usuari.
- Utilitza `useEffect` per fer la càrrega inicial.

### Inputs
- `id` del paràmetre de ruta.

### Comunicació
Fa una crida a `/usuarios/{id}` per obtenir dades del perfil.

### Comportament destacat
Renderitzat condicional si no hi ha rutes, ús de loading state i control d’errors simple.


## RoutesScreen.tsx

### Funcionalitat principal
Llista de rutes pròpies de l’usuari autenticat. Permet buscar, filtrar i accedir al detall de cada ruta.

### Tecnologies utilitzades
- React + TypeScript
- Context d’autenticació
- Axios
- TailwindCSS

### Dependències i context
- `AuthContext` per obtenir `id_usuario`
- Cerca per nom, data inicial i final
- `useEffect` per carregar dades des de l’API

### Inputs
Cap (funciona per context)

### Comunicació
GET a `/rutes/usuari/{id_usuario}` amb JWT

### Comportament destacat
Filtrat client + actualització automàtica quan canvien els camps.


## RutaDetalleScreen.tsx

### Funcionalitat principal
Mostra els detalls d’una ruta concreta en format visual i estructurat, incloent mapa amb la traça.

### Tecnologies utilitzades
- React
- Axios
- React Router (useParams)
- Leaflet (visualització mapa)

### Dependències
- Crida a l’API per obtenir info de la ruta
- Renderitzat condicional de dades carregades

### Inputs
- `id` de la ruta (via URL)

### Comunicació
GET `/ruta/{id}`

### Comportament destacat
Integra mapa Leaflet amb coordenades GeoJSON.


## SecurityTool.tsx

### Funcionalitat principal
Eina interactiva per mostrar bones pràctiques de seguretat en format visual.

### Tecnologies utilitzades
- React
- TailwindCSS

### Dependències
Sense dependències externes.

### Inputs i estat
Utilitza `useState` per gestionar pestanyes actives.

### Comportament destacat
Simula navegació entre consells de seguretat.


## Settings.tsx

### Funcionalitat principal
Pantalla de configuració amb accés a canvis de tema, idioma, contrasenya, i accions de compte.

### Tecnologies utilitzades
- React
- TailwindCSS
- Navegació local
- Contexts (DarkMode, Language)

### Inputs
Cap. Navegació i accions directes.

### Comportament destacat
Enllaços a pantalles de configuració: idioma, perfil, etc.


## SettingsProfile.tsx

### Funcionalitat principal
Pantalla de configuració del perfil: permet modificar nom, edat, estat, imatge i contrasenya.

### Tecnologies utilitzades
- React
- Axios
- Tailwind
- Context d’autenticació

### Dependències
- Crida PATCH al backend amb les dades modificades.

### Inputs
Estat intern controlat amb `useState`

### Comunicació
PATCH a `/usuarios/{id}` amb dades parcialment modificades

### Comportament destacat
Validació bàsica de camps i control de sessió.


## TermsOfUseScreen.tsx

### Funcionalitat principal
Mostra els termes d’ús en format traduïble i responsive.

### Tecnologies utilitzades
- React
- i18next
- Tailwind

### Dependències
Utilitza `useTranslation()` per mostrar els textos traduïts.

### Comportament destacat
Simplement renderitza claus `t('terms.title')`, `t('terms.text')`...


# Autenticació 
## Pages
### Login.tsx

#### Funcionalitat principal
Component de formulari per a l'inici de sessió d’usuaris. Gestiona l’autenticació amb el backend, mostrant errors en cas de credencials incorrectes o problemes de connexió.

#### Tecnologies utilitzades
- React amb TypeScript
- React Router (`useNavigate`)
- Context d'autenticació (`AuthContext`)
- TailwindCSS per l'estil
- i18next per traduccions
- SweetAlert2 per feedback visual
- `AbortController` per controlar el timeout de la petició

#### Inputs i estat
- `email`, `contrasena` (credentials de l'usuari)
- `loading`: per indicar estat de càrrega
- Gestió de missatges i errors mitjançant modals

#### Comunicació amb el backend
- POST a `https://api.picotrakeclub.tech/login` amb JSON de credencials
- Token rebut es guarda mitjançant `login(token)`

#### Comportament destacat
- Si el login és correcte, redirigeix a `/home`
- Si falla, mostra missatges contextuals amb disseny adaptat a mode clar/fosc
- Inclou botó de reinici de contrasenya

---

### SignUp.tsx

#### Funcionalitat principal
Component de registre multi-pas. L’usuari introdueix el correu, després la contrasenya, i finalment el seu nom i cognoms. Valida les dades abans de fer la petició de creació.

#### Tecnologies utilitzades
- React amb TypeScript
- TailwindCSS
- i18next
- SweetAlert2
- React Router
- Context d'autenticació
- Validacions personalitzades amb funcions de `utils/validators`

#### Inputs i estat
- `step`: pas actual (1 - email, 2 - contrasenya, 3 - dades personals)
- `email`, `contrasena`, `nombre`, `apellido`
- Validació i missatges d’error controlats amb `useState`

#### Comunicació amb el backend
- POST a `/usuarios` per crear compte
- POST a `/login` per iniciar sessió automàticament si es crea correctament

#### Comportament destacat
- Formulari progressiu amb navegació entre passos
- Validació de format de correu i complexitat de contrasenya
- Feedback visual per cada acció amb SweetAlert

---

## Component 
### FormContainer.tsx

#### Funcionalitat principal
Component contenidor per encapsular formularis amb estils consistents. És reutilitzable i personalitzable.

#### Tecnologies utilitzades
- React amb TypeScript
- TailwindCSS

#### Propietats
- `children`: contingut intern
- `className`: opcional per afegir classes personalitzades

#### Comportament destacat
- Afegeix estil de targeta amb fons, ombra i vores arrodonides
- Suporta tema fosc amb fons `dark:bg-gray-800`

# Mapes

## MapScreen.tsx

### Funcionalitat principal
Pantalla principal per a la visualització i interacció amb el mapa. Permet cercar ubicacions, veure rutes, crear-ne de noves i gestionar punts sobre el mapa.

### Tecnologies utilitzades
- React amb TypeScript
- React Router (`useLocation`)
- TailwindCSS
- Leaflet (via `MapComponent`)
- Contexts personalitzats (`ModoRutaContext`, `DarkModeContext`)
- Fetch API (integració amb Nominatim)

### Inputs i estat
- `searchQuery`: text de cerca actiu
- `searchResult`: resultat seleccionat
- `suggestions`: resultats suggerits
- `mostrarFormulario`: booleà per obrir modal de creació de ruta
- `puntosSeleccionados`: llista de punts per la nova ruta
- `mostrarBotonCrearRuta`: toggle de visibilitat del botó
- `modoCrearRuta`: control del mode de creació actiu

### Comportament destacat
- Consulta a Nominatim per autocompletar ubicacions
- Interfície interactiva per crear i guardar rutes amb formulari
- Suport per tema fosc i mode responsive
- Utilitza `MapComponent` per mostrar rutes i punts
- Controla visibilitat de capçalera, formularis i accions contextuals

---

## Map.tsx

### Funcionalitat principal
Component central del mapa. Mostra rutes carregades, muntanyes, punts de cerca i editor de rutes interactiu mitjançant Leaflet.

### Tecnologies utilitzades
- Leaflet (JS + CSS)
- React amb TypeScript
- TailwindCSS
- Context de mode fosc
- Fetch API (per muntanyes)
- Gestió de GeoJSON i marcadors Leaflet

### Props
- `searchResult`: coordenades i nom de cerca
- `ruta`: ruta carregada en format GeoJSON
- `modoCrearRuta`: activació del mode de traçat manual
- `onPuntosChange`: callback per enviar punts seleccionats

### Comportament destacat
- Carrega i renderitza muntanyes des de backend amb propietats contextuals (dificultat, permisos de pernocta...)
- Permet crear rutes fent clic, eliminar punts o afegir-ne al mig
- Mostra popup personalitzat amb accions: eliminar/moure punt
- Dibuixa polyline i punts dinàmicament
- Canvia l'estil del mapa segons el mode fosc
- Ús de refs persistents per gestionar capes Leaflet

---

## SearchBar.tsx

### Funcionalitat principal
Barra de cerca reutilitzable per introduir text i llançar consultes. S'integra amb el component `Header` i `MapScreen`.

### Tecnologies utilitzades
- React amb TypeScript
- TailwindCSS
- React Icons (`FaSearch`)
- Context `DarkModeContext`

### Props
- `searchQuery`: estat controlat de text
- `setSearchQuery`: setter de l’estat extern

### Comportament destacat
- Traducció automàtica del placeholder segons idioma del navegador
- Estil adaptat a mode clar/fosc
- Accessible (`aria-label`, `sr-only`) i compatible amb navegació per teclat

