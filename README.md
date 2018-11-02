# PhoneGap Demo - 02.11.2018

### At the same time one can edit master branch
To avoid conflicts team should discuss which functionality one does (or use diffmerge to solve conflicts)

## Some notes

### START
- if developer environment is set correctly run app to android device with
	- cordova run android
- to debug open chrome
	- chrome://inspect
		- console for errors & css + html for layout modifications
		- in console there is also possible to run method calls

### APP PERMISSIONS
- after first build app won't add permissions to Microphone, change this in Android - apps - permissions (as instructed in class)

### IN INDEX.HTML
- CHANGE
	- <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">
-TO
	- <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">
- This allows inline js to be executed

### REMEMBER TO MODIFY CSS FILE AS YOU LIKE

### IF YOU WISH TO LOCK SCREEN ORIENTATION
- in config.xml (in the root)
	- add this line inside widget (this is already added)
    <preference name="Orientation" value="portrait" />

