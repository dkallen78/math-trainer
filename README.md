# [QuickMath v0.4](https://dkallen78.github.io/math-trainer/index.html)
### [All strategies unlocked: ](https://dkallen78.github.io/math-trainer/unlocked.html)

## Purpose

Working as a substitute teacher I saw an unmet need for mental math skills. There is a lot of good work being done on number fluency which is a foundational math skill, but mental math and automaticity have received a bad name due to how tedious memorizing the multiplication tables can be. I'm trying to make a tool (not a game) for developing those skills incorporating elements of game design and based on rigorous academic research into learning and mathematics. It's not flashy by design so as to foster an appreciation of math on an intrinsic level.

## Description

QuickMath is a tool for anyone who wants to practice their mental math. The "meat" of the program is a progression of different skills and strategies designed to build from foundations to more advanced arithmetic. 

The layout is mobile-first because smartphones are the primary technological tool of the modern world.

## Update 2024-02-15

### 22:30

I've finished the "big update." Except for the notifications at least. I'm thinking of having an intermediate page between when a user completes a strategy and when they are booted back to the Strategy Details screen, similar to how the Survival Challenge works. That would give me more space to work with and let the user dismiss it at their leisure instead of having it pop up and disappear after a bit. 

I've also drastically updated my file structure and file-naming conventions. I have more files now, but they are easier to navigate and it's clearer what they do. Hopefully that means I can be more productive =P 

### To-do

* incorporate notifications
* add more problem types 
* add more challenges
* save user data between sessions
  * import/export data
  * reset data
* add multi-language support

### Investigate

* what would keyboard support look like

[Previous updates](https://github.com/dkallen78/math-trainer/blob/main/logBlog.md)



## Mental Math progressions spread sheet (please contribute!)

https://docs.google.com/spreadsheets/d/17vwSJWGRL2A5TwsRnspX6qdaLeBSmVft7JT1ZNvBSrs/edit?usp=sharing


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

