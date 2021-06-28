# Movie-Library created with The Movie Database API. 
## [Click here](https://movie-library-b420b.web.app/) to check it out!

## Why a Movie-Library?
### I recently watched more series than movies. While i was looking for movies, i had the idea to create a project. I stumbled upon TMDB-API and thought of a basic layout to have some genres and a movielist. The more i used the API, the more i discovered and added to this project.

## **Thoughts i had at the start/during this project:**
### Only use hooks/funcional components and no Redux.
#### As the project grew bigger, passing states/properties has become bothersome. The project isn't very deeply nested, so it was still manageable. 
### Stick to basic css:
#### I wanted to test the limits of basic css. More components means more classes. I couldn't track them properly and therefore wrote the same css instead of reusing it. 
## **Thoughts at the end:**
### Redux:
#### At a certain point i should have used Redux. The code would be a lot cleaner and while creating new components i wouldn't have to worry about passing props down. Fetching data and other functions could be stored in "actions". This would make the code cleaner and easier to maintain. Last point - Storing state. I uploaded this project on Firebase and the state will reset on refresh. Saving all states in localStorage without Redux is a lot of repeated code. In Redux, i could simply have all states in the store and load them on refresh...
### CSS:
#### Giving good names to classes determines the readability. Well, i could still manage it, because i wrote the code, but others might have trouble. Next time, i would either use **SCSS** or **Style.components**. StyledComponents are in the **same file** as the code and the **divs** can be changed to component-style. This adds great readability and since the styling is in the same file, it is easy to find and maintain.

## Things i learned from this project:
* Limits of CSS and alternatives i will use in future projects (SCSS, Styled.Components)
* Got better with grid/flex and responsive design
* Using Redux, if i have to pass too many states from top>bottom
* **Github/Git** using versioncontrol allowed me to try new implementations by having a secure fallback
* Datafetching with dynamic input
* Used ESlint & prettier to somewhat structure my code

## Things i can improve on:
* Git/Github since i worked alone on this project, my comments are lacking. Sometimes i make a lot of changes in different files and comment them briefly all together. Maybe focus more on single files and the changes i made..
* Errorhandling: Well, didn't use it much. Not sure where and when, except when my app crashes, then i somehow try to solve it.
* Using custom hooks. Haven't used them so far, but could be used in some cases. 
* Look for updated libraries. The _Trailer_ and _Cast-Slider_ are outdated and throw some errors. (it works, so i left it^^)
* Taking some time to plan next steps. 


##### Project with create-react-app



