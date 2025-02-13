# 2025

## February

### Update 2025-02-06

#### 22:00

I've done a bunch of relatively small changes today. 

* When a new strategy was unlocked in the past, its button would pulse between black and white. The problem with that was that I wanted to show which button had been pressed which I thought would look best as a transition from white to black. The problem with that was it would be too visually different from the newly unlocked button, so I changed that one to a shake but giving it some rotation on a small animation loop.
* I did some layout and display changes to other parts of the mental math strategies so that the program displays which operation you've chosen when you're looking at the strategy groups.
* I updated the repeatedAddition() function in the problems-multiplication.js file to be more versatile. Before it would only display one range of problems/answers but now it can be customized. It can also display a wider variety of problem/answer formats.
* I changed the logic in doMathStrategy() in math-strategies.js so that once a skill has been "mastered," you can practice it on a sort of endless mode where you won't be kicked after demonstrating proficiency. This makes testing much easier in the fully unlocked mode.
* I did a minor change of the addition progression.
* While diversifying the output of the broken10s() function, I made a new text-formatting function that will give a subtle shake to the selected number. Previously I used the stroke() function in utilities-problems.js, but now I have a shake() function.

I'm pondering a few things at the moment. I currently have my strategies broken up by +, -, *, and /, but I think I need to make a separate category for fractions. I'm also reevaluating how I'm going to do the initial stages of division. I've done some clever tricks with SVGs previously, but I'm not sure if they're in the right place. 

Tomorrow I anticipate more small changes.

### Update 2025-02-07

#### 22:30

Basically the same as yesterday, just a little bit less. I didn't do too many visual changes but I tweaked a few of the problem functions to meet my new standards. 

I need to retool the Challenges section because I don't like it, but I can't tear it down until I have an idea of something that I want to replace it with. 