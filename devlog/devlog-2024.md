# 2024

## January

### Update 2024-01-23

#### 22:30

A random post on Reddit made me come back and tweak my sound until I got it how I liked it. It's no longer popping at the end of the sound on my phone but there's still some weirdness that pops up that I haven't identified yet. After playing with it, it still feels too punchy on the way in. Maybe it's my speakers?

I've also gone through and addressed some of the style issues I've had with presenting the problems so that they're more intuitive for users to understand (I hope). Some of my output HTML is pretty ugly but I'm not sure of a good way to clean it up.

I've also made it so that users can unlock everything with a push of a button *and* progress through the skills faster. I probably don't need that second part, or I could make it another button... I'll have to ponder that another night.

### Update 2024-01-25

#### 09:50

I've been adding new operation skills (Addition-Place Value) and reorganizing the UI to accomodate the new buttons. 

I've also been working on adding at least 8 individual skills to each operation skill. Writing "skill" out so many times makes me think I need to come up with a better set of descriptors for what I'm doing because this is going to be confusing to anyone outside of my bubble. Part of adding new micro skills is making new problem functions so I've made two more of those. One for 3-digit addition problems and one for reordering broken doubles. I'm very glad I put the work into that problem tester program because my intuition is often off for what will be a balanced or unbalanced answer distribution.

I've solved the redundant notification issue and I also discovered and fixed an issue where the Subtraction skills wouldn't unlock.

For the next bit, I'm going to try and fill out each strategy/skill (I like strategy, I may start using that going forward) with at least 8 types prolems.

### Update 2024-01-26

#### 22:30

Filled in the operation micro skills. Fundementals has 8, Reorder 8, Place Value 6, Partition 8, and Compensation 4. Eventually I'll be filling those out more but I want to move on to something else next. I might work on fleshing out subtraction or starting on multiplication but I might just rename "Progression" from the top-level menu to "Survival" and work on that. I need to change things up a bit I think. 

#### 15:00

I have revamped the problem tester! It's a lot prettier now and it's easier to see what's going on. I think there's more that I need to do with it, but for the moment, I'm very pleased.

#### 00:00

I powered through a few more micro skills (three in Addition-Place Value) but I got hung up on trying to consolidate some of the *seemingly* redundant functions. It turns out I'm not as clever as I thought so I kept things mostly as they were. 

Then I thought I'd start on remaking the problem tester program. I never liked how it didn't keep track of the answers produced, only the percentages involved so I started redoing it with a mind to keep ahold of those values. I think it's going to be mostly the same but I'm going to go back at it with an eye for style once I get it doing what I want.

But it's midnight now and I don't want to be too grumpy in the morning so it's time to turn it in.

### Update 2024-01-28

#### 23:30

As I thought about doing a new mode, I knew that I wanted to have a timer or countdown of some sort on the screen, but looking at the screen space available when users are inputing answers, I could see I didn't have a lot to work with. In previous programs I'd used a few nested div elements to make a countdown but there just isn't space in this program to make that work. An idea I hit upon was to have an animated border that would grow or shrink like a burning fuse or something similar. 

Nothing like that exists. 

What does exist is a often overlooked SVG property called `stroke-dasharray`. It's pretty easy to understand, you just indicate the length of the dash and the length of the gap. The units are either the regular baked-in units of SVG or percentages where 100% is the normalized diagonal of the `viewBox` or the SVG element itself if there is no `viewBox`. So what I have to do is start my dash array with a `0` and follow it with "`(objectPerimeter / normalizedDiagonal)%`." The formula for a normalized diagonal is graciously given in the SVG specs and the object perimeter is the `2(L + W)` unless there're rounded corners and then you have `2(L + W) - 8r + 2πr`." From here it's just a matter of changing the initial `0` until it matches `objectPerimeter / normalizedDiagonal`. 

[Here's a rough draft](https://dkallen78.github.io/math-trainer/experiments/dasharray-test.html)

Tomorrow, if I have time, I'm going to try and implement it with responsive design features in my new mode.

### Update 2024-01-29

#### 23:30

Before I could put my fancy moving stroke somewhere I figured I had to have somewhere to put it so I've been working on the Challenge mode (formerly Progression). My first challenge to create is going to be called Survival. The idea is the user will have 60 seconds to answer as many questions as possible. Every correct answer adds five seconds to their time. The final score will be the number of digits answered correctly. I think I'm going to break it down into different operations so that the user can tackle one operation at a time. Maybe I'll make it a toggle so you can select one, all, or any combination of the four operations. Nothing is set in stone at this point.

I'm also playing with refactoring my CSS because I want it to be more readable so I'm going to try the BEM model or a variation of it. I've been using JavaScript camel case to name my CSS stuff and I don't like it anymore. I'm also going to make an effort to use more intentional tags instead of drowing the page in divs. It doesn't break anything when I do it and maybe it will help someone down the road.

Tomorrow I hope to have something working.

### Update 2024-01-30

#### 23:00

Not much to brag about today since I didn't get a lot done on the Survival challenge. The issue is that I can't abide an ugly UI and it takes some finesse to make things look good. Couple that with rejiggering how I want to handle CSS and I feel like it might be time for an overhaul soon. We'll see... 

I got the launch screen for survival mode done. It has the four buttons for each operation that can be toggled on and off as well as Start and Back buttons. Before I jump into the math part that's ahead of me, I need to figure out how I'm going to handle problems. I know I want them to get harder as time goes on (or do I?) but I'm not sure how that will happen from an algorithmic perspective. Maybe just increase the potential value of the terms as a function of elapsed time? That's a good start I guess but I also want to open up decimals after a bit as well. Let's just start with my first idea and see if we can get it working =P

That will be my task for tomorrow.

### Update 2024-01-31

#### 23:00

We have achieved math. I have the skeleton of the Survival challenge assembled and I've even got the animated stroke working as intended; I'm very happy with the effect. Next up is to make the time do something because right now it doesn't do anyting, although I do keep track of it. I need to have the challenge end when the time is up and have a score-display screen or something. I suppose I'll eventually have to keep track of scores but that's more of a long-term goal. For now I'm going to rest happy that I pulled this off and that it looks nice. Tomorrow we'll make a complete challenge.

## February

### Update 2024-02-01

#### 23:15

I have the survial challenge put together how I want it and that makes me really happy just because of how it all came together close to how I envisioned it. I did ask my wife to play with it on her phone and she didn't know what to do intuitively. She said she didn't understand how to confirm her answer input, so I think I need to put some kind of affordance into my number pad to make it clear that the `Submit` button is important.

One issue I do see with the Survival Challenge is I'll often get addition by low numbers or even 0. That's just based on the way the problem-generating function is set up to produce a uniform distribution of answers, but I wonder if it might be better to abandon that principle in the pursuit of better difficulty scaling. I'll just have to try it and see how I like it I guess. 

Tomorrow I should continue putting in more subtraction problems and maybe even start on multiplication. 

The more I build this out, the more my past choices frustrate me and the more I want to build it more organized. I don't think it's time to do another rewrite/v0.4 but I do want to start thinking about how I can make everything easier to navigate within the IDE. It doesn't help that I've been building this over the past year off and on I guess.

### Update 2024-02-03

#### 23:00

I made a new category for Subtraction strategies: Decomposition. Basically, given 17 - 13, you break it down into 17 - 10 - 3 since subtracting 10 and 3 is easier than subtracting 13. If I'm going to finish up subtraction then the next category to tackle would be Compensation which I've already done for Addition, so this will just be a modified version of that function. 

I'm always surprised by how much work it can be to make a random problem, the potential answers to which are evenly distributed, and fits the correct form to teach a specific lesson. I mean, it's pretty easy to make up the problems in my head, but making the browser do it is something else sometimes.

I need more. I've got three primary menu items and looking at my base menu screen I feel like I need five or six. When I started this three years ago I didn't think it would take this long or it would have changed this much.

### Update 2024-02-06

#### 23:00

I've made some decent progress on multiplication problems and made a new function for helping to illustrate the Distributive Property of Multiplication. I also made a helper function to help generate products. With addition and subtraction problems I can generally use a random number generator to create a random answer, but that doesn't work with multiplication because I could randomly generate a prime number. So what I do instead is use nested `for` loops to create a list of possible products as well as the factors used to produce them. This is relatively slow compared to some of my other algorithms but its lack of speed is only an issue when I'm running it thousands of times. So, when I need a random product, I plug in the ranges of my two factors, create a list, and randomly pick a product from the list. It's not stupid if it works. 

I want to do something with sequences next but I'm not sure how to fit it in. I should probably read up on how to use them and how best to apply them. Oh well. Issues for tomorrow =P

### Update 2024-02-07

#### 22:45

I made a new problem function and two new helper functions! The problem function makes multiplication problems designed to be solved with the associative property of multiplication (`a × b × c = c × b × a`). Part of making that more palettable involves finding the factors of a number so I made a very rudimentary function to do that. It's not a good solution for large numbers but it works fine for the numbers I'll be working with. Finally, I figured out a way to improve a line of code I've been reusing to make it easier to remember. In my problem functions, I create an array of possible answers to output and I return one of them at random: `return solutions[rnd(0, solutions.length - 1)]`. I don't like typing it and I don't particularly like looking at it and it's in nearly every problem function I write. I looked into making a custom method for the Array object but it turns out that's not a good idea. What I did instead was add a function to my `rnd()` function so now I can call `rnd.index(array)` and get the same result as my previous line. I have no idea why it took me so long to come up with this >< I might do something similar with `rnd.f()` when I have to start generating floating point numbers but I can think of other solutions so we'll cross that bridge at a later date.

### Update 2024-02-09

#### 23:00

Today I made a simple repeated addition/subtraction sequence function. Pretty simple but really quick and easy to implement. 

I'm trying to figure out a way to introduce division. The nature of this program limits what options I have. I don't have explanatory text. So far I've just limited myself to numbers and I'd like to stick with that going forward because I feel like things will get messy if I try to get too far out of my lane. I'm not sure how I'm going to do it. All I can think of so far is to introduce it as the opposite of multiplication but that feels insufficient somehow. 

I'm also thinking of soliciting math teachers to look at it and tell me what sucks and what works. I've been on my own for too long; I need to get anchored.

### Update 2024-02-11

#### 23:45

I think I've got intro to division. I start it off *really* simple by just doing stuff like `0/7`, `7/1`, and `7/7` to get zeroes, ones, and identities covered and introduce the new language of fractions because I use MathML to put fractions along side the traditional `÷` operator. The next thing I introduce is dividing by two because splitting things in two is pretty straight forward as far as mental load is concerned. But I pushed myself to make something a bit different. I've got a function that will make a sort of pie chart with a set number of wedges (dividend), and then those wedges are divided up into groups (divisor), and those groups are animated so each one shows changes color one at a time. The number of wedges in each group is the quotient. I don't know if it works from a didactic perspective, but I am pretty proud of myself for making it work.

Next up I need to study up on some mental strategies for solving division problems. All I have right now is "turn it into a missing term multiplication problem" and I'm sure there has to be more out there that I'm just not remembering.

### Update 2024-02-12

#### 23:30

Having gotten started on division, it seemed that I needed to tackle fractions. Fortunately fractions are usually taught before decimals because I'm not up for decimals at the moment. I've made a good start on fractions. The difficult part has been not just dynamically making the SVG elements based on random numbers, but making it all fit into the window I've been using to display my problems. It's kind of funny because last week I was stressing about fitting longer equations into my display, now I'm trying to get SVG and numbers. So far it's all going swimmingly but we'll see if I'm still optimistic when I'm trying to cover fraction arithmetic — everything so far has just been focused on identifying fractions.

One thing I discovered today that's going to make me go back and simplify my code is the `element.outerHTML` method. Because everything is set up to just inject raw HTML into the problem display area, I've been struggling to get my SVG and MathML elements into the problem display without being super janky, but `outerHTML` lets me build a shadow DOM and just shoot it into the live DOM with `innerHTML`. Totally rad.

Tomorrow, more fractions. 

And I feel like I'm getting close to a refactorization and reorganization. But before I do that, I want to clean up my Git as well so that it doesn't look so shabby around here =P

### Update 2024-02-14

#### 23:30

I've started "the big update." Basically I want this repo to look more professional. Part of that is cleaning up my file structure and naming conventions. Scripts go in the script folder, styles in the style folder. I've started separating style sheets based on where in the program they're used. I'm being more liberal with how many js files I have as well. I've got most of the basic menu screens done (still missing a few) but the big problem I want to solve are the math loop files. The two I've made share 90% of their code but I can't quite figure out a way to consolidate them. 

Oh, and part of this big update/clean-up is a more consistent visual style for my UI. Hopefully it all works out for me!

Tomorrow, in addition to finishing up my menus and trying to get the math up and running, I'm also going to rejigger this readme page and try to organize my past updates better.

### Update 2024-02-15

#### 22:30

I've finished the "big update." Except for the notifications at least. I'm thinking of having an intermediate page between when a user completes a strategy and when they are booted back to the Strategy Details screen, similar to how the Survival Challenge works. That would give me more space to work with and let the user dismiss it at their leisure instead of having it pop up and disappear after a bit. 

I've also drastically updated my file structure and file-naming conventions. I have more files now, but they are easier to navigate and it's clearer what they do. Hopefully that means I can be more productive =P 

## Update 2024-02-16

### 22:45

I added a challenge that only lasts 60 seconds and the user has to answer as many questions as possible as they slowly get harder. A lot of it was just copy/pasting which makes me think I need to look at how to condense some of my work. I'm not going to worry about it in the short term because it's just a distraction, but I really feel good when I can refactor stuff down to one function. 

I indulged a conceit for a week or two that I've now abandonned. It all started with condensing `document.getElementById` down to just `get`. I also shrunk my `makeElement` function to just `make` and made a lot of methods for individual elements like `make.button()` and `make.svg`, and I like all of those a lot. I got it in my head though that it should be a set of helper functions and `set` should be a part of it. Indulging myself, I made a `set.click` function that used `element.addEventListener` instead of `element.onclick` because I heard the former was "better" than the latter. That may be true but `addEventListener` does not work so well with anonymous functions or functions with parameters. So I've abandonned `set.click` and I'm back to `onclick`.

I've got a lot of other stuff to do in the upcoming week, but hopefully I can expand the division or multiplication portions of the strategies mode in some spare moments.

## Update 2024-02-18

### 23:00

Nothing to brag about today. I rewrote the code that handles how the theme page is built so it's more automatic and I created a new file with theme data so it's easier to make new ones. I did all this after making a Blue theme. I might make a green and black "Matrix" theme before I crash tonight.

I reached out on reddit for feedback on how I'm doing but noone responded. Either I'm missing the mark by a lot or teachers don't have the bandwidth to play with new software. I'm kind of bummed about it but getting ignored on the internet is no big deal. I do need to find a source of feedback though. Maybe I should be looking internationally...

