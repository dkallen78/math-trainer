# [Untitled Math Trainer](https://dkallen78.github.io/math-trainer/quickMath.html)

## Update 2023-02-19

### 16:00

I've changed the level paradigm. Previously I had regular levels and "test" levels that would unlock the regular level. That's too complicated. It can work, but there's 
no reason to force it to work. Instead I'm just going to have 12 levels (for now) and when you achieve a certain degree of mastery, the next level will be made available. 

Having said that, I've just updated the interface for now and I'll be uploading the internal functionality later tonight I hope.

## Purpose

To create a free platform for practicing and developing arithmetical skills.

## Current State of the Program

At the moment it has a rough functionality. There is a title screen (super important =P),
a level select menu, and the ability to practice five levels of mental math skills (it's currently hard-coded to level 0).

The current intent is for the user to start at level 0 and unlock all 6 levels. To unlock a level, the user must pass an assessment. Performance in the level will eventually unlock another "test" which will unlock a level. The problems range from simple (max sum of 10) to difficult (doubling decimal numbers and finding the next multiple). Target users are anywhere between first and eigth grade depending on ability.

Assessments and levels are made up of a set number of problem types that are randomly chosen and randomly created. 

## Things to Add

- [ ] Weight the randomized problem selector so that mastered problem types are chosen less often, especially during unlock levels

- [x] Button feedback

- [ ] Keyboard interface (in progress)

- [x] Desktop layout (tentative)

- [ ] Determine best method of assessment

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

## Lines of Investigation

### Compulsion Loops

According to [Wikipedia](https://en.wikipedia.org/wiki/Compulsion_loop), compulsion
loops consist of three parts:

1. Anticipation

2. Challenge

3. Reward

They work in a cycle to incentivize users to continue completing a task. Anticipation
is first because

---

Blogger and game developer [Sebastien Samson (2017)](https://www.gamedeveloper.com/design/compulsion-loops-dopamine-in-games-and-gamification) says that it's vital to establish
extrinsic and intrinsic rewards for users but cautions that a designer shouldn't
give extrinsic rewards for tasks that users would do for their intrinsic value, because
it's nearly impossible to replace an extrinsic reward for an intrinsic one and keep
the user motivated. This is related to the [overjustification effect](https://en.wikipedia.org/wiki/Overjustification_effect).

intrinsic vs extrinsic motivation

### Behavioral Psychology

From [John Hopson (2001)](https://www.gamedeveloper.com/design/behavioral-game-design),
in Gamasutra:

* Reinforcer: a reward to be given

* Contingency: the conditions for receiving the reward

* Response: what the user/subject does to achieve the contingency

The response I want is for my users to continue practicing math. The only rewards
I have to offer are either achievements or intrinsic rewards. My contingencies are
many. I want to reward every correct answer. I want to reward achievement of mastery
of a skill. I want to reward near answers in some cases.

The other piece of behavioral psychology that Hopson talks about is intervals and
ratios. These are the spaces between the rewards, the contingencies. Intervals are
gaps of time between rewards and ratios are number of tasks between rewards.

Intervals work at motivating behavior but not consistent behavior. Users wait until
the reward is imminent to engage with the desired behavior and find something else
to do until then.

A fixed ratio system can work but there can be task avoidance to start the process
to achieve the fixed number of tasks. The most consistent in producing the desired
behavior is a variable ratio system where the user doesn't know precisely when they
will be rewarded.

### Self-Determination Theory (SDT)

From the [Wikipedia page](https://en.wikipedia.org/wiki/Self-determination_theory):

SDT is a theory of motivation that grew out of studies studying extrinsic and intrinsic
motivations. SDT posits that intrinsic motives are the primary psychological motivations
in all individuals.

* Intrinsic motives are internal rewards; things that are done for the pleasure of
doing them.

* Extrinsic motives are outside rewards that motivate our behavior.

SDT says that there are three basic psychological needs that inform our intrinsic
motivation:

1. **Autonomy.** Self determination. Agency. To be in control of one's own life.
Psychological liberty. Freedom of internal will. Deadlines are a restriction of autonomy
because they remove control from the individual, reducing their intrinsic motivation.
Choice (and the illusion of it?) increases one's sense of autonomy.

2. **Competence.** A *feeling* of mastery. This is where positive feedback comes into
play. Praising someone for accomplishing a task increases their feelings of competence
which feeds their intrinsic motivation.

3. **Relatedness.** Connection to others. Desire to interact with others.

### Interleaving

 According to [Ostrow, et al (2015)](https://www.researchgate.net/profile/Neil-Heffernan/publication/300790208_Blocking_Vs_Interleaving_Examining_Single-Session_Effects_Within_Middle_School_Math_Homework/links/5e36ff61458515072d7a0301/Blocking-Vs-Interleaving-Examining-Single-Session-Effects-Within-Middle-School-Math-Homework.pdf),
 interleaving (the practice of switching topics of study throughout a practice session)
 has a significant positive effect on learning outcomes in mathematics practice.
 Their study specifically focused on 7th grade math students. Students were divided
 into two groups. One group took a 12 question practice assignment with the types
 of problems mixed up. Another group took the same practice assignment with the problems
 organized by type. Later they were given a 3-question follow up assessment to determine
 how effective the practice assignment was.

 The study (which was a replication of a previous study) found that among high-skilled
 students there was little positive effect of interleaving but there was a significant
 benefit for the low-skilled students.

 > I was questioning whether it was better to present problems by subject or randomly.
 This leads me to believe that random problems are better and would benefit a greater
 number of users.

 ---

 [Foster, et al (2019)](https://link.springer.com/article/10.3758/s13421-019-00918-4)
 looked at whether interleaving was more effective with multiple problems of a similar
 type or with more dissimilar problems. Their findings support the distributed-practice
 hypothesis which says the beneficial effect of interleaving is due to spaced repetition
 of the problems, that is, giving the learner time between types of problems

### Gameplay/UX

Clearly defined objectives

What is my core loop?

### How to Measure Mastery?

stealth assessment

Involve students in assessment (show how the sausage is made)

### Timed versus Untimed Assessment

Most research indicates (unsurprisingly) that students perform worse on timed assessments
rather than untimed ones, but I was surprised to read one study ([Tsui & Mazzocco, 2007](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2806671/)) that found a negative
correlation between math anxiety and the difference in performance between timed and
untimed tests. In other words, in this study, students with more math anxiety performed
better at the timed tests than the students w/ less anxiety. The caveat to this factoid
is there were only 30 students involved in the analysis.

It's interesting to note that this study gave all student participants a timed and
untimed test. Students scored lower on the timed test only when it was administered
before the untimed test. In other words, if you want to mitigate the negative performance
results of timed tests, you should administer it after an untimed one. The researchers
attribute this effect to practice and familiarity ameliorating the negative effect.

---

Pearson did a study ([Pearson, 2004](http://images.pearsonassessments.com/images/tmrs/tmrs_rg/TimedUntimed.pdf)) that looked at timed versus untimed administrations of the Stanford
10 test and (despite their interest in timed tests) found mixed results. They found
that an untimed test was a benefit to students with disabilities and primary school
students but also that secondary school students who took an untimed test performed
worse.

> It's pretty clear that untimed assessments are the way to go for most math. I'm
wondering now if having a countdown before the math problems start conjures a shadow
of that anxiety. Alternatively, I put it in because I wanted a predictable ease in
to the problems.

> A line of argument I see a lot is that students need to be exposed to timed tests
because it prepares them for high-stakes tests in the future (eg, SAT and ACT). Although
I believe there is some merit to that sentiment, I don't think the overt use of a
timer has a place in the core functionality of this program.

### Effect of Math Anxiety on Performance

Despite what [Tsui & Mazzocco (2007)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2806671/)
found in the study mentioned above (the study was conducted on a group of mathematically
gifted 6th graders), in general students with higher levels of math anxiety performed
poorer on assessments than their less anxious counterparts. According to [Ashcraft & Kirk (2001)](https://www.academia.edu/download/27137080/xge1302224.pdf) this anxiety doesn't manifest
with simple arithmetic operations (ie, operations involving single digits), rather
it manifests with relatively more complex operations like those between two 2-digit
numbers, especially when "carrying" is involved in the operation.

Ashcraft & Kirk also theorize that working memory is a major contributor to arithmetic
performance and that math anxiety acts as a detriment to working memory, leading to
the observed declines in performance. The idea is that harboring an anxiety over a
math problem takes up one of the items in our working memory, rendering our mental
computations less efficient.

> This suggests to me the importance of automaticity in math education. High levels
of automaticity would decrease the student's working memory load.

They note that math anxiety tends to be a self-perpetuating phenomenon. Anxiety leads
to worse performance which leads to increased anxiety which deteriorates performance
further. They also note that students with math anxiety tend to not only perform
worse on arithmetic assessments, but they are less likely to engage in mathematics
later on in their academic careers (eg, high school and university course work, and
STEM careers), performing worse in those endeavors when they do.

---

One thing to keep in mind with math anxiety is that it has no relationship to intelligence.
According to [Ashcraft (2002)](www.mccc.edu/~jenningh/Courses/documents/math_anxiety.pdf)
the small correlation that does exist (r = -.17) is likely due to questions involving
quantitative processes on the IQ test.

Another interesting finding of this review was that the negative performance associated
with math anxiety primarily manifests with more complicated problems such as those
involving "mixed fractions, percentages, equations with unknowns, and factoring."

---

#### How to Reduce Math Anxiety

One of the most effective methods of reducing math anxiety is a technique called
systemic desensitization, or graduated exposure therapy ([Hembree, 1990](https://www.jstor.org/stable/749455)). Hembree doesn't go into the details of how this was applied, however.

---

According to the Wikipedia article on [systematic desensitization](https://en.wikipedia.org/wiki/Systematic_desensitization), the process involves three steps:

1. **Establish anxiety stimulus hierarchy.** Identify the source of the anxiety in other words.

   Since we're talking about math anxiety this step seems trivial.

2. **Learn the mechanism response.**  Develop a coping strategy.

   I'm not sure how I could design a coping mechanism into this program. Maybe I should
delve into the world of self-described "relaxing" games?

3. **Connect stimulus to the coping method by counter conditioning.** Exposure to
the anxiety followed by the coping method.

   If I can get number 2 figured out, then I can handle this one.

---

One source of anxiety seems to be lack of control and the teacher/student dichotomy
([Finlayson, 2014](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.951.7508&rep=rep1&type=pdf)). I think this program addresses that
by putting all the control in the user's hands.

> This does call into question something I had planned to do: making a mode that
was the completion of an instructor task or skill.

One of the coping strategies put forward in this paper was practice. I agree this is
part of the puzzle as practice increases competence which increases confidence. It
also ties back into the [Tsui & Mazzocco (2007)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2806671/) paper that found students performed better on timed tests after having
taken an untimed test beforehand.

---

The abstract of a paper by [Feng, et al (2014)](https://onlinelibrary.wiley.com/doi/abs/10.1002/mar.20710) suggests that slow-tempo classical music relieves math anxiety.

> I have mixed feelings about putting music in any program but it doesn't really
make a difference if the user can turn it off easily.

### How to Train Working Memory (WM)?

Based on the number of pop science articles on improving WM and the dearth
of academic articles on the subject it seems like there isn't a reliable way to improve
working memory. [Clark, et al (2017)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5448748/)
found that after 6 weeks of WM training, participants got better at the WM tasks
but there wasn't a "transfer" to other abilities (eg, arithmetic), nor was there
an increase in WM capacity. The caveat to this study is that it was conducted on
adults aged 18-40 and the authors acknowledge the lack of scientific consensus on
the utility of WM training.

---

In [Nelson Cowan's (2014)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4207727/)
review of the history and current state of WM, he points out that there are different
aspects of WM:

* Capacity, or how many items can be stored

* Speed, how quickly they can be recalled

* Knowledge, or familiarity with the subject matter

* Strategies, methods of chunking items into one WM slot

This could shed light on the findings of Clark's team that WM training doesn't transfer,
possibly because familiarity with a task or subject is needed to augment WM.

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

## Update 2023-02-17

It's been a while and I'm getting back into the swing of things. Today's update was tracking average time to answer a question. Next up I'm going to tweak it so it takes into account the size of the problem. 

## Update 2023-02-18

I tweaked the method of calculating the average so it calculates number of correct digits per millisecond. I've seen fluency calculated this way in a couple of papers, 
notably [VanDerHeyden & Solomon (2023)](https://www.researchgate.net/publication/368242548_Valid_Outcomes_for_Screening_and_Progress-Monitoring_Fluency_is_Superior_to_Accuracy_in_Curriculum-Based_Measurement). I haven't read anything about the rigor 
of that metric but it makes sense to accomodate more time for problems that have answers with more digits to compensate for the extra time to calculate a larger number.

I also made it so my averages were integers just because those floats can get a little long after the decimal. 

I fixed a bug where the timer would reset after every wrong answer instead of continuing to run until a correct answer was submitted.

Finally, I removed the getAverage function from my util.js file and made it a method of my user object. It makes my code a bit uglier in some places, but more readable in others. 
I'm not sure it's an improvement, but it doesn't take away from anything.

Next up, I'm going to implement a way for the levels to progress.