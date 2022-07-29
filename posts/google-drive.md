---
title: "Google Drive API with node.js"

about: "any example of how to use the google drive api with node"

socialImage: /images/logo/google_drive.png

date: "2022-01-01"

tags:
  - nextjs
---

# Google Drive Api with node

This project was created to work with Google Drive API. The goal of the project was to update a local file with a folder from google drive. I am sharing this project with the world because it took me longer than I'd like to admit. These steps will be brief and will not go in-depth. The most difficult part was using the API in node js. Setting up the Google Drive API has many tutorials already, but I found nothing on this specific task.

## How To STEPS

#### Set Up API

Once you get all node dependencies, follow this tutorial for setting up your google drive API [here](https://developers.google.com/drive/api/v3/enable-drive-api). Make sure to set up your OAuth screen and enable _ALL Google Drive API scopes_. Once that is complete create your credentials. Download your OAuth keys and save them to a file called `credentials.json`.

#### Getting Token

Now you will need to get your token. First, create an empty file called `token.json`. Then try running the script how it is. You may get an error claiming that it cannot read token.json so make sure to add `{}` inside `token.JSON file`. If that doesn't work, try uncommenting line 71 in `index.js`. This will ignore checking if is already a key.

#### Get Folder Id

Once you get your token you will need to get the file id of the Google Drive folder you are trying to access. To list all available folder names and corresponding Ids, uncomment line 53 and comment outline 50. This will switch from running the main code and displaying all file Ids.

#### Comparing

We are almost there! Now use that file and set it up like this `GDfolderId = 'your folder id here` on line 34. Then set up the file path like this `const local file path = 'C:/your/folder/path/goes/here` on line 37.

#### Done!

The code should check all of your local file names and compare them to the drive file names. Then it will filter out the missing names and use the Google Drive file Id to download the missing files!!!! If you have any issues feel free to contact me!
