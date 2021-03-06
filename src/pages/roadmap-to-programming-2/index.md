---
title: 'A roadmap to programming (2)'
description: >-
  If you have managed to learn any language whatsoever I congratulate you. You are now part of the most demanded field of employment in the world.
date: '2018-02-26T00:14:34.882Z'
categories: []
keywords: []
---

!["A goal without a plan is just a wish" — Antoine de Saint-Exupery](https://cdn-images-1.medium.com/max/800/0*B6SYbRery3e8X271.)
"A goal without a plan is just a wish" — Antoine de Saint-Exupery

### On learning the ropes

If you have managed to learn any language whatsoever I congratulate you. You are now part of the most demanded field of employment in the world.

I suppose you must be asking yourself once you managed to learn the basics of a programming language and you know what a text editor is, and how to make a webpage, what is the next step. Well, this is my recommendation, make projects, courses or get yourself hired.

Once you know the basics of a language you just know the common rules and basic communication skills. To learn how to make applications (where the real money is) you need to learn the ropes of making things. Like making anything in life you need to experiment how complicated it is. Every single time you built something new you gonna find yourself with the realization that you are ignorant of something new. Every problem have a different algorithm and everyone of them have their own level of complexity.

If you do a todo list, you need to understand how to filter, how to make a search bar, how to add dynamically to a page elements of a list, you need to decide if you are going to keep the records of all that have been executed or you going to vaporize that piece of information. If you are saving them are you going to keep a visual evidence? A todo list can start as a simple project and end up being a behemoth and the same applies to any issue.

So you need to learn how to plan a project. The list of books I provided in the previous part of this series has many books on project management, planning and the language to use when you share the project with other people (it's usually UML).

Making things will make you learn how big is the world of software development and how many things you have to learn. But to make it more accessible to you this is a run down of any normal project you will make with more than 2 people:

*   A front end which will be comprised of the entire client logic. This can be as simple as a HTML with a script embedded and a CSS stylesheet or as complex as it commonly is now days with a filesystem comprised of a "public", a "dist" and a "src" folder at the root. The public folder is a standard for the static files, the dist is a standard for all the compiled files it stand for distribution (trying to imply that thats the code you will distribute to the users); the src folder stands for source, which have all the source code of the app. All this is managed by a bundler (In my case I use Webpack.js) and then a server reads from the dist folder and allows you local access to test the app. This is called a development environment.
*   A backend have a similar structure and it handles all the communications between the front end which is the V in the MVC paradigm (you should learn what that means if you don't) and the database. The backend is the M in the MVC. It manages the API that has all the endpoints for the front to consume data. The most popular paradigm for the design is REST but Graphql is redefining that in most of the big applications.
*   Then you have devOps. DevOps is the element of the project that allows a team of different individuals with any type of operative system in different parts of the globe to work in tandem. They usually set the repository for source control. You need to be able to share code with the team efficiently. If you haven't learn git and joined GitHub so far you should. They will add a CI (Continuous Integration) tool that will make builds of your application and check that it's still working every time you do a PR (Pull Request). Now days they also add an extra layer of functionality that is called container. A container encapsulates the application in it's own environment and recreates it in any computer with any operative system using virtual machines and prebundled packages that are needed for the application to run. For example if a new member joins the team and they don't have python installed but the app requires it, the container is run and it should check the system for python and if it's absent install it. I'm oversimplifying their work, but it's so vast the knowledge of devOps that this is just what I have had the chance to know of their work.

This list could be longer but this are the most popular 3 things that make an app. There is also testing which I have not covered and the people in charge of making the design and architecture of the app. But we will left that for another post.

Every time I sit down to write about this I realize how big this entire process is so my condolences in advance for those that are more confused after reading me. If that is not the case I'm glad that I could help.

Have a good one, see ya another time.