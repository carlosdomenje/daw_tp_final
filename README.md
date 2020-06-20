Autor: Domenje Carlos R. - 2020

# Smart Home

Proyecto Final Diseño Aplicaciones Web

## Introduccion 🚀

Este proyecto tiene como finalidad la evaluacion de lo aprendido en la catedra diseño de aplicaciones web correspondiente a la especializacion en internet de las cosas de la FIUBA. 

Se realizo una aplicacion web donde se muestran diferentes dispositivos del iot (lamparas, persianas, veladores), los cuales tienen asociados un switch para controlar su encendido / apagado. 

Contiene 4 botones de filtro de informacion. Ellos son:

 - TODOS: Se muestran todos los dispositivos asociados.
 - LAMPARAS: Se muestran solo las lamparas.
 - PERSIANAS: Se muestran solo las persianas.
 - VELADORES: Se muestran solo los veladores.

A traves de una base de datos sql se mantiene su estado actualizado. 

Con nodejs y el paquete de express, se realizo todo el backend de la aplicacion. 

El frontend, se realizo con lenguaje HTML.

Por ultimo, el conjunto de paquetes utilizados pertenecen a contenedores de Docker, los cuales a traves de docker compose se complementan para su ejecucion. 

Mira **Despliegue** para conocer como desplegar el proyecto.


### Pre-requisitos 📋

[Docker](https://docs.docker.com/get-docker/)  y [Docker Compose](https://docs.docker.com/compose/install/) son necesarios para la ejecucion del proyecto.

Guia de instalacion en Ubuntu 18,17,16 y 14
[Docker install - Ubuntu](https://iot-es.herokuapp.com/post/details/2) 

Opcional: 
[Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) es necesario si quiere realizar por linea de comandos el clone del repositorio.

Descargar o clonar el repositorio del proyecto.
```
git clone https://github.com/carlosdomenje/daw_tp_final.git

```

## Despliegue 📦

Para realizar el despliegue de la aplicacion primero debera ingresar a la carpeta del proyecto:

```
cd daw_tp_final
```
Abrir una terminal y ejecutar:

```
docker-compose up
```

Para finalizar la aplicacion:

```
docker-compose down

```


## Herramientas utilizadas 🛠️

* [Docker](https://docs.docker.com/)
* [NodeJS](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/) 
* [phpMyAdmin](https://www.phpmyadmin.net/)

## Contribuir 🖇️

Puede contribuir realizando un pull request con las sugerencias al proyecto.

## Wiki 📖

Puedes encontrar mucho más de cómo utilizar y crear estos proyectos en la [Wiki](http://www.iot-es.com/) de la catedra

## Versionado 📌

Se utiliza [Git](https://git-scm.com/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/carlosdomenje/daw_tp_final.git).


## Licencia 📄

Este proyecto está bajo la Licencia GPL.

## Gratitud 🎁

* Con este proyecto pude comprender la utilizacion de docker y ademas los criterios de consultas a base de datos y utilizacion de expressJS ademas de implementar todo lo visto a traves de las clases.📢
* Agradezco a todos los profesores de la catedra Diseño de Aplicaciones Web de FIUBA🤓.


---

