# Random Creature Evolution <img src="https://media.giphy.com/media/gk98xOaJEgStxaAMZW/giphy.gif" width="65" height="65"/>

It is a software robotics engineering quarter project for the machine learning subject. It consists of a simple genetic algorithm in which randomly generated creatures evolve to become faster while moving.
![intro](https://user-images.githubusercontent.com/69701088/210674414-a32072b0-86ab-4343-b095-f151efb9c516.gif)
#### Play with the project here : https://jorgerando.github.io/Random-Creature-Evolution/

## Game Rules <img src="https://media.giphy.com/media/b7lp44pNiRqsU/giphy.gif" width="40" height="40"/>
The creatures will be formed by 3 types of pieces: solids, thrusters and unions

![MicrosoftTeams-image](https://user-images.githubusercontent.com/69701088/210605619-1e30fe45-6669-4db5-9c4c-1f0977546095.png)

Solids can be rectangles, circles, and triangles. This type of appendage does not produce force and its dimensions will be random. The thrusters rot force in a specific direction with a magnitude and frequency that will depend on their mass. Very heavy propellers will produce a lot of force but with low frequency and light propellers will produce little force but with great frequency. Finally, there are the unions that are in charge of joining appendages and can be elastic or solid.

![partes](https://user-images.githubusercontent.com/69701088/210665000-778664d2-af8b-438a-a081-0680c1e0d40b.gif)

## Random Creature Creation 

The first generation of a genetic algorithm must always be random, therefore we have designed an algorithm for the random creation of creatures.
This algorithm has 4 parts: creation of solids and propellers, selection of the individual's body, positioning of the appendages and creation of the joints.

![MicrosoftTeams-image (1)](https://user-images.githubusercontent.com/69701088/210605657-aae70b31-97a1-4f20-b171-e07c72943052.png)

Creation of solids: in this first stage, between 2 to 3 solids and propellants will be generated randomly

Selection of the Body: it will be iterated through all the solids looking for the one with the greatest area. The one with the most area will be the individual's body

  Positioning of the appendages: the body of the individual will be positioned in the center and the other appendages will be positioned around randomly avoiding collisions

Creation of the unions: all the appendages will be joined to the body with unions of dimension and random type

This gif shows some individuals generated with this algorithm

![GeneracionRnaodm](https://user-images.githubusercontent.com/69701088/210665108-399735f5-feab-40f1-b3cb-7b99e7383ce2.gif)

## Fitness 

A fundamental part of a genetic algorithm is the fitness function that tells us how fit an individual is. In this case we will let the individuals of a generation move freely around the world for 20 seconds and those who go further will be the fittest and will have the most probability of reproducing and passing on their genes.

![MicrosoftTeams-image (2)](https://user-images.githubusercontent.com/69701088/210605813-f3604d81-4cf4-4fb3-9a41-984d4232b5bf.png)

## Repduction 

In order to generate a new generation from the previous ones, we have created a reproduction algorithm for n individuals. This algorithm consists of 3 steps: merge bodies, merge appendages and merge joins.

![imagen4](https://user-images.githubusercontent.com/69701088/210605185-e27ca853-ac0a-4f93-8772-0c4dccfd2d2a.png)

Mixture of bodies: if the bodies of the parents are of different types, a random one is selected; Otherwise, the average of the bodies of the parents is made.

Merge appendages: it is iterated through all the appendages of the parents in hourly order, if the appendages are different, a random one is chosen, if they are the same, the average is done.

Merge joins : try to join as parent appendage if not possible search for a new coherent join point

This gif shows some examples of reproduction
 
![repo](https://user-images.githubusercontent.com/69701088/210668287-bef3a5cc-498b-4670-a1f0-5c68c65b9d0d.gif)

## Mutation

So that the generations do not stagnate in a genetic algorithm, there must be a probability that when reproducing a mutation is produced. In this case, the mutation will occur with a 5% probability and will consist of adding an extra random appendage or removing an existing one.

![MicrosoftTeams-image (5)](https://user-images.githubusercontent.com/69701088/210605701-bfb5d44f-b1d3-4aa6-ac42-d29bfa4c14b7.png)

## Results

As can be seen in the gif, as the generations pass, individuals are able to move faster and faster (the gif is in fast motion).

![fin2](https://user-images.githubusercontent.com/69701088/210675131-d3ad2e1a-c302-4ec5-b373-526704e7f124.gif)

#### Initial Generations (normal speed) 
![inicial](https://user-images.githubusercontent.com/69701088/210676080-34cc067f-f3b0-4d88-9a69-a577fe92907f.gif)
#### End Generations (normal speed)
![finales](https://user-images.githubusercontent.com/69701088/210676555-c168698e-2495-4043-9648-f8e55e21bce8.gif)

## References :

Evolution : https://en.wikipedia.org/wiki/Natural_selection

Nature of code Book : https://natureofcode.com/book/chapter-9-the-evolution-of-code

Genetic Algorims : https://en.wikipedia.org/wiki/Genetic_algorithm 

matterJs : https://brm.io/matter-js/

## Autors
Jorge Rando Hernández 〽️ @jorgerando

Javi  〽️ @ javi-dbgr
