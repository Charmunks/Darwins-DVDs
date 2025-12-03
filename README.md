# Darwins DVDs

This project was designed to be an example of emergence, which is where a complex system is created using only a few simple rules. The rules for my project are as following:

1. the user can click on the map to place a square
2. squares move in a random direction and change directions every 5 seconds or when they hit a wall
3. if two squares or clumps run into each other, they form a larger combined clump
4. for each square in a clump, the clump gains 1.5x speed
5. if a square is within a small distance of a clump more then 3 times bigger then it, it moves in the opposite direction to avoid being absorbed
6. when a clump hits the corner of the screen, it separates into squares, each moving in different directions, starting from the center
