# My notes (Salimou FOFANA)

## What i understand

- Build a web app with which we can create/manage multiple lifts
- `a lift responds to calls containing a source floor and direction` :\
  for each calls we need to define a source floor and a target floor
- `a lift delivers passengers to requested floors` :\
  i dont know if it is needed to manage the number of people in the lift and as the lift move instantaneously i dont think it is needed
- `We do not expect a full lift scheduling algorithm to be implemented`:\
  Manage each requests in a sequential way (FIFO)
- I will not use socket to update the lift location in frontend (just a get request when the page is renderered)

## Environnement

- WebApp in ReactJS (TypeScript)
- API in NodeJS (TypeScript)
