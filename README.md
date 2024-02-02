# [Untitled Math Trainer v0.3](https://dkallen78.github.io/math-trainer/v0.3/quick-math.html)

## Update 2024-02-01

### 23:15

I have the survial challenge put together how I want it and that makes me really happy just because of how it all came together close to how I envisioned it. I did ask my wife to play with it on her phone and she didn't know what to do intuitively. She said she didn't understand how to confirm her answer input, so I think I need to put some kind of affordance into my number pad to make it clear that the `Submit` button is important.

One issue I do see with the Survival Challenge is I'll often get addition by low numbers or even 0. That's just based on the way the problem-generating function is set up to produce a uniform distribution of answers, but I wonder if it might be better to abandon that principle in the pursuit of better difficulty scaling. I'll just have to try it and see how I like it I guess. 

Tomorrow I should continue putting in more subtraction problems and maybe even start on multiplication. 

The more I build this out, the more my past choices frustrate me and the more I want to build it more organized. I don't think it's time to do another rewrite/v0.4 but I do want to start thinking about how I can make everything easier to navigate within the IDE. It doesn't help that I've been building this over the past year off and on I guess.

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

