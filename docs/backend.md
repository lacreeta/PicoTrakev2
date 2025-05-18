# Connexió amb el backend

L'aplicació es comunica amb una API REST implementada amb FastAPI. Les peticions es fan mitjançant `fetch` o `axios` (segons el cas), i inclouen:

- Login / registre d'usuari
- Creació i consulta de rutes
- Recuperació d’informació de muntanyes

L'autenticació es fa mitjançant **JSON Web Tokens (JWT)**. El token es guarda localment i s'envia a les peticions protegides via capçalera `Authorization: Bearer`.
