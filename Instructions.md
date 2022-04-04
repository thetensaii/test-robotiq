# Simple Lift

Create the API and the frontend which implement the behavior of a lift.

Behavior of a lift:

- a lift responds to calls containing a source floor and direction
- a lift has an attribute floor, which describes it’s current location
- a lift delivers passengers to requested floors

## API

- api may manage more than one lift
- api contains an endpoint to get a lift state
- api contains an endpoint to which set a lift
- Lifts state can be in-memory for the sake of the exercice
- Use the mainstream language you are the most used to. It’s easier for review is you use one of those: NodeJs, Golang, Java, C#
- We do not expect a full lift scheduling algorithm to be implemented. Lifts move instantaneously

## Webapp

- webapp display the state of a lift
- webapp can change the state of a lift
- webapp must be themed with white and robotiq blue `#00acff`
- React framework must be used
- Frontend must be started with an `npm/yarn start` command

Show us your best skills!!
TDD and implementation of SOLID principles are encouraged.
If you are more of a frontend developer, demonstrate your best frontend skills.
