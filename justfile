set shell := ["powershell.exe", "-c"]

build: build-chrome build-firefox

build-chrome:
    if ( Test-Path -Path 'build-chrome' ) { Remove-Item -Recurse 'build-chrome' }
    New-Item -Name 'build-chrome' -ItemType Directory
    Copy-Item -Path '*.js' -Destination 'build-chrome'
    Copy-Item 'manifests/chrome.json' -Destination "build-chrome/manifest.json"

build-firefox:
    if ( Test-Path -Path 'build-firefox' ) { Remove-Item -Recurse 'build-firefox' }
    New-Item -Name 'build-firefox' -ItemType Directory
    Copy-Item -Path '*.js' -Destination 'build-firefox'
    Copy-Item 'manifests/firefox.json' -Destination "build-firefox/manifest.json"

clean:
    if ( Test-Path -Path 'build-chrome' ) { Remove-Item -Recurse 'build-chrome' }
    if ( Test-Path -Path 'build-firefox' ) { Remove-Item -Recurse 'build-firefox' }