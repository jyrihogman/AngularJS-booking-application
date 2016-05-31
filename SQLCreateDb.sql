if (DB_ID ('CalendarProject') IS NULL)
		CREATE DATABASE CalendarProject
go

BEGIN TRY
	BEGIN TRAN

	USE CalendarProject

	CREATE TABLE dbo.RESERVATION (
	ID INT NOT NULL IDENTITY (1,1),
	TIME CHAR(5) NOT NULL,
	DATE CHAR(10) NOT NULL,
	RESERVED BIT NOT NULL DEFAULT 0,
	EMAIL VARCHAR(30),
	FIRSTNAME VARCHAR(30),
	LASTNAME VARCHAR(30)
	CONSTRAINT PK_ID PRIMARY KEY (ID)
	)


	insert into dbo.reservation (time, date )
	VALUES ( '15:00', '2016-06-01'),
	('12:00', '2016-06-01'),
	('17:00', '2016-06-01'),
	('15:00', '2016-06-02'),
	('17:00', '2016-06-02'),
	('15:00', '2016-06-03'),
	('17:00', '2016-06-03'),
	('19:00', '2016-06-03'),
	('15:00', '2016-06-04'),
	('17:00', '2016-06-04'),
	('19:00', '2016-06-04'),
	('15:00', '2016-06-05'),
	('17:00', '2016-06-05'),
	('19:00', '2016-06-05'),
	('15:00', '2016-06-06'),
	('17:00', '2016-06-06'),
	('19:00', '2016-06-06'),
	('15:00', '2016-06-07'),
	('17:00', '2016-06-07'),
	('19:00', '2016-06-07'),
	('15:00', '2016-06-08'),
	('17:00', '2016-06-08'),
	('19:00', '2016-06-08'),
	('15:00', '2016-06-09'),
	('17:00', '2016-06-09'),
	('19:00', '2016-06-09'),
	('15:00', '2016-06-10'),
	('17:00', '2016-06-10'),
	('19:00', '2016-06-10')

	COMMIT
	PRINT 'Creation successful'
END TRY
BEGIN CATCH
	ROLLBACK
	PRINT 'Creation failed'
END CATCH
GO