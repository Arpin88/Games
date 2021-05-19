

@echo -------------------- 删除main项目资源
@rd .\client\ /S /Q
@rd .\patch\ /S /Q

@mkdir client 
@mkdir patch

@rd .\Client_Game\Game_xxx\res-xxx\ /S /Q

@echo -------编译main项目
@cd ..\..\Client_Game\Game_xxx
@call .\webPublish.bat

@echo -----------------将main项目 资源放到版本发布目录下
xcopy .\bin-release\web\webVer\main.min.js ..\..\Publish\资源发布\Game_xxx\xxx.js  /S /Y /Q
xcopy .\res-xxx\*.*  ..\..\Publish\资源发布\Game_xxx\res-xxx\ /S /Y /Q


@echo -----------------执行资源发布
@cd ..\..\Publish\资源发布\工具\
xcopy ..\Game_xxx\res-xxx\*.* ..\client\resource\  /S /Y /Q
xcopy ..\Game_xxx\vers\webver.ver ..\client\  /S /Y /Q
xcopy ..\Game_xxx\xxx.js ..\client\tmp\  /S /Y /Q

@call .\publish.bat

@echo -----------------生成版本号json文件
cd ..\..\vertool
xcopy ..\资源发布\Game_xxx\vers\webver.ver .\data\checkver.ver /S /Y /Q
xcopy ..\资源发布\Game_xxx\vers\webver.json .\data\ /S /Y /Q
xcopy ..\资源发布\Game_xxx\vers\addver.json .\data\ /S /Y /Q
xcopy ..\资源发布\client\webver.ver .\data\ /S /Y /Q

@node main.js resource res-xxx

xcopy .\data\webver.json ..\资源发布\Game_xxx\vers\ /S /Y
xcopy .\data\webver.json ..\资源发布\patch\webver\res-xxx\ /S /Y


@echo -----------------备份新生成的版本文件
cd ..\资源发布
copy .\client\webver.ver .\Game_xxx\vers\webver.ver

@echo ------------------将版本发布和资源发布汇总，形成增量包
xcopy .\patch\webver\resource\*.*  .\patch\webver\res-xxx\ /S /Y /Q
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
