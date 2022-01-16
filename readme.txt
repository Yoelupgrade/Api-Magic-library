Base de datos Magic-library

Servidor local http://localhost:5000/


En esta base datos podrás visualizar una librería de cartas Magic, con estas podrás crear tus mazos si inicias sesión, añadiendo las cartas por id.
Un usuario podrá crear un mazo, pero nunca actualizarlo a no ser que sea su poseedor
Podrás registrar usuarios, visualizarlos por id y también actualizarlos.
También se podrá actualizar los mazos de los usuarios siempre y cuando el usuario haga login y coincida su token,
el id del usuario y el id del mazo, de esta forma ese usuario podrá añadir o quitar cartas de su mazo mediante el id de cada carta.

ENDPOINT SIN AUTENTIFICACION
Para visualizar el esquema de los diferentes endpoint por id (http://"ubicación servidor"/api/documentation)
Para visualizar la libreria de cartas (http://"ubicación servidor"/api/cards)
Para visualizar la libreria de mazos (http://"ubicación servidor"/api/mallets)
Visualizar 1 carta (http://"ubicación servidor"/api/cards/"id carta")
Visualizar 1 mazo (http://"ubicación servidor"/api/mallets/"id mazo")
Para registra un usuario (http://"ubicación servidor"/api/users)
Para iniciar sesion (http://"ubicación servidor"/api/users/login) necesario email y password

ENDPOINT CON AUTENTIFICACION(token)
Para visualizar un usuario (http://"ubicación servidor"/api/users/"id usuario)
Para actualizar un usuario (http://"ubicación servidor"/api/users/"id usuario)
Para crear 1 mazo (http://"ubicación servidor"/api/mallets)
Para actualizar un mazo http://"ubicación servidor"/api/mallets/userId/"id usuario"/malletId/"id mazo"
