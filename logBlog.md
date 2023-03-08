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

## Update 2023-02-19

### 16:00

I've changed the level paradigm. Previously I had regular levels and "test" levels that would unlock the regular level. That's too complicated. It can work, but there's 
no reason to force it to work. Instead I'm just going to have 12 levels (for now) and when you achieve a certain degree of mastery, the next level will be made available. 

Having said that, I've just updated the interface for now and I'll be uploading the internal functionality later tonight I hope.

### 18:20

It works. The "test" levels are now just normal levels. 

Now I need to decide what the metric for mastery is in a particular skill. My first instinct is at least 40 digits correct with an average correct response time per digit less than 
2000 ms but I worry that the means of number input can have a big effect on that time. I have great typing speed so my hands can keep up with the answers, but if a user is inputing 
numbers on the number pad with a mouse, then it might be hard to achieve that time. I'll get something working before I worry about it much more.

### 22:00

I can now evaluate "mastery/fluency" based on correct digits per millisecond. Once a skill has been "mastered" it stops being selected by the getProblem function due to a new 
weight system I added as well. As things are now, when the user masters all skills in a level, the app crashes =P My next task is to figure out what to do when the player has 
conquered a skill. Should I have a progress bar? Should I fall back to the level menu when a level is mastered? Decisions, decisions...

## Update 2023-02-20

### 23:00

I shifted gears a little bit today. I wanted to have some kind of sonic feedback when pressing the keys and I've been experimenting with the Web Audio API and having each key press 
generate a random note on the pentatonic scale. It works and it doesn't sound too bad but something's off with it. You should be able to play with it to see where it's at right now. 

It's currently set to the pentatonic major scale in A. I'm thinking of having correct answers play a pleasing chord and incorrect answers play a dissonant chord. I've got a little practice program where I'm experimenting with the combinatiosn of sounds. Hopefully I can finalize something this week.

### 23:30

I'm going to bed, but before I do I'm putting the html file I'm using to fine tune everything up here as well, enjoy.

## Update 2023-02-21

### 23:00

I'm still making noise. I cleaned up the SFX code and implemented it in the main program. I put all the Web Audio API stuff into its own file in case I want to use it in something 
else. 

When pressing the number keys, backspace, or decimal, the program generates a random tone in the C pentatonic scale. For a correct answer it plays a C Maj chord. For an incorrect answer it plays a C tritone. When the user completes a skill it plays a C Maj arpeggio. There's still some kinks to work out since I don't 100% like the resolution of the C Maj and the C Maj arpeggio is competing with the C Maj since they play at practically the same time.

As far as handling progression, I'm trying to come up with a good visual gauge of skills passed but I'm not happy with any of my ideas. Maybe something will come to me before the weekend.

## Update 2023-02-22

### 22:00

I'm still tinkering with the sfx because it's not quite right. I'm thinking of playing any note in the scale except the tonic so that when you get the correct answer it has a sense of resolution/completeness. When the user completes a skill the arpeggio is the I, IV, and V chords, and 
it sounds much better, I'm keeping that. The game also pops back out to the level select menu when all the skills are completed instead of freezing. What it doesn't do yet, is actually progress the level >< We'll work on that bit tomorrow perhaps.

The big thing I'm still pondering is how to show progression. Should I have a circle for each skill to fill that fill in as the user progresses? Should I have a meter bar that fills up as the user progresses? Maybe a moon that becomes full? I'm going to research that for the rest of my night instead of tinkering. 

## Update 2023-02-23

### 23:30

I've actually got progression in the game! Now if you start at level 1 and you complete the level, you unlock level 2!

Another big thing I did was add dynamic compression to my sfx because the four tones of my chords were making sound on my mobile sound like trash. There's still some weird 
clicking going on that I need to figure out but I'm going to come back to that.

I made a new problem type for level 11 but I'm stuck for the moment because I want to know how different missing-term problems are from "standard" problems. Should they be in the 
same category or should they each have their own functions? It's a very specific question and I'm not sure I'll be able to find a good scholarly answer but I'll dig for a few days 
before I settle on anything.

## Update 2023-02-25

### 22:00

I've added a new level and one new problem type, as well as making a small change to another problem function that 
gives it a bit more flexibility at the cost of another parameter. 

I still haven't come up with a good way to visualize progression through a level but I want to completely overhaul 
the math skill tree before I approach that again. I'd like each level to have the same number of skills/problem types before I put a ton of thought into it again.

In addition to redoing the math skill tree, I want to start tackling user metrics and tracking student progress 
over multiple sessions. I'm going to start working on that next while trying to figure out what data is most 
valuable to educators and how I'm going to manage and present the data I do collect. 

## Update 2023-02-26

### 22:30

No changes to the program today. Instead I've started a new .md file that will have the mental math progression listed out and I'm going to invite professionals 
to comment on it and suggest changes. There's not rush on that. What I'm pouring my mental energy into now is a way to keep a record of the user's progress in web 
storage. I want data!

## Update 2023-03-02

### 21:45

The program can now save data between sessions. As of not it's just the player's level but expanding that to include all of the player's stats is relatively trivial. I'm at the point 
where I think I need to rebuild it. I am envisioning a new way of progressing through skills but I need to build a skill tree. of sorts. Instead of progressing through levels that 
were based on grade-level skills outlined in the mentalStrategies.pdf, I'd like the user to be able to progress through skills more organically. Everyone starts off with the simple 
addition and as the user shows proficiency then the skills expand and unlock. I'm not sure how I could integrate interleaving into a progression like that but it feels more natural 
to me.

## Update 2023-03-05

### 22:45

I have a better idea of the direction I want to take the program and how I want things to progress. I'm going to start from the beginning and cannibalize the parts that worked 
from the previous version. I added two new functions to the utility library for fading in and fading out elements. They're asynchronous because I didn't want to worry about callback 
functions and this way I can just call it with await then do the function I want after it's done running.
