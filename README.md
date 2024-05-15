# CashFlying

## Descripción

Aplicación diseñada para el control de gastos mensuales de un usuario, donde puede añadir gastos, ver los detalles, categorizarlos, filtrarlos, editarlos y borrarlos.

En la que el usuario se puede registrar y loguear además de adminsitrar su perfil, añadiendo sus datos, editando su perfil o borrando el perfil si así lo desea.

## Setup

Instalar dependencias:

# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install

## Flujo de Navegación
* Home: Página de inicio de la aplicación, la cual puedes ver estando logueado o sin loguear, se visualizan la portada de la aplicación.
* Agregar-gastos: Formulario en el que el usuario puede agregar los gastos por nombre, cantidad(€), categoria(casa,ocio,gastos varios,salud,comida,suscripciones), fecha en la que realizó el gasto y una descripción por si quiere detallar el origen del gasto.
* Listado-gastos: En esta vista se verá un espacio donde el usuario puede añadir el presupuesto del que dispone mensualmente, si así lo desea, al añadir el saldo también se verá el saldo disponible(resta de saldo menos gastos), el saldo gastado(total gastos añadidos), a su vez si el disponible llega al total del presupuesto el usuario verá una alerta para informar que su presupuesto se ha agotado, pero podrá seguir añadiendo gastos, ya que la aplicación consiste en saber lo que gastas.
Se verán tambien los gasto listados añadidos previamente desde el formulario, en ellos se verá la categoría, el nombre, la fecha y la cantidad, para ver más detalles puede dar al boton ver, que le redirigirá a la página de detalles desde la cual puede hacer actualizaciones o borrar el gasto.
Finalmente podrá filtrar los gastos por categoría.
* Perfil Usuario: Aquí podrá añadir sus datos personales.
* Ver Perfil: En esta vista se verán los datos añadidos por el usuario, desde ella podrá editar perfil o eliminarlo.

## Recursos Utilizados

* Nuxt 3
* Pinia
* Element plus
* Sass
* Google-fonts
* Nuxt-icon

## Proyecto

* Cliente: https://github.com/Cris15118/CashFlyingClient

* Servidor: https://github.com/Cris15118/CashFlyingServer
