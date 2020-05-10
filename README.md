
## AutoSystem
<h4>Aplicacion Sistema de Clientes</h4>
Pasos necesarios

<h5>BACKEND:</h5>

<p>
1-Descargar el repositorio

2-Asumiendo que se tenga un gestor de datos relacional, crear una base de datos con el nombre "autosystem",

 con el usuario admin_system y con contraseña.
 
3-crear archivo .env con los siguientes campos:

////DB_CONNECTION=mysql

////DB_HOST=127.0.0.1

////DB_PORT=3306

////DB_DATABASE=autosystem

////DB_USERNAME=admin_system

////DB_PASSWORD='contraseña

4-ejecutar el siguiente comando: 'php artisan migrate' para realizar la creacion de tablas en la bd.

5-ejecutar el siguiente comando: 'php artisan db:seed' para llenar la base de datos con datos de prueba.

6-ejecutar el siguiente comando: 'php artisan passport:client --personal' ingresar un nombre para el acceso al cliente ejem:'secret_personal_access'  

7-ejecutar php artisan serve, para levantar el servidor

7-Para logearse en el sistema se ha creado un usuario de prueba con las siguientes credenciales:

  -email:'cristhian@company.com' 
  
  -password: 'cristhian_admin'
  
</p>
<h5>FRONTEND:</h5>

1.ejecutar el comando npm install.

2.entrar al localhost 8000.


