# [QuickMath v0.4](https://dkallen78.github.io/math-trainer/index.html)
[QuickMath v0.4 with all strategies unlocked](https://dkallen78.github.io/math-trainer/unlocked.html)

## Purpose

Working as a substitute teacher I saw an unmet need for mental math skills. There is a lot of good work being done on number fluency which is a foundational math skill, but mental math and automaticity have received a bad name due to how tedious memorizing the multiplication tables can be. I'm trying to make a tool (not a game) for developing those skills incorporating elements of game design and based on rigorous academic research into learning and mathematics. It's not flashy by design so as to foster an appreciation of math on an intrinsic level.

## Description

QuickMath is a tool for anyone who wants to practice their mental math. The "meat" of the program is a progression of different skills and strategies designed to build from foundations to more advanced arithmetic. There is also a challenge mode where users can test their skills against arithemtic problems of increasing difficulty.

Although the UI is simple by design, users can also change the colors of the layout via different preset themes.

The layout is mobile-first because smartphones are the primary technological tool of the modern world.

## Update 2024-02-16

### 22:45

I added a challenge that only lasts 60 seconds and the user has to answer as many questions as possible as they slowly get harder. A lot of it was just copy/pasting which makes me think I need to look at how to condense some of my work. I'm not going to worry about it in the short term because it's just a distraction, but I really feel good when I can refactor stuff down to one function. 

I indulged a conceit for a week or two that I've now abandonned. It all started with condensing `document.getElementById` down to just `get`. I also shrunk my `makeElement` function to just `make` and made a lot of methods for individual elements like `make.button()` and `make.svg`, and I like all of those a lot. I got it in my head though that it should be a set of helper functions and `set` should be a part of it. Indulging myself, I made a `set.click` function that used `element.addEventListener` instead of `element.onclick` because I heard the former was "better" than the latter. That may be true but `addEventListener` does not work so well with anonymous functions or functions with parameters. So I've abandonned `set.click` and I'm back to `onclick`.

I've got a lot of other stuff to do in the upcoming week, but hopefully I can expand the division or multiplication portions of the strategies mode in some spare moments.

### To-do

* add more problem types 
  * fill out division beyond Fundamentals
  * expand on the introduction to fractions
* add more challenges
  * answer a fixed number of problems (digits?) as fast as possible (Fast 50?)
* add functions for multiplication and division to the challenges
* mode/challenge where user goes through number facts (eg, multiplication table)
* save user data between sessions
  * import/export data
  * reset data
* add multi-language support
* add more themes

### Investigate

* should fractions be its own section or built into the basic operations? Likewise, what about decimals?
* how to improve the functions in the challenges?
* what would keyboard support look like?
* what would a working memory exercise look like?
* achievements?
  * basic achievements for the challenges (3 each based on performance?) and strategies, plus secret achievements based on math trivia?
* what is the optimal order for unlocking strategies/skills?

### [Previous updates](https://github.com/dkallen78/math-trainer/blob/main/devlog/devlog-2024.md)

## Lines of Investigation

### [Intrinsic Motivation](https://dkallen78.github.io/math-trainer/blob/main/research/intrinsic-motivation.md)

### [Compulsion Loops](https://dkallen78.github.io/math-trainer/blob/main/research/compulsionLoops.md)

### [Behavioral Psychology](https://dkallen78.github.io/math-trainer/blob/main/research/behavioralPsych.md)

### [Self-Determination Theory (SDT)](https://dkallen78.github.io/math-trainer/blob/main/research/selfDeterminationTheory.md)

### Emotional Induction

### Color

I set out to make this program sparse. I had gone with the game aesthetic in the Mathemagicus game and I wanted this to be more utilitarian. But there is research that indicates that color is almost universally preferred to black and white. I still want to maintain the "clean" aesthetic of the program as it stands now, but I think it could benefit from limited color. One question is where and how to use it. Another is which colors to use. Pett & Wilson (1996, it's on JSTOR) mention that it can be used to draw attention to something, which I think would work really well in an otherwise color-sparse environment. They also mention that humans in general are really good at using colors for identifying things (like resistors). Maybe I could use color to subtly indicate which skill is being shown?

I think it's important to acknowledge that, according to [Castell et al (2018)](https://dkallen78.github.io/math-trainer/Refs/Castell-et-al-2018.pdf), there doesn't seem to be an inherent connection between a specific color and either cognitive performance or emotional state. I had pondered using a pulse of green for correct answers and a pulse of red for a wrong one, but it might be better to let the user pick their preferred color for correct input and its color complement for incorrect input.

### [Interleaving](https://dkallen78.github.io/math-trainer/blob/main/research/interleaving.md)

### Gameplay/UX

Clearly defined objectives

What is my core loop?

### [Timed versus Untimed Assessment](https://dkallen78.github.io/math-trainer/blob/main/research/timedAssessment.md)

### [Effect of Math Anxiety on Performance](https://dkallen78.github.io/math-trainer/blob/main/research/mathAnxiety.md)

### [How to Train Working Memory (WM)?](https://dkallen78.github.io/math-trianer/blob/main/research/workingMemory.md)

### Historical Research

I'm reading through some 19th century articles right now and it's striking how passionate the writers are in their advocacy for mental math. I feel like these advocates are the source for the timed multiplication table tests I had to take in the 4th grade. Although none of the authors I've read so far have called for timed testing, their means for improving mental calculation are left unsaid.

Apparently the timed tests to which I (and many others) was subjected were not a direct result of the 19th century educational fad of mental math. Many schools switched to a program of oral math. There was a backlash to this that lasted until the middle of the 20th century when there was a revival in interest. And here we are again. "Everything old is new again."

The exception is [Haskins, (1887)](https://www.jstor.org/stable/44464091) who gives examples that would be familiar to teachers today, such as counting by 2s up and down the number line.

## Experts to Seek Out

Doug Rohrer, interleaving - drohrer@usf.edu

Zachary Hawes, spatial development