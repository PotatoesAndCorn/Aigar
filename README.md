# CornAndPotatoes

Agario AI Platform

CONCEPTS
---
* Observer client: Like Google Maps: Can see whole map (all blobs)
* Player client: Testing
* Set observer client to player client to see what scaling factor for player client

INFRASTRUCTURE
---
* Game tick pushes positions to all observer clients and player clients
* WebSockets
* Observer clients can update faster than the server and perform interpolation to smooth out movements
* http://binaryjs.com/

GAME API
---
* Blob
  * Size (scalar)
  * Position (vector of units)

* Cell object isa Blob
  * Name
  * Velocity (vector of units per tick)
       
* PlayerCell object isa Cell
  * index
  * ClassMethods
    * public accel(dir, proportion) //direction (0,2PI), proportion (0,1)
    * public split(dir, mass) //direction (0,2PI), expells mass 
       
* PlayerController object
  * ownedPlayers list
  * addOnTickListener(function(tickData)) //when a game tick occurs
	 
* Virus isa Blob

* TickData  //when a game tick occurs, when your cell is eaten, or when your cell eats a blob
  * PlayerCell source
  * Blob[] locationData
  * Blob ate // if null, nothing was eaten
  * Cell eatenBy // if null, was not eaten
    
* Global object
  * Leaderboard

Game Engine  
Networking Layer (Game)  
Observer View
