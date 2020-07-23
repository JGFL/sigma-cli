## SIGMA CLI

Command            | Alias | Description
-------------------|-------|---------------------------------
generate:component | g:c   | Create React/React Native/Expo component
generate:page      | g:p   | Create React/React Native/Expo page
--init             | -i    | Configure Sigma for existing project
--generate         | -g    | Create project with sigma template

> **Adding Sigma to existing project**
> ```bash
>   sigma --init
> ```
> or
> ```bash
>   sigma --i
> ```
> Use this command to create .sigmaconfig.json

> **Create project with Sigma**
> ```bash
>   sigma --generate
> ```
> or
> ```bash
>   sigma --g
> ```
> Use this command to create a React project with sigma
> * React Native and Expo will added in future
> * This command not execute ```npm install``` you need to run  ```npm install``` or  ```yarn```
> * Recomended to execute  ```npm update``` or  ```yarn upgrade``` after install

> **Createing component or page**
>
> For component
> ```bash
>   sigma generate:component <componentName>
> ```
> or
> ```bash
>   sigma g:c <componentName>
> ```
> Use this to create a React/React Native/Expo component(default path "/src/components")
> 
> For page
> ```bash
>   sigma generate:page <componentName>
> ```
> or
> ```bash
>   sigma g:p <componentName>
> ```
> Use this to create a React/React Native/Expo page(default path "/src/pages")

> If component or page name contains "/", sigma will detect that is the path to component or page
> e.g.:
> ```bash
>   sigma generate:component TodoList/TodoItem
> ```
> Sigma will generate the "TodoItem" inside "TodoList" folder