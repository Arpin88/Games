


@echo ---------------------�ϲ������,���������汾����Ŀ¼
@cd ..\..\publish\libstool
@call .\run.bat

@rd ..\��Դ����\Client_Main\libs\ /S /Q
xcopy .\core.js ..\��Դ����\Client_Main\libs\  /S /Y
xcopy .\libs\my\*.* ..\��Դ����\Client_Main\libs\my\  /S /Y

@pause
