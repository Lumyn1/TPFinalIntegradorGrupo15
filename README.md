# TP FINAL INTEGRADOR GRUPO 15 

## INTEGRANTES 

.Riveros Luciano Martín - id de GitHub: Lumyn1

.Torres Nahuel Tobias - id de GitHub: Torres Nahuel Tobias

.Cancino Arturo Luis Eduardo - id de GitHub: EducanXD

.Antenor Maximiliano Leandro Cayeteno -id de GitHub mk07088

.Sanchez Esteban Jesus - id de GitHub: Esteban3748

Este proyecto consiste en el desarrollo de un Panel de Control de Clientes construido como aplicación web mediante React y Vite, en el marco del Trabajo Práctico Integrador de la materia Programación Visual.
La aplicación permite a un administrador autenticado gestionar la información de clientes en tiempo real, consumiendo de forma asincrónica los datos de la API pública FakeStoreAPI. Entre sus funcionalidades principales se incluyen:

_Autenticación y control de acceso, mediante Context API combinado con persistencia en localStorage, diferenciando administradores del sector Soporte y del sector Gerencia.
_Listado de clientes con búsqueda dinámica por apellido o ciudad, y manejo de estados de carga, éxito y error.
_Alta de nuevos clientes mediante peticiones HTTP de tipo POST, con feedback visual inmediato.
_Ficha detallada por cliente, accesible mediante rutas dinámicas, con visualización de su dirección y credenciales, y permisos diferenciados según el rol del administrador (los usuarios de Gerencia pueden eliminar clientes).