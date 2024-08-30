# discordjs-ui
NPM Package to have a UI with "routes"


# Routing


## Route types
`ui.js`: The default route  
`gate.js`: Return true to let requests through to the nested folders below, or false to close the gate. (be aware of loops when using navigate())  
`notFound.js`: Will be called when route not found (when multiple nested notFounds, then last will be called)  
`error.js`: Will be called when error occurrs (same behavior as notFound)  
`messageLayout.js`: nested layouts will be nested into each other...  
When message in messageLayout is set to ephemeral, then all messages sent from UIs nested into this layout will send ephemeral messages, if they're not overwritten.  
previous layouts will be sent via context in parameter `messageLayout`  
**Important**  
Nested layouts **won't** completely overwrite each other, they combine. Only things you change, overwrite each other.  
if you want to remove certain properties, set them to null (setting them to undefined will be the same as doing nothing)  
`context.js`: Works like messageLayout.js also propagates down nested routes, contexts will also nest into each other 



