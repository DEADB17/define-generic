# define-generic

## create(methods, getMethod, setMethod, applyMethod, defaultMethod)

Creates a generic function

### Params:

* **Object** *methods* Record to hold the methods.
* **function(methods, arguments[])** *getMethod* Getter that maps arbitrary arguments to a method in the methods record.
* **function(methods, arguments[])** *setMethod* Setter that maps arbitrary arguments to a method in the methods record.
* **function(method, arguments[])** *applyMethod* Function that maps arbitrary arguments to a method.
* **function** *defaultMethod* Function to use when no method is found.

### Return:

* **GenericFunction** 


## GenericFunction([arguments])

### Params:

* **Any** *[arguments]* Arguments to the generic function. Conventionally the first parameter is an object when dispatching on type.

### Return:

* **Any** Whatever the specific or default method returns.


## GenericFunction.put(fn, [arguments])

### Params:

* **function** *fn* The function to use as method.
* **Any** *[arguments]* The parameters to apply to the method.

### Return:

* **GenericFunction** An instance for chaining calls.

