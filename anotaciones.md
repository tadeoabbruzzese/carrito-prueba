## Arrancar un proyecto con VITE y YARN

```sh
yarn create vite . # Punto ( . ) creo en el directorio actual las carpetas del proyecto
```

## Instalo las dependencias

```
yarn
```

## Levanto el servidor de desarrollo

```sh
yarn dev
```

## Hacer el build

```sh
yarn build
```

## Previsualizar el build (carpeta dist)

```sh
yarn preview
```

## Detener servidor de desarrollo

Ctrl + C

## Bootstrap y SASS

### Dependencia de proyecto

```sh
yarn add bootstrap @popperjs/core
```
> Configurando Bootstrap

```main.js
import * as bootstrap from 'bootstrap'
```

```style.scss
@import 'bootstrap';
```

### Dependencia desarrollo

```sh
yarn add sass -D
```



