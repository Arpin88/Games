

@echo -------------------- ɾ��main��Ŀ��Դ
@rd .\client\ /S /Q
@rd .\patch\ /S /Q

@mkdir client 
@mkdir patch

@echo -------����main��Ŀ
@cd ..\..\Game_Combat
@call .\webPublish.bat

@echo -----------------��main��Ŀ ��Դ�ŵ��汾����Ŀ¼��
@echo off
@cd .\bin-release\web\webVer
for /r %%i in (*.js) do (
	echo %%~ni | findstr -m "main" >nul && set nm=%%~ni
)

cd ..\..\..
echo f|xcopy .\bin-release\web\webVer\js\%nm%.js ..\Publish\��Դ����\Game_Combat\Combat.js  /S /Y /Q
xcopy .\res-Combat\*.*  ..\Publish\��Դ����\Game_Combat\res-Combat\ /S /Y /Q


@echo -----------------ִ����Դ����
@cd ..\Publish\��Դ����\����\
xcopy ..\Game_Combat\res-Combat\*.* ..\client\resource\  /S /Y /Q
xcopy ..\Game_Combat\vers\webver.ver ..\client\  /S /Y /Q
xcopy ..\Game_Combat\Combat.js ..\client\tmp\  /S /Y /Q

@call .\publish.bat

@echo -----------------���ɰ汾��json�ļ�
cd ..\..\vertool
xcopy ..\��Դ����\Game_Combat\vers\webver.ver .\data\checkver.ver /S /Y /Q
xcopy ..\��Դ����\Game_Combat\vers\webver.json .\data\ /S /Y /Q
xcopy ..\��Դ����\Game_Combat\vers\addver.json .\data\ /S /Y /Q
xcopy ..\��Դ����\client\webver.ver .\data\ /S /Y /Q

@node main.js resource res-Combat

xcopy .\data\webver.json ..\��Դ����\Game_Combat\vers\ /S /Y
xcopy .\data\webver.json ..\��Դ����\patch\webver\res-Combat\ /S /Y


@echo -----------------���������ɵİ汾�ļ�
cd ..\��Դ����
copy .\client\webver.ver .\Game_Combat\vers\webver.ver

@echo ------------------���汾��������Դ�������ܣ��γ�������
xcopy .\patch\webver\resource\*.*  .\patch\webver\res-Combat\ /S /Y /Q
rd .\patch\webver\resource /S /Q
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
