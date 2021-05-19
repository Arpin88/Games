@set /p v=请输入版本号:

@set name=Combat
@set name_en=Combat_en

@xcopy .\res-%name%\*  .\copy\res-%name%\  /S /Q /Y
@xcopy .\vers\webver.json  .\copy\res-%name%\  /Q /Y
@xcopy .\res-%name_en%\*  .\copy\res-%name_en%\  /S /Q /Y
echo f|xcopy .\vers\webver_en.json  .\copy\res-%name_en%\webver.json  /Q /Y
@xcopy .\%name%.js  .\copy\  /Q /Y

@set zip=../工具/7z.exe
@set file=./copy/*.*
@set dir=./patch/%v%.zip

@"%zip%" a -r %dir% %file%

@pause