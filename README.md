# [Untitled Math Trainer v0.3](https://dkallen78.github.io/math-trainer/v0.3/quick-math.html)

## Update 2024-02-06

### 23:00

I've made some decent progress on multiplication problems and made a new function for helping to illustrate the Distributive Property of Multiplication. I also made a helper function to help generate products. With addition and subtraction problems I can generally use a random number generator to create a random answer, but that doesn't work with multiplication because I could randomly generate a prime number. So what I do instead is use nested `for` loops to create a list of possible products as well as the factors used to produce them. This is relatively slow compared to some of my other algorithms but its lack of speed is only an issue when I'm running it thousands of times. So, when I need a random product, I plug in the ranges of my two factors, create a list, and randomly pick a product from the list. It's not stupid if it works. 

I want to do something with sequences next but I'm not sure how to fit it in. I should probably read up on how to use them and how best to apply them. Oh well. Issues for tomorrow =P

### Issues

* Find a good threshold to unlock multiplication and division

* Look into better ways to structure things

[Previous updates](https://github.com/dkallen78/math-trainer/blob/main/logBlog.md)

## Purpose

Working as a substitute teacher I saw an unmet need for mental math skills. There is a lot of good work being done on number fluency which is a foundational math skill, but mental 
math and automaticity have received a bad name due to how tedious memorizing the multiplication tables can be. I'm trying to make a tool (not a game) for developing those skills 
incorporating elements of game design and based on rigorous academic research into learning and mathematics. It's not flashy by design so as to foster an appreciation of math on an 
intrinsic level.

## Mental Math progressions spread sheet (please contribute!)

https://docs.google.com/spreadsheets/d/17vwSJWGRL2A5TwsRnspX6qdaLeBSmVft7JT1ZNvBSrs/edit?usp=sharing

## Things to Add

- [ ] Keep track of user data

- [ ] Different modes

   * Speed mode (automaticity trainer)

   * Rename number (eg, 5 = 2 + 3 = 1 + 1 + 3 = ... [number sense])

   * Sequences (count bys)

   * Mental strategy practice

- [ ] Setup menu

   * ~~Change color palette~~

   * ~~Change sound options~~

   * Change language

   * Import data

   * Reset progress

## Experts to Seek Out

Doug Rohrer, interleaving - drohrer@usf.edu

Zachary Hawes, spatial development

## Lines of Investigation

### [Compulsion Loops](https://dkallen78.github.io/math-trainer/blob/main/research/compulsionLoops.md)

### [Behavioral Psychology](https://dkallen78.github.io/math-trainer/blob/main/research/behavioralPsych.md)

### [Self-Determination Theory (SDT)](https://dkallen78.github.io/math-trainer/blob/main/research/selfDeterminationTheory.md)

### Emotional Induction

### Color

I set out to make this program sparse. I had gone with the game aesthetic in the Mathemagicus game and I wanted this to be more utilitarian. But there is research that indicates that color is almost universally preferred to black and white. I still want to maintain the "clean" aesthetic of the program as it stands now, but I think it could benefit from limited color. One question is where and how to use it. Another is which colors to use. Pett & Wilson (1996, it's on JSTOR) mention that it can be used to draw attention to something, which I think would work really well in an otherwise color-sparse environment. They also mention that humans in general are really good at using colors for identifying things (like resistors). Maybe I could use color to subtly indicate which skill is being shown?

I think it's important to acknowledge that, according to [Castell et al (2018)](https://dkallen78.github.io/math-trainer/Refs/Castell-et-al-2018.pdf) there doesn't seem to be an inherent connection between a specific color and either cognitive performance or emotional state. I had pondered using a pulse of green for correct answers and a pulse of red for a wrong one, but it might be better to let the user pick their preferred color for correct input and its color complement for incorrect input.

### [Interleaving](https://dkallen78.github.io/math-trainer/blob/main/research/interleaving.md)

### Gameplay/UX

Clearly defined objectives

What is my core loop?

### [Timed versus Untimed Assessment](https://dkallen78.github.io/math-trainer/blob/main/research/timedAssessment.md)

### [Effect of Math Anxiety on Performance](https://dkallen78.github.io/math-trainer/blob/main/research/mathAnxiety.md)

### [How to Train Working Memory (WM)?](https://dkallen78.github.io/math-trianer/blob/main/research/workingMemory.md)

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

