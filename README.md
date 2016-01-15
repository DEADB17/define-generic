# define-generic

`npm install define-generic`


## API

## define

Creates a generic function

`define(spec, methods)` → `GenericFunction`

* `spec` *Spec* Specification.
* `methods` *Any* Data structure to hold the methods.
* returns *GenericFunction*


## GenericFunction

`GenericFunction(...arguments)`

* `...arguments` *Any* Arguments to the generic function.  
  Conventionally the first parameter is an object when dispatching on type.
* returns *Any* Whatever the specific or default method returns.


## Spec

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
