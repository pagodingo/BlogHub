# refactor

we have a currentDirectory structure.
we have a path structure.

the path is a string
the directory is an array

we want to build a new path structure whenever we move to a different directory,
    by joining the currentDirectory.

the path is a string passed to our get requests.
the directory is used to build our path. (path)

we use our directory structure to

We'll have a Request struct, that provides two methods: meta() and raw()

both functions return some value.

https://www.pluralsight.com/guides/process-an-api-response-in-react

https://stackoverflow.com/questions/49500379/typical-file-structure-in-reactjs-application-grouping-api-calls-in-api-js

Maybe this is the only way to implement folders:

No scrolling between folders. So, you can only move in one direction, and when you want to go back
you have to go all the way back to the root.

keep only directory in state. Let "path" be something that emerges out of whatever function calls this.state.diretory.

const someFunction(){
    let path=  this.state.directory
}
