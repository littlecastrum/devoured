---
title: 'Automating with bash and github API (1)'
description: >-
  Most tasks can be automated, creating new projects should be one of them.
  Let's try using the Github API to make our life easier from the terminal
date: '2019-06-01T18:37:00.374Z'
categories: []
keywords: []
---

![An automated task](./automated.gif)

Most tasks can be automated. Creating new projects should be one of them.
Let's try using the Github API to make our life easier from the terminal whenever we want to
initialize a new project with a github repo.

> DISCLAIMER: The following script will work for unix based systems. Changes will be necesary for Windows

### Pseudocode

```
    IF NOT directory exists
      CREATE directory
    END

    MOVE TO directory

    IF NOT ".git" directory

      IF NOT github repo with same name
        CREATE new github repo
      END

      INIT git
      ADD REMOTE git repo
      CREATE README
      PUSH local repo TO remote repo

    END
    OPEN code editor AT pwd
```
---

### What do we need for this task?

- Bash scripting
- HTTP (We will be using `curl`)
- APIs
- How to use Github

## Bash Scripting

For this part we are going to need to learn several basic commands and structures from the bash language.

First we have the basic commands: 
- `cd`: allows the user to travers the filesystem
- `mkdir`: creates a new directory in the given path
- `touch`: creates a new file in the given path

```
mkdir Projects        // Will create a new Projects directory
cd Projects           // Move into the directory
touch test_file.sh    // Creates a new 'test_file.sh' file
```
If we add some conditional expression we wil have the first part of our script.
In bash a to test for `true` or `false` we use the brackets (`[]`) with flags inside
if we pair that with the `if statement` we can build a our conditionals.

```
if [ ! -d <some_path> ]; then
  mkdir <some_path>
fi
```
**NOTE: The space inside the brackets is important**.

Let's upack what we did here. First we declared an `if` statement that will run the code between the `then` and `fi` declarations. Afterward we created a `condtional expression`. The `!` turns the check into it's opposite like in most programming languages. The `-d` flag checks if a directoryu exists in the path that you pass to the expression. Afterwards we create the new folder now that we are sure the path is available

We can clean that up using another tool: `&&`. This will test if the left side is true it will run the right side code. Afterwards we can just change directories to the newly created one.

```
[ ! -d <some_path> ] && mkdir <some_path>
cd <some_path>
```

If we put this inside a function in out `.bash_profile`, `.bashrc` or `.zshrc` we can start calling it from everywhere.

####.bashrc
```
name_new_function() {
  [ ! -d <some_path> ] && mkdir <some_path>
  cd <some_path>
}
```
####on the terminal
```
source .bashrc
name_new_function test
pwd 
```

You will find yourself in the new directory. For the next step we already have the necessary tools

```
name_new_function() {
  [ ! -d <some_path> ] && mkdir <some_path>
  cd <some_path>
  if [ ! -d ".git" ]; then
    // Test if the repo exists on github
  fi
}
```
As you can see the logic is pretty much the same, but testing if the repo exists in github will take the rest of the knowledge that we need for this automation. We have 2 viable ways. We could use some other scripting language to simulate the process of accessing github and creating a repository or we could just make use of their very simple and well documented API which requires just one command to create a repo, list them and delete them in the future.

I will let the explanation of the for the next post, have a good one.