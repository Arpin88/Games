


@echo ---------------------合并库代码,并拷贝至版本发布目录
@cd ..\..\publish\libstool
@call .\run.bat

@rd ..\资源发布\Client_Main\libs\ /S /Q
xcopy .\core.js ..\资源发布\Client_Main\libs\  /S /Y
xcopy .\libs\my\*.* ..\资源发布\Client_Main\libs\my\  /S /Y

@pause
