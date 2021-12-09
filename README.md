
# Essential design patterns with Typescript

## Creational Patterns

### 🐧 Singleton Pattern
El patrón Singleton limita el número de instancias de un objeto en particular a **solo una**. Un ejemplo es un grupo de conexiones de base de datos. El grupo gestiona la creación, destrucción y vida útil de todas las conexiones de la base de datos para toda la aplicación, lo que garantiza que no se "pierdan" conexiones.
```
npm run exec:singleton
```
### 🏭 Factory Method Pattern
Crea nuevos objetos según las instrucciones del cliente. Una forma de crear objetos en JavaScript es invocando una función constructora con el operador new. Sin embargo, existen situaciones en las que el cliente no sabe, o no debería, saber cuál de varios objetos candidatos instanciar. El método de fábrica permite al cliente delegar la **creación de objetos sin dejar de mantener el control sobre qué tipo instanciar**.

El objetivo clave de Factory Method es la extensibilidad. Los métodos de fábrica se utilizan con frecuencia en aplicaciones que administran, mantienen o manipulan colecciones de objetos que son diferentes pero que al mismo tiempo tienen muchas características (es decir, métodos y propiedades) **en común**. Un ejemplo sería una colección de documentos con una combinación de documentos Xml, documentos Pdf y documentos Rtf.
```
npm run exec:factory
```

## Behavioral Patterns

### 👀 Observer Pattern
Ofrece un modelo de **suscripción** en el que los objetos se suscriben a un evento y reciben una **notificación** cuando ocurre el evento. Este patrón es la piedra angular de la programación impulsada por eventos, incluido JavaScript. El patrón Observer facilita un buen diseño orientado a objetos y promueve un acoplamiento flexible.
```
npm run exec:observer
```
### 🤔 Strategy Pattern
Encapsula algoritmos (o estrategias) alternativos para una **tarea en particular**. Permite cambiar un método en tiempo de ejecución por cualquier otro método (estrategia) sin que el cliente se dé cuenta.

En JavaScript, el patrón de estrategia se usa ampliamente como un mecanismo de complemento al crear frameworks extensibles.
```
npm run exec:strategy
```
### 👻 Visitor Pattern
Define una nueva operación para una colección de objetos sin cambiar los objetos en sí. La nueva lógica reside en un objeto separado llamado **visitante**.

Los visitantes son útiles al crear extensibilidad en una biblioteca o framework.
```
npm run exec:visitor
```