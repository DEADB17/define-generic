# define-generic
## Simple single dispatch generic functions

```
var defineGeneric = require('define-generic');

defineGeneric(methodId:String, [defaultFun:Function]) -> instance

instance.addMethod = function (class:Object, Function) -> instance

instance.isImplemented = function (Object) -> Bool

instance.defineGeneric = defineGeneric

instance(Object, ...parameters) -> Any
```
