## Organizational Structure for Golang Packages and Logic

Due to the way golang packages work, each package is fairly self-contained, similar to the approach described in the JavaScript FS structure described in other docs.

```
src/
├── controllers/
│   ├── packageName/
│   │   ├── <packageName>.go
│   │   ├── <packageName>Model.go
│   │   └── <packageName>Service.go
│   └── ...potentially many controllers
├── extensions/
├── globals/
├── helpers/
├── routes/
├── go.mod
├── go.sum
└── noxd.go <-- entry point
```

Breaking down the above graph:

### `/controllers`
<details>
  <summary> Expand </summary>
  This is the top level directory that holds each of the separate packages (or modules). 

  #### `/components/packageName/`
  Each package is in a separate folder with a matching name and generally has 3 files, but could have more if necessary.

  ##### `/components/packageName/<packageName>.go`
  > This file is the true controller of the module. This is where the handler functions for any HTTP requests enter. To keep code properly separated, one would write a function here to do all the high-level handling of an HTTT request. Any more specific logic (DB access, API calls, etc) would be extracted to a service file in the same directory.

  ##### `/components/packageName/<packageName>Model.go`
  > Because nox's Golang backend uses upper/db as its database access library, the model file acts as a repository of types and structs needed by any other file in the package. Package-wide global variables would also be a great candidate for placing within this file.

  ##### `/components/packageName/<packageName>Service.go`
  > Any logic that is not directly related to recieving or returning a request or a response should be located here. This could include API calls or database access for querying or insertion.
</details>
<br></br>

### `/extensions`

### `/globals`
### `/helpers`
### `/routes`

