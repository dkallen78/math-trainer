# [Untitled Math Trainer v0.2](https://dkallen78.github.io/math-trainer/v0.2/quickMath.html)

[v0.3](https://dkallen78.github.io/math-trainer/v0.3/quickMath.html)

## Update 2023-03-09

### 22:00

Things are moving slowly but steadily. I addressed all the obvious bugs I had yesterday and even through some comments in. Now that answering questions and progressing through 
the different parts of the application are coming together, I'm working on the actual act of progressing. One oversight I had from v0.2 is how I tallied the averages. In v0.3 I'm 
still keeping track of the total average per skill over all, I'm now specifically keeping track of the average of the last 20 questions to determine progression so that each play 
through will require 60 questions and I'm thinking of capping it at 100 questions per session. Maybe that's too much, I'll have to dig through Google Scholar some more I suppose.

[Previous updates](https://dkallen78.github.io/math-trainer/logBlog.md)

## Purpose

Working as a substitute teacher I saw an unmet need for mental math skills. There is a lot of good work being done on number fluency which is a foundational math skill, but mental 
math and automaticity have received a bad name due to how tedious memorizing the multiplication tables can be. I'm trying to make a tool (not a game) for developing those skills 
incorporating elements of game design and based on rigorous academic research into learning and mathematics. It's not flashy by design so as to foster an appreciation of math on an 
intrinsic level.

## Current State of the Program

At the moment it has a rough functionality. There is a title screen (super important =P),
a level select menu, and the ability to practice five levels of mental math skills (it's currently hard-coded to level 0).

The current intent is for the user to start at level 0 and unlock all 6 levels. To unlock a level, the user must pass an assessment. Performance in the level will eventually unlock 
another "test" which will unlock a level. The problems range from simple (max sum of 10) to difficult (doubling decimal numbers and finding the next multiple). Target users are 
anywhere between first and eigth grade depending on ability.

Assessments and levels are made up of a set number of problem types that are randomly chosen and randomly created. 

## Things to Add

- [ ] Weight the randomized problem selector so that mastered problem types are chosen less often, especially during unlock levels

- [x] Button feedback

- [x] Keyboard interface

- [x] Desktop layout (tentative)

- [x] Determine best method of assessment

   * I've settled on using a combination of time and accuracy to determine when to progress the user 
   to the next level. I still need to do more work to determine what that will look like, most likely 
   the user will have to maintain an average time per question over a minimum number of questions. One 
   metric I've read said that 80 correct digits over two minutes is a reliable measure of fluency/mastery. 
   That comes out to 1 digit correct ever 1.5 seconds

- [ ] Keep track of user data

- [ ] Different modes

   * Speed mode (automaticity trainer)

   * Rename number (eg, 5 = 2 + 3 = 1 + 1 + 3 = ... [number sense])

   * Sequences (count bys)

   * Mental strategy practice

- [ ] Setup menu

   * Change color palette

   * Change sound options

   * Change language

   * Import data

   * Reset progress

## Experts to Seek Out

Doug Rohrer, interleaving - drohrer@usf.edu

Zachary Hawes, spatial development

## Lines of Investigation

### [Compulsion Loops](https://dkallen78.github.io/math-trainer/compulsionLoops.md)

### [Behavioral Psychology](https://dkallen78.github.io/math-trainer/behavioralPsych.md)

### [Self-Determination Theory (SDT)](https://dkallen78.github.io/math-trainer/selfDeterminationTheory.md)

### [Interleaving](https://dkallen78.github.io/math-trainer/interleaving.md)

### Gameplay/UX

Clearly defined objectives

What is my core loop?

### [Timed versus Untimed Assessment](https://dkallen78.github.io/math-trainer/timedAssessment.md)

### [Effect of Math Anxiety on Performance](https://dkallen78.github.io/math-trainer/mathAnxiety.md)

### [How to Train Working Memory (WM)?](https://dkallen78.github.io/math-trianer/workingMemory.md)

### Historical Research

I'm reading through some 19th century articles right now and it's striking how passionate
the writers are in their advocacy for mental math. I feel like these advocates are
the source for the timed multiplication table tests I had to take in the 4th grade.
Although none of the authors I've read so far have called for timed testing, their
means for improving mental calculation are left unsaid.

> Apparently the timed tests to which I (and many others) was subjected were not a
direct result of the 19th century educational fad of mental math. Many schools switched
to a program of oral math. There was a backlash to this that lasted until the middle
of the 20th century when there was a revival in interest. And here we are again.
"Everything old is new again."

The exception is [Haskins, (1887)](https://www.jstor.org/stable/44464091) who gives
examples that would be familiar to teachers today, such as counting by 2s up and down
the number line.

