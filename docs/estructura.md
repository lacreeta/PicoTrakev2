# Estructura del projecte

Aquest projecte es basa en React amb Vite, utilitza TypeScript i TailwindCSS. A continuació es descriuen les carpetes i fitxers principals:

- `src/`: Conté tot el codi font.
  - `assets/`: Imatges, icones o estils específics.
  - `auth/`: Components i pantalles relacionades amb l'autenticació
  - `components/`: Components reutilitzables.
  - `components/pages/`: Pantalles principals de l'aplicació.
  - `context/`:  Conté gestors de context global de l’aplicació:
    - AuthContext.tsx: Manté l’estat d’autenticació de l’usuari i les funcions de login/logout.
    - DarkMode.tsx: Controla el mode fosc i clar de l’aplicació.
    - LanguageContext.tsx: Permet gestionar l’idioma seleccionat per l’usuari.
    - ModoRutaContext.tsx: Gestiona si l’usuari està en mode de creació de ruta (activar funcionalitats especials al mapa).
  
  - `language/`: Fitxers de configuració per a multilingüisme.
  - `map/`: Components i pantalles relacionades amb mapes i rutes
  - `types/`: Definicions globals de tipus TypeScript utilitzades a tot el projecte.
  - `utils/`: : Funcions auxiliars i helpers per a validacions, api, etc.
- `public/`: Fitxers estàtics accessibles públicament.

