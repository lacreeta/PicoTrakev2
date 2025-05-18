# Contextos Globals

Aquest document descriu els contextos de React que gestionen estat global dins de l'aplicació PicoTrake.

## AuthContext.tsx

### Funcionalitat principal
Gestió de l'estat d'autenticació de l'usuari a través d’un context global.

### Tecnologies utilitzades
- React Context API
- `useState` per gestionar autenticació
- `localStorage` per persistir el token

### Propietats exposades
- `isAuthenticated: boolean`: indica si l’usuari està autenticat.
- `login(token: string)`: desa el token i activa l’estat autenticat.
- `logout()`: elimina el token i desactiva l’estat.

### Comportament destacat
- Inicialitza l’estat a partir del token desat al `localStorage`.
- S’utilitza per protegir rutes i accedir a funcionalitats restringides.

---

## DarkMode.tsx

### Funcionalitat principal
Permet activar o desactivar el mode fosc a nivell global.

### Tecnologies utilitzades
- React Context API
- TailwindCSS (classes `dark`)
- `localStorage` per recordar preferència

### Propietats exposades
- `darkMode: boolean`: estat del mode actual.
- `setDarkMode`: funció per canviar el mode.

### Comportament destacat
- Aplica o elimina la classe `dark` a `document.documentElement`.
- Desa la preferència per sessions futures.

---

## LanguageContext.tsx

### Funcionalitat principal
Gestió de l’idioma actiu dins de l’aplicació, integrat amb `i18next`.

### Tecnologies utilitzades
- React Context API
- `i18next` per canviar llengua i sincronitzar traduccions
- `useState` per controlar el valor actual

### Propietats exposades
- `language: string`: idioma actiu.
- `changeLanguage(lng: string)`: canvia l’idioma actiu i sincronitza amb `i18next`.

### Comportament destacat
- S’inicialitza amb la llengua definida per `i18next`.
- Canvis en l’estat també actualitzen la configuració global de `i18next`.

---

## ModoRutaContext.tsx

### Funcionalitat principal
Controla si l’aplicació es troba en mode de creació de ruta.

### Tecnologies utilitzades
- React Context API
- `useState` per estat booleà

### Propietats exposades
- `modoCrearRuta: boolean`: indica si el mode està actiu.
- `setModoCrearRuta(boolean)`: activa o desactiva el mode.

### Comportament destacat
- S’utilitza per mostrar interfície contextual durant la creació de rutes (com afegir punts al mapa).
- Error explícit si s’utilitza fora del `ModoRutaProvider`.