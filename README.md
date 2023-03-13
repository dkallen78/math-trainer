# [Untitled Math Trainer v0.2](https://dkallen78.github.io/math-trainer/v0.2/quickMath.html)

[v0.3](https://dkallen78.github.io/math-trainer/v0.3/quickMath.html)

## Update 2023-03-12

### 22:15

The big thing I did this weekend was make a mini program to kind of check my problem functions. I've been using 
a basic version to just check that the functions were outputting the right data but I had a feeling that at least 
one of the ones I've been using was weighted to a particular answer. I'm not very good in statistics so I had 
to kind of wing it. What I do, is run the function 20 times (maybe I should do 50...) and tally how many times each answer comes up and store that percentage in an array. Then I do that 1,000 times and get an average of all of those percentages to make it "fair." Then I get fancy. I take those broad averages and make an SVG chart to visualize the data and overlay it with a green SVG line to demarcate the average. It's kind of overkill but it lets me see right away if one answer is coming up a lot more than the average. 

I'm glad I did this because one of them is throwing some answers more than others. I need to address this and 
flatten the distribution curve.

The small thing I did was add a new skill to see if my system could scale. It can!

I also addressed some design stuff and made my responsive layout a bit nicer. I'm happy with my progress. 

Next, I'm going to iron out that bump in my within() function. I'm going to try and improve my mental math skill 
tree as well but I haven't gotten any meaningful input on that. I also have an idea on how to "level lock" certain skills so they only become available when the user has advanced a certain degree. I should probably put a link to 
my mental math progression spread sheet. I'll do that lower in the readme.

[Previous updates](https://dkallen78.github.io/math-trainer/logBlog.md)

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

   * Change color palette

   * Change sound options

   * Change language

   * Import data

   * Reset progress

## Experts to Seek Out

Doug Rohrer, interleaving - drohrer@usf.edu

Zachary Hawes, spatial development

## Lines of Investigation

### [Compulsion Loops](https://dkallen78.github.io/math-trainer/research/compulsionLoops.md)

### [Behavioral Psychology](https://dkallen78.github.io/math-trainer/research/behavioralPsych.md)

### [Self-Determination Theory (SDT)](https://dkallen78.github.io/math-trainer/research/selfDeterminationTheory.md)

### [Interleaving](https://dkallen78.github.io/math-trainer/research/interleaving.md)

### Gameplay/UX

Clearly defined objectives

What is my core loop?

### [Timed versus Untimed Assessment](https://dkallen78.github.io/math-trainer/research/timedAssessment.md)

### [Effect of Math Anxiety on Performance](https://dkallen78.github.io/math-trainer/research/mathAnxiety.md)

### [How to Train Working Memory (WM)?](https://dkallen78.github.io/math-trianer/research/workingMemory.md)

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

