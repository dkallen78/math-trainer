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

## Update 2023-03-07

### 23:30

I'm starting to put together the v0.3 into a usable program. It's not "functional" but there are some buttons you can press and you can start to get an idea of how it's going to 
be different. The big thing is you'll only be working on three skills at a time instead of up to seven, so that should make the sessions shorter.

## Update 2023-03-08

### 23:00

Version 0.3 has a rough functionality. Since I had been away from this project for around a year before coming back, I'm trying to understand what I did before by putting the pieces 
back together as I need them. That's making everything go slow. And what I have now is kind of janky and it needs some basic commenting which I'll do tomorrow. 

## Update 2023-03-09

### 22:00

Things are moving slowly but steadily. I addressed all the obvious bugs I had yesterday and even through some comments in. Now that answering questions and progressing through 
the different parts of the application are coming together, I'm working on the actual act of progressing. One oversight I had from v0.2 is how I tallied the averages. In v0.3 I'm 
still keeping track of the total average per skill over all, I'm now specifically keeping track of the average of the last 20 questions to determine progression so that each play 
through will require 60 questions and I'm thinking of capping it at 100 questions per session. Maybe that's too much, I'll have to dig through Google Scholar some more I suppose.

## Update 2023-03-11

### 11:30

I've got basic progression! It took me a while to work out the best way to do it but what I've got should scale up 
as I add more skills to the program. 

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

## Update 2023-03-13

### 13:15

I fixed the errant function! It wasn't exactly broken, but I did iron out the answer distribution curve. The function isn't as small as it once was, but it gives reliable output.

## Update 2023-03-14

### 23:00

Happy Pi Day! I found and fixed a bug that made the skill level up not work right. I think I've over complicated things and I'll have to take a look at what I've got at some point to see if there's any way to simplify it. I bet there is but I don't want to spend what limited time I have to work on this on that problem at the moment. 

I've also made it so the program won't level you up if there aren't any functions for the next level so you can keep playing without crashing the game. 

Aside from the number of problem types available to the user, v0.3 has the same functionality as v0.2 so I'm going to update the link at the top of my page. Woohoo!

## Update 2023-03-20

### 22:15

I've felt kind of stuck on how I want to move forward with how problems are organized so I decided to do some work on other parts of the program. Users can now change the color theme of the program. Long-term, I want the different themes to be something that can be unlocked by the users but I'm going to leave them as they are for now.

## Update 2023-03-26

### 23:00

I've done a bit of a rework on how the app is going to work. The Progression mode is out. I'm implementing a Skills mode instead where users can work on individual skills to help them solve mental math problems. I'm also going to add a sort of speed mode where users try to get as far as they can while problems get progressively more difficult. 

The big issue with implementing the Skills mode is how to organie the skills. What I've got now is separating the different techniques by operation (addition, subtraction, multiplication, division) and then having specific strategies/skills to practice and progress through. The big issue with that is implementing a progression which I'm having to do on my own because teachers are busy and don't have time to critique my choices or offer their own. So, I'm slowly and methodically putting together addition skills while trying to figure out how to design a UI for it. Good times!

## Update 2023-04-24

### 22:15

I have something working again! Admitedly, I've been slacking lately, but my wife set a fire under my ass to keep working on it and so here I am. The program isn't really up and "working" but it's got a semblance of functionality which is as far as I wanted to push tonight. 

Tomorrow I'll start getting it presentable again ;)

## Update 2023-04-25

### 21:30

Progression through the skills is back! The next step is to fill out all the skills to make sure everything is working together. 

### Issues

Writing the functions to make the random math problems is tricky because I want a flat distribution of answers. It's really easy to end up making a normal distribution that gives a weight to certain answers but tricky to avoid it, especially without making really ugly functions.

I need some way to notify the user when they've unlocked a new skill branch. Currently, the user starts with just Addition, Fundamentals unlocked, but when they unlock Addition, Reorder I want there to be some kind of notification that something new is available.

I also have a headache and that's why I'm stopping kind of early. That totally counts as an issue.

## Update 2023-04-26

### 22:40

Making good, multi-use functions to produce random problems is hard. I could make custom functions for each skill but that seems kind of wasteful, so I'm trying to make functions that can be used by more than one skill. But the more work you make them do, the less they want to keep their flat distribution curves. It's not acceptable (to me) that one answer would be produced 34% of the time and another only 1%.

I also put another post on reddit reaching out for some input/help/guidance. I have to try, but I think I'm alone on this one. For now.

### Issues

I'm finding that I need to make my problemTester program a little bit more versatile, so I'm going to try ot put some work in on that this week to make it more useful and maybe a little prettier.

I still need a notification system but I'm focused on these other issues for now.

## Update 2023-04-28

### 22:30

I spent most of the time I had available to work on making distribution curves flat. It's not too hard once you figure out what's causing them, and it's fun to think about different ways of arriving at similar solutions. 

