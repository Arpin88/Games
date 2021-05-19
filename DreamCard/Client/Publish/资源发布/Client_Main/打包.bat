@set /p v=请输入版本号:

@set name=
@set name_en=Combat_en

@xcopy .\resource\*  .\copy\resource\  /S /Q /Y
@xcopy .\vers\webver.json  .\copy\resource\  /Q /Y
@xcopy .\resource_en\*  .\copy\resource_en\  /S /Q /Y
echo f|xcopy .\vers\webver_en.json  .\copy\resource_en\webver.json  /Q /Y
@xcopy .\main.min.js  .\copy\  /Q /Y
@xcopy .\manifest.json .\copy\  /Q /Y
@xcopy .\index.html .\copy\  /Q /Y

@set zip=../工具/7z.exe
@set file=./copy/*.*
@set dir=./patch/%v%.zip

@"%zip%" a -r %dir% %file%

@pause