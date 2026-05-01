# Domain Driven Design

## Stores

We use these to delegate the API information received to the presentation layer.


## Domain Model
Here is where we put the entities that correspond to a specific bounded context


## Assemblers and APIs

The APIs retrieve the information from the backend created.

Later, the assemblers retrieve each resource, convert it to an entity, and then using that conversion they convert the response to an
entity. Finally, this function is used in the load() function of the Store.