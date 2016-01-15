# define-generic

`npm install define-generic`


## Generic function dispatched by tag

```js
var define = require('define-generic/tagged');

var ob1 = { '@type': 'type-1' };
var ob2 = { '@type': 'type-2' };

var methods = {
    'type-1': function (obj) { return 'Type 1 object'; },
    'type-2': function (obj) { return 'Type 2 object'; }
};

var generic = define('@type', methods);

generic(ob1); // → 'Type 1 object'
generic(ob2); // → 'Type 2 object'
```


## Generic function dispatched by constructor

```js
var define = require('define-generic/constructor');

function MyObject() {}

var table = [
    [ Boolean, () => 'Boolean' ],
    [ Function, () => 'Function' ],
    [ Number, () => 'Number' ],
    [ Object, () => 'Object' ],
    [ String, () => 'String' ],
    [ MyObject, () => 'MyObject' ]
];

var generic = define(table);

generic(true); // → 'Boolean'
generic(function () {}); // → 'Function'
generic(17); // → 'Number'
generic(NaN); // → 'Number'
generic({}); // → 'Object'
generic('Hello'); // → 'String'
generic(new MyObject()); // → 'MyObject'
```


## Define your own

```js
var define = require('define-generic');
var methods = { /* definitions */ };
var spec = { getMethod: function (methods, args) { /* select method from args */ } };
var genericFn = define(spec, methods);
genericFn(/*arguments*/);
```

See the implementations of [tagged.js](tagged.js) and
[constructor.js](constructor.js) as examples.


### API

#### define

Creates a generic function

`define(spec, methods)` → `GenericFunction`

* `spec` *Spec* Specification.
* `methods` *Any* Data structure to hold the methods.
* returns *GenericFunction*


#### GenericFunction

`GenericFunction(...arguments)` → `Any`

* `...arguments` *Any* Arguments to the generic function.  
  Conventionally the first parameter is an object when dispatching on type.
* returns *Any* Whatever the specific or default method returns.


#### Spec

Object containing the specification that defines how the generic function
operates.  
It consists of one mandatory function and two optinal ones:

* `spec.getMethod(methods, args)` → `Function` *Function* Mandatory.  
  Function to select a specific method from the set of methods based on the
  arguments.
  * `methods` *Any* Data structure to hold the methods.
  * `args` *Array* The arguments passed to the genericfunction.
  * returns *Function* The method to pass to `spec.applyMethod`.
* `spec.applyMethod(method, args)` → `Any` *Function* Optional.  
  Function that applies arbitrary arguments to a method.
  * `method` *Function* Method to use.
  * `args` *Array* The Arguments array to apply to the method.
  * returns *Any* Whatever the specific or default method returns.
* `spec.defaultMethod(args)` → `Any` *Function* Optional.  
  Function to use when no method is found. Defaults to throwing a `ReferenceError`.
  * `args` *Array* The arguments passed to the genericfunction.
  * returns *Any* Whatever the specific or default method returns.
