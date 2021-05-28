Lessons learned

- debugging
    - forgot about more valuable debuggers until a couple days ago 
        - just forgot due to being away from RN 
        - was just using Metro
    - would most likely avoid Expo all together or go straight to bare workflow for access to Flipper

- animation
    - went down a rabbit hole of trying to learn animations
        - realized that RN Reanimated 2 doesn’t play nice with extensions/debuggers
            - was getting weird cryptic errors here and there due to it
        - realized this after installing, setting up and implementing
            - remote JS debugging and RN Debugger dont work with it installed

- Redux
    - shouldve normalized redux state with something like Normalizr or the built in Redux Toolkit functions
    - shouldve initially used something like Redux thunk to manage async calls
        - while I know redux quite well, I have typically used useContext in the past 
        - now recently have been coming back and more frequently using @redux/toolkit and it’s built in methods

- file structure
    - experimented with global file structure, with Babel and tsconfig,  by using path/module aliases (ie @components, @icons, etc)
        - ended up leading to my code editor frequently making errors when linking functions between files
            - seems it’s Typescript that gets confused by this
            - It’s super convenient for refactoring, need to figure out best solution for this
        - also got far more circular require warnings using this method (which makes sense)

- UI
    - shouldve gone with non template components
    - shouldve just used own style

- ***
    - shouldve tried less new technology with such a simple example and just gone with vanilla react
