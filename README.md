# Roundtrip React Challenge

### Description  
This application matches unmatched patient insurance plans to master plans.  If it does not have a master plan to match,
the user may create one.  

### How it Works  
When the application mounts, a call is made to retrieve a random unmatched plan.  This unmatched plan is displayed 
in the inputs.  At the same time, another call is made to retrieve all master plans, to be populated in the select dropdown.  
It will also filter those master plans to find the closest match to the displayed unmatched plan.  

When the "Match" button is clicked, an alias will be created with the given master plan and unmatched plan information.  
The Match button will be disabled if no master plan is selected.  

There will be times when there are no master plans available in the Closest Match dropdown.  In this case, the user must click the "Create Insurance" 
button.  This will create a new Master Plan.  

Upon clicking either the Create Insurance or the Match buttons, the UI will display a simple alert that will show either an error or success message
to the user.  

### Future Development  
The coding for this assignment was timeboxed to around two hours, so naturally, there were many things I would have liked to have added.  
I focused on achieving the minimum viable product, with the functionality required to make it work.  
Given the time constaint, I kept the styling minimalistic and simplistic.  

I would have also liked to have added automated testing.  

### Links  
A project that I am particularly proud of, and also uses React, is [Super Smash Kittens](https://github.com/thebriankilpatrick/untitled)  
