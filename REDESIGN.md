# A "QUICK" REDESIGN

After I finish the beta, whatever the beta is, I want to redesign it very thoroughly.  

The current design is alright, but I'm not going to wow people with it. I want people to be wowed by it. 

It would be easy enough to just use bootstrap, or tailwind, but I want character in my creation.

There are a few things to note before I go in, however. A lot of the jank and the responsiveness in the design is constrained by what I have. Specifically the pdf reader does not appear "immediately" due to the fact it has to load on whatever pdfjs express is doing with my ref.

## Course Creation

Course creation is a problem. I can either create it in batch, or I can allow to use to "edit" or dynamically create it. If they do it that way, I send updates to the server on what they're doing, so if they mistake something or update something, it's another request. When they upload a textbook, they upload it. 

It's heavy load on the server just for creation, which I don't know if I can/can't afford.

I think I'll stick with batch creation in the beginning. For now, I can scrutinize how things are created in batch instead.

The creation uses modal forms for the user to enter it in. This is easy to implement for me, and I reused code from a different project so I'm proud, but it's not "quick".

... 

Me from the future, I'll move onto dynamic creation. It's just more CRUD operations, it's nothing heavy. 


