

@echo -------------------- 删除main项目资源
@rd .\client\ /S /Q
@rd .\patch\ /S /Q

@mkdir client 
@mkdir patch

@echo -------编译main项目
@cd ..\..\Game_Combat
@call .\webPublish.bat

@echo -----------------将main项目 资源放到版本发布目录下
@echo off
@cd .\bin-release\web\webVer
for /r %%i in (*.js) do (
	echo %%~ni | findstr -m "main" >nul && set nm=%%~ni
)

cd ..\..\..
echo f|xcopy .\bin-release\web\webVer\js\%nm%.js ..\Publish\资源发布\Game_Combat\Combat.js  /S /Y /Q
xcopy .\res-Combat_en\*.*  ..\Publish\资源发布\Game_Combat\res-Combat_en\ /S /Y /Q


@echo -----------------执行资源发布
@cd ..\Publish\资源发布\工具\
xcopy ..\Game_Combat\res-Combat_en\*.* ..\client\resource\  /S /Y /Q
echo f|xcopy ..\Game_Combat\vers\webver_en.ver ..\client\webver.ver  /S /Y /Q
xcopy ..\Game_Combat\Combat.js ..\client\tmp\  /S /Y /Q

@call .\publish.bat

@echo -----------------生成版本号json文件
cd ..\..\vertool
echo f|xcopy ..\资源发布\Game_Combat\vers\webver_en.ver .\data\checkver.ver /S /Y /Q
echo f|xcopy ..\资源发布\Game_Combat\vers\webver_en.json .\data\webver.json /S /Y /Q
echo f|xcopy ..\资源发布\Game_Combat\vers\addver_en.json .\data\addver.json /S /Y /Q
xcopy ..\资源发布\client\webver.ver .\data\ /S /Y /Q

@node main.js resource res-Combat_en

echo f|xcopy .\data\webver.json ..\资源发布\Game_Combat\vers\webver_en.json /S /Y
echo f|xcopy .\data\webver.json ..\资源发布\patch\webver\res-Combat_en\webver.json /S /Y


@echo -----------------备份新生成的版本文件
cd ..\资源发布
echo f|copy .\client\webver.ver .\Game_Combat\vers\webver_en.ver

@echo ------------------将版本发布和资源发布汇总，形成增量包
xcopy .\patch\webver\resource\*.*  .\patch\webver\res-Combat_en\ /S /Y /Q
rd .\patch\webver\resource /S /Q
del .\patch\webver\webver.ver
del .\patch\webver\webver.ver.ver
del .\patch\webver\webver.ver.zip
del .\patch\webver.zip


if not exist .\patch\webver\tmp goto zipweb
xcopy .\patch\webver\tmp\*.* .\patch\webver\  /S /Y
rd .\patch\webver\tmp\ /S /Q

:zipweb
cd .\工具
@call .\7zZip.bat

@echo ------------------ 完成

@pause
