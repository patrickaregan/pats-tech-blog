-- To seed the database:
-- 1. Login to mysql as root and source the schema.sql file.
-- 2. In mysql as root run "CREATE USER IF NOT EXISTS '<appaccount>'@'localhost' IDENTIFIED BY '<password>';"
-- 3. In mysql aw root run "GRANT ALL ON <dbname>.* TO '<appaccount>'@'localhost';"
-- 4. Exit out of mysql and log back in as the <appaccount> user.
-- 5. In vscode make sure force is set to true in server.js file.
-- 6. In vscode run "npm start" to start the application. This will drop and re-create all the tables.
-- 7. In mysql source the seed.sql file (this file).
-- 8. In vscode change force back to false in server.js file.

USE pats_tech_blog_db;

INSERT INTO user (username, password) VALUES ('gwashington', 'firstprez');
INSERT INTO user (username, password) VALUES ('jadams', 'secondprez');
SELECT * FROM user;

