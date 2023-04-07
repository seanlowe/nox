## Table of Contents
- [Organization Structure](#organizational-structure)
- [Modules](#modules)
- [Services](#services)
- [Database / Prisma](#database--prisma)
- [Naming Convention](#naming-convention)
<br></br>

### Organizational structure
---
Backend code will nested within the `noxd/` directory at the top level of the project and will be following a slightly different organizational structure due to the way Golang works. See [Golang organizational structure](./golang/organizational-structure.md) for more information.

Frontend code will be nested with the `src/` directory at the top level of the project. This directory follows Next.js's starter directory structure created via `npx create-next-app`. For more information on organizational structure for the frontend application, see the [JS organizational structure](./js/organizational-structure.md) doc.

Base modules (modules included with nox) will have their own directory be included in `/components/modules/`. For example, if I had a module named "module1", it should be stored at `/components/modules/module1/`.

So as to create a clean and concise way to extend nox, there will exist an `extensions` directory in both the frontend application `src/` and the backend application `noxd/` where users can place custom extensions and accompanying services. 

Should custom extensions benefit from being included as a base module, work can be completed by a collaborator to integrate said module into nox. See [our collaboration docs](./collaborating-on-nox.md) for more information on how to collaborate.
<br></br>

### Modules
---
"Modules" are defined as isolated pieces of functionality. Examples of things that would make good modules would be:
- geolocation
- calendars
- messaging

Modules can cooperate but should, by and large, not rely on other modules for their base functionality. If module `B`'s base functionality is mostly dependent on other module `A`, `B` should be considered to be a child of `A` and therefore reside within the same directory.

**Example:** I have a frontend module called `messages` that handles showing all messages sent or received, regardless of type. Now I want to write a module `emails` to specifically handle viewing email messages. `emails` should be considered a child of `messages` and should also reside in `/components/modules/messages/`.
<br></br>

### Services
---
Any logic required by a module's parts should be abstracted to its accompanying service. Component files should not directly make API calls or do complex logic not related to rendering. If it's more than a couple (simple) lines of code, it belongs in a service file.

Example: In a `weather` module, the logic that makes the API call to get the current location's weather data can be stored in a `/services/WeatherService` file and the function called directly from the main weather JSX file.

External API calls should be handled by the backend process, which means that any API call from the frontend is exclusively pointed towards a backend endpoint. This separates the responsibilities of the frontend and backend into clear categories which makes it easier to understand where exactly something may be going wrong.
<br></br>

### Database / Prisma
---
See [prisma notes](./db/prisma-notes.md) for documentation on how this project utilizes Prisma and manages the database.
<br></br>

### Naming Convention
---
I have chosen names from mythical beings / stories to summarize each of the modules bundled with nox.

As of right now, here's a list of each module, what they do and where they get their name:

|   Module   |   Purpose   |   Name Inspiration   |
|     ---    |     ---     |        ----          |
| Anemoi | Provide weather updates based on user's current location | The `Anemoi` were lesser weather gods from Greek mythology, often depicted under the management of Aeolus, the keeper of the winds. |
| Freyr | Choose and schedule a week's worth of dinner meals automatically | The name `Freyr` is a less common derivative of the name `Frey`, the Norse god of summer and the harvest. |
| Moirai | Display the status of other associated processes | In Greek mythology, the `Moirai` were more commonly known as `The Fates`, a trio of otherworldly women who were incarnations of destiny. |

<br />
