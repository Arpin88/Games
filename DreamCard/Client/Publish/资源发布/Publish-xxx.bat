

@echo -------------------- ɾ��main��Ŀ��Դ
@rd .\client\ /S /Q
@rd .\patch\ /S /Q

@mkdir client 
@mkdir patch

@rd .\Client_Game\Game_xxx\res-xxx\ /S /Q

@echo -------����main��Ŀ
@cd ..\..\Client_Game\Game_xxx
@call .\webPublish.bat

@echo -----------------��main��Ŀ ��Դ�ŵ��汾����Ŀ¼��
xcopy .\bin-release\web\webVer\main.min.js ..\..\Publish\��Դ����\Game_xxx\xxx.js  /S /Y /Q
xcopy .\res-xxx\*.*  ..\..\Publish\��Դ����\Game_xxx\res-xxx\ /S /Y /Q


@echo -----------------ִ����Դ����
@cd ..\..\Publish\��Դ����\����\
xcopy ..\Game_xxx\res-xxx\*.* ..\client\resource\  /S /Y /Q
xcopy ..\Game_xxx\vers\webver.ver ..\client\  /S /Y /Q
xcopy ..\Game_xxx\xxx.js ..\client\tmp\  /S /Y /Q

@call .\publish.bat

@echo -----------------���ɰ汾��json�ļ�
cd ..\..\vertool
xcopy ..\��Դ����\Game_xxx\vers\webver.ver .\data\checkver.ver /S /Y /Q
xcopy ..\��Դ����\Game_xxx\vers\webver.json .\data\ /S /Y /Q
xcopy ..\��Դ����\Game_xxx\vers\addver.json .\data\ /S /Y /Q
xcopy ..\��Դ����\client\webver.ver .\data\ /S /Y /Q

@node main.js resource res-xxx

xcopy .\data\webver.json ..\��Դ����\Game_xxx\vers\ /S /Y
xcopy .\data\webver.json ..\��Դ����\patch\webver\res-xxx\ /S /Y


@echo -----------------���������ɵİ汾�ļ�
cd ..\��Դ����
copy .\client\webver.ver .\Game_xxx\vers\webver.ver

@echo ------------------���汾��������Դ�������ܣ��γ�������
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
cd .\����
@call .\7zZip.bat

@echo ------------------ ���

@pause
