

@echo -------------------- ɾ��main��Ŀ��Դ
@rd .\client\ /S /Q
@rd .\patch\ /S /Q

@mkdir client 
@mkdir patch

@rd .\Client_Main\resource\ /S /Q

@echo -------����main��Ŀ
@cd ..\..\Client_Main
@call .\bCopyResource.bat
@call .\webPublish.bat

@echo -----------------��main��Ŀ ��Դ�ŵ��汾����Ŀ¼��

@echo off
@cd .\bin-release\web\webVer
for /r %%i in (*.js) do (
	echo %%~ni | findstr -m "main" >nul && set nm=%%~ni
)

cd ..\..\..
@copy .\bin-release\web\webVer\js\%nm%.js ..\Publish\��Դ����\Client_Main\main.min.js  /Y 
xcopy .\resource\*.* ..\Publish\��Դ����\Client_Main\resource\ /S /Y /Q

@echo -----------------ִ����Դ����
@cd ..\Publish\��Դ����\����\
xcopy ..\Client_Main\libs\*.* ..\client\tmp\libs\  /S /Y /Q
xcopy ..\Client_Main\resource\*.* ..\client\resource\  /S /Y /Q
xcopy ..\Client_Main\vers\webver.ver ..\client\  /S /Y
xcopy ..\Client_Main\index.html ..\client\tmp\  /S /Y
xcopy ..\Client_Main\manifest.json ..\client\tmp\  /S /Y
xcopy ..\Client_Main\main.min.js ..\client\tmp\  /S /Y
copy ..\Client_Main\gameconfig.json ..\client\resource\config\  /Y

@call .\publish.bat

@echo -----------------���ɰ汾��json�ļ�
cd ..\..\vertool
xcopy ..\��Դ����\Client_Main\vers\webver.ver .\data\checkver.ver /S /Y /Q
xcopy ..\��Դ����\Client_Main\vers\webver.json .\data\ /S /Y /Q
xcopy ..\��Դ����\Client_Main\vers\addver.json .\data\ /S /Y /Q
xcopy ..\��Դ����\client\webver.ver .\data\ /S /Y /Q

@call .\run.bat
xcopy .\data\webver.json ..\��Դ����\Client_Main\vers\ /S /Y
xcopy .\data\webver.json ..\��Դ����\patch\webver\ /S /Y


@echo -----------------���������ɵİ汾�ļ�
cd ..\��Դ����
copy .\client\webver.ver .\Client_Main\vers\webver.ver

@echo ------------------���汾��������Դ�������ܣ��γ�������
del .\patch\webver\webver.ver
del .\patch\webver\webver.ver.ver
del .\patch\webver\webver.ver.zip
del .\patch\webver.zip

if not exist .\patch\webver\tmp goto zipweb
xcopy .\patch\webver\tmp\*.* .\patch\webver\  /S /Y
rd .\patch\webver\tmp\ /S /Q

:zipweb
cd .\����
@call .\7zZip.bat

@echo ------------------ ���

@pause
