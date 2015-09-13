# define-generic
## Simple single dispatch generic functions

```javascript
var defineGeneric = require('define-generic');

defineGeneric(methods/*Object*/, selector/*Function*/) -> genericFunction

genericFunction.for(key/*String*/, method/*Function*/) -> genericFunction

genericFunction.implements(...parameters) -> Bool

genericFunction(...parameters) -> Any
```
