@echo on
call title Publish pug templates
call echo Publishing pug templates
call pug templates -P -o .\docs\recommendations
@echo off
call echo %cd%\docs/recommendations\index.html
call echo %cd%\docs
call move /Y %cd%/docs/recommendations\index.html %cd%\docs
call move /Y %cd%/docs/recommendations\about.html %cd%\docs
call move /Y %cd%/docs/recommendations\families.html %cd%\docs\best-games
call move /Y %cd%/docs/recommendations\2-players.html %cd%\docs\best-games
call move /Y %cd%/docs/recommendations\new-players.html %cd%\docs\best-games
call %cd%\docs\index.html