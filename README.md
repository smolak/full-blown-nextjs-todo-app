# TODO app made (not) simple

## Some info

This is not complete, has missing parts (like proper validation). Made for fun.

## Running

Due to how I implemented a naive local in-memory "DB" and how APIs are run locally (compiled on demand), the easiest way to mitigate the problem with data stored in the DB not being available for each endpoint's first call (consecutive are working) is to: 

 - do `npm run build` and `npm run start` (that will make sure all APIs are compiled and reference same file and place in memory from the very first call)
 - in `npm run dev` - run cold start (e.g. PING) for each endpoint - that will trigger compilation etc.
   - I have prepared and endpoint just for that (it simply does a HEAD http request for those endpoints): `/todo/tasks/ping-endpoints`
     - I have added a call in `todo.tsx` (page) that does just that
 - replace (my job) the DB with some external entity and not codebase runtime memory.
