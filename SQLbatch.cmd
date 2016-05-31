echo Creating SQL database

sqlcmd -E -S (localdb)\v11.0 -i %__CD__%SQLCreateDb.sql

