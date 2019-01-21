# Memory Game

This game was created as second assignment in the Front End Developer Nanodegree of Udacity. 

### How the Game Works
The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

Each turn:

- The player flips one card over to reveal its underlying symbol.
- The player then turns over a second card, trying to find the corresponding card with the same symbol.
- If the cards match, both cards stay flipped over.
- If the cards do not match, both cards are flipped face down.

The game ends once all cards have been correctly matched.

### Game Functionality
The functionality includes: 

- Flipping over of the cards
- When two cards are flipped, check if they match.
  If they match: great! They will remain open and green + store in an array of matched cards.
  If they don't match: flip back.
- The timer will start when the first move was made.  
- When you made 20 moves, one star will disappear.
- When you made 40 moves, the second star will disappear. 
- One star will always remain.
- When all pairs are found, a modal pops up with the amount of moves, time played and stars left. 

In the modal there's a CTA to play again which will restart the game.
