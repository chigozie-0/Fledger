# CMPT370_Team40


## Description

FLedger is a shared expense tracking application designed to help users manage and track shared expenses with friends or roommates. The application allows users to create servers, channels, and record transactions for various expense categories. It also includes features like notifications, user account management, and automated bill splitting.

## Installation prerequisites and dependencies:
1. Install Node and watchman with the following:

```
brew install node
brew install watchman
```

2. Install Java Development kit with the following
```
brew tap homebrew/cask-versions
brew install --cask zulu11
```

3. Navigate to the path displayed by the following command
```
brew info --cask zulu11
```

4. Update your JAVA_HOME environment variable. JDK will likely be at /Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home.

5. Download and install Android Studio: https://developer.android.com/studio

6. Install the Android SDK and Dev Tools by navigating to the SDK Manager in Android Studio. The following items will need to be checked:
* Android SDK Platform 33
* Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image
* or (for Apple M1 Silicon) Google APIs ARM 64 v8a System Image
* Android SDK Build tools 33.0.0 (From SDK Tools>Show Package Details>Android SDK Build-Tools)

7. Configure .zshrc file to the following:
```
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home
export ANDROID_SDK_ROOT=~/Library/Android/sdk
export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/tools
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
```

8. Add a new vitrual device to Android Studio
* Go to Tools>Decive Manager
* Select "Create Device"
* Select a phone, Navigate Next
* Choose Tiramisu 33 System Image, Navigate Next
* Select Portriat mode, Navigate Finish

## How to Build and Install the Application: 

1. Run the newly created device by pressing the play button

2. Clone the git repository to new folder with the following command
```
git clone https://git.cs.usask.ca/bmt756/cmpt370_team40.git
```

3. Navigate to the "FLedger" Project Directory and run the following commands
```
npm install
npx react-native start
```

4. Navigate back to device emulator

5. Navigate to the "FLedger" App

## how to use the product:
1.  Create User Account:
* Go to the registration page 
* Enter a unique username and a strong password 
* Click the "Create Account" button
* Directed to the Fledger login page

2.  User Login
* Go to the login page 
* Enter the correct username and password 
* Click the "Login" button
* Directed to the Home Page

3.  Create a Server
* Go to the Home page
* Click the "Add Server" Button
* Directed to the "Create Server" Page
* Enter the Server name and Server type
* Click "Create" Button

4.  Create a Channel for Categorization
* Go to the desired Server Page
* Click the Channel Bar (“General”)
* Click the "Add Channel" button to create a new channel within the server
* Give a name to the channel and choose its category

5.  Search for an Existing Server
* Go to the Home Page
* Click the "Search" Button
* Directed to the "Search Server" Page
* Enter the name of the desired server to the text field
* Click "Search" Button

6.  Join to an Existing Server
* After finding the server that exists
* Click the "Join" Button beside the server name

7.  Create a New Transaction
* On the channel page click "+" button to Create a new Transaction
* Go to the Transaction Input page 
* Enter the following information for that Transaction:
- Payer
- Amount
- Date
 Note
* Assign weights to each participant based on their share of payment (To Split the bill Automatically)
* Click "Done" Button

8.  See Transaction History
* Go to the channel page
* Scroll Up and Down to see different transactions created on the channel

9.  Invite New User to a Server
* Go to the server you want to add a user to
* Select "invite"
* Input username of user you want to add
* Press "Search"
* Press "Add" on the user you want from search result list

## Authors
* Kameron
* Freddie
* Chigozie
* Mehdi
* Farah
* Bristine