I was also all set to start on Addition - Compensation skills when I realized that they had subtraction built into them so I started building out the subtraction skill tree as well. Looking for inspiration, I went back to the CCSS, so I'm starting to align some of my problem types with those.

I got a few responses to my reddit inquiry about helping or providing input on my progressions but I don't think most of them looked because they just sent me to read some other resources. Still, it's always good to go back to the academic papers because there's a lot of good stuff in there.

### Issues

I made my Problem Tester a tad more useful but it's not any prettier.

I still need a notification system.

## Update 2023-05-21

### 22:30

I tackled some small quality of life changes. The numbered buttons used to select a particular skill now "pulse" when they are available but have yet to be completed. I'm 85% happy with the effect but I feel like I can do better. Still, it's probably better to keep it simple. This change also tackles the smallest part of needing to have a notification when something new unlocks. This change is good when a new skill is unlocked on the screen you're already on, but I need something that indicates when something new is unlocked on another page. 

I've updated a button that now visually shows when it is "inactive" and when it can be clicked/touched. 

Lastly, some buttons were missing sfx when they were clicked so I made sure they have my pentatonic tones.

### Issues

I still need a notification system.

## Update 2023-05-22

### 22:30

I've got a scheme for doing notifications and I learned some new stuff about animation event listeners! I'm sure I've got some bugs in there I'll need to wrestle with down the line but I'm very happy with how everything is progressing. I needed to step away from making a hierarchy of mental math skills and get back to some programming problem solving. I also need to remind myself that I don't need to make a perfect skill tree of mental math, I just need to get chunks of all four operations and I'll be doing great. 

I've got a legacy button in my program that doesn't do anything. It says "Progression" but I don't have a Progression mode any more. I need to switch it out with a new mode or just get rid of it for now. 

I also think I need to organize what needs to be done better, I'm just not sure how to go about it right now. If anyone's reading this, shoot me some ideas!

### Issues

Better organization of to-dos

## Update 2023-05-23

### 22:30

I pulled up my program on my phone today and I was shocked to realize it looked like shit! I had planned this from the beginning as a mobile first app so it was a bit upsetting to see that nothing fit. One problem was my mobile Firefox settings upscaling my text because I set it to match my phone's settings (which have big letters because I'm over 40 now and my near sight is shit). Chrome looked better but that damn disappearing address bar was making my life miserable by cutting off just the tip of more than one page. Turns out I need to stay away from 100vh on mobile pages. I made the fixes and things look better. 

### Issues

Better organization of to-dos

Sound is still "crunchy" on my phone. I don't know if it's my speakers or just the tones causing weird issues. 

## Update 2023-05-25

### 22:00

For better or worse, I just don't want to mess with skill trees right now. Instead I've started working on the sound options. I don't know how I'm going to turn it on and off short of an "if" command but that's probably how everyone does it. I have a sneaking suspicion I'll need to rework how I handle scales but probably not by much. I also need to come up with a new interface that's in my head and make it not be a hot mess. I would be working on that now but I'm tired and I'm ready for sleep. 

### Issues

Better organization of to-dos

Sound is still "crunchy" on my phone. I don't know if it's my speakers or just the tones causing weird issues. 

## Update 2023-05-26

### 22:30

I'm getting the sound options sorted out. I had to do a minor tweak to how I did my scales and how I played random notes, but I didn't have to make any drastic changes. Here's what I've got so far:

* I can turn sound on and off. I had to put a `if (soundoff) return` at the very beginning of my `playTone()` function but it works and it's not ugly or ungainly

* I can play a random note from the current scale or play the whole scale from the sound options menu

* I can change the current active scale between one of the five pentatonic scales. I'm not terribly happy with the user interface, specifically with the fact that it doesn't indicate which of the scales is the currently active one, but it's time for bed, even if it is a Friday.

Next up is changing the current key which is really a UI problem since the difficulty is that there are 54 possible keys. So I need to find a way to let the user choose between them while still maintaining my aesthetic. I've got some ideas but I'm not sure if they're any good or not. We'll see once I start trying to implement them!

### Issues

* Better organization of to-dos (seriously, one of these days I'm going to get on this)

* Sound is still "crunchy" on my phone. I don't know if it's my speakers or just the tones causing weird issues. 

## Update 2023-05-27

### 22:15

The sound options menu is coming together! Yesterday my scales were janky, today they're still janky, but not as bad. I also put together a way to change keys. I made some compromises there but if I hadn't, my code would have been kind of ugly and I like to avoid that when I can. Aside from the compromises, I'm really happy with how it turned out on the page and under the hood. I think I'm going to try playing with changing the waveforms next which should be straight forward for the basic waves but if I want to do anything fancy, it will get hard real quick. I'm also pondering just loading this thing up with all kinds of musical scales just for funsies and see if I can't find a good UI to make it work.

I also started adding stuff to my GitHub kanban so hopefully I can use that to keep on top of things.

### Issues

* Sound is still "crunchy" on my phone. I don't know if it's my speakers or just the tones causing weird issues. 
