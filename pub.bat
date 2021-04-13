@echo on
call title Publish pug templates
call echo Publishing pug templates
call pug templates -P -o .\docs\recommendations
call echo %cd%\docs/recommendations\index.html
call echo %cd%\docs
call move /Y %cd%/docs/recommendations\index.html %cd%\docs
call %cd%\docs\index.html