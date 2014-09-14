#hey princess
#here are the 3 steps to generate a signed apk:
#1/ create an unsigned apk.
cordova build --release
#2/ sign it! (information found here: http://developer.android.com/tools/publishing/app-signing.html )
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore mylo.keystore ./platforms/android/ant-build/Mylo-release-unsigned.apk mylo
#3/ align it
zipalign -v 4 ./platforms/android/ant-build/Mylo-release-unsigned.apk mylo-release-signed.apk
