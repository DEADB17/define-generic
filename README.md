# define-generic
## Simple single dispatch generic functions

```javascript
var defineGeneric = require('define-generic');

defineGeneric(dispatcher:DispatcherObject, defaultMethod:Function) -> GenericFunction

genericFunction.define(method:Function, ...arguments) -> GenericFunction

genericFunction.isDefined(...arguments) -> Bool

genericFunction(...arguments) -> *
```
