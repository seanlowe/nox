## Table of Contents
- [Organization Structure](#organizational-structure)
- [Modules](#modules)
- [Services](#services)
- [Database / Prisma](#database--prisma)
- [Naming Convention](#naming-convention)

<br>
<br>

### Organizational structure
---
Top level directory structure matches Next.js's starter directory structure created via `npx create-next-app`.

Base modules (modules included with nox) will have their own directory be included in `/components/modules/`. For example, if I had a module named "module1", it should be stored at `/components/modules/module1/`.

Purely layout related components should be stored in `/components/layouts/`. A current example of this is the Banner component. The Banner component is used for exactly that, the headliner that displays the nox status graphic and name on all pages. Another future example could be a sidebar or main content section.

So as to create a clean concise way to extend nox, there will exist an `extensions` directory where users can place custom extensions and accompanying services. Should custom extensions benefit from being included as a base module, work can be completed by a collaborator to integrate said module into nox. See [our collaborate docs](./collaborating-on-nox.md) for more information on how to collaborate.

<br>

### Modules
---
"Modules" are defined as isolated pieces of functionality. Examples of things that would make good modules would be:
- geolocation
- calendars
- messaging

Modules can cooperate but should, by and large, not rely on other modules for their base functionality. If module `A`'s base functionality is mostly dependent on other module `B`, `A` should be considered to be a child of `B` and therefore reside within the same directory.

Example: I have a `messages` module that handles creating messages without human input. Now I want to write a module `emails` to send the message created in `messages` in an email. `emails` should be considered a child of `messages` and should also reside in `/components/modules/messages/`.

<br>

### Services
---
Any logic required by a module's parts should be abstracted to its accompanying service. Component files should not directly make API calls or do complex logic not related to rendering. If it's more than a couple (simple) lines of code, it belongs in a service file.

Example: In a `weather` module, the logic that makes the API call to get the current location's weather data can be stored in a `/services/react/WeatherService` file and the function called directly from the main weather JSX file.

Since Next.js supports api routes, sometimes you need additional functionality to handle a request made to that api route. This more complex logic should also be extracted into a service file. These files can be placed in the `/services/api/` directory

<br>

### Database / Prisma
---
See [prisma notes](./prisma-notes.md) for documentation on how this project utilizes Prisma and manages the database.

<br>

### Naming Convention
---
I have chosen names from mythical beings / stories to summarize each of the modules bundled with nox.

As of right now, here's a list of each module, what they do and where they get their name:

|   Module   |   Purpose   |   Name Inspiration   |
|     ---    |     ---     |        ----          |
| Anemoi | Provide weather updates based on user's current location | The `Anemoi` were lesser weather gods from Greek mythology, often depicted under the management of Aeolus, the keeper of the winds. |
| Freyr | Choose and schedule a week's worth of dinner meals automatically | The name `Freyr` is a less common derivative of the name `Frey`, the Norse god of summer and the harvest. |
| Moirai | Display the status of other associated processes | In Greek mythology, the `Moirai` were more commonly known as The `Fates`, a trio of otherworldly women who were incarnations of destiny. |

<br />
