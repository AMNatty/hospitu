TYPE=VIEW
query=select `d`.`id_doctors` AS `DoctorID`,`d`.`first_name` AS `first_name`,`d`.`last_name` AS `last_name`,`h`.`since` AS `works_since`,`h`.`until` AS `works_until`,`de`.`name` AS `workplace`,count(`p`.`physician`) AS `number_of_pacients` from (((`hospital`.`doctors` `d` join `hospital`.`hours` `h` on((`d`.`work_hours` = `h`.`id_hours`))) join `hospital`.`department` `de` on((`d`.`department_number` = `de`.`id_department`))) join `hospital`.`pacients` `p` on((`d`.`id_doctors` = `p`.`physician`))) group by `d`.`last_name`,`p`.`physician` order by `d`.`id_doctors`
md5=162468a1465706302458935197ac4d5c
updatable=0
algorithm=0
definer_user=root
definer_host=localhost
suid=2
with_check_option=0
timestamp=2020-11-16 11:56:09
create-version=1
source=SELECT d.id_doctors AS DoctorID, d.first_name, d.last_name, h.since AS works_since, h.until AS works_until, de.name AS workplace, COUNT(p.physician) AS number_of_pacients\nFROM doctors AS d\nINNER JOIN hours AS h ON d.work_hours = h.id_hours\nINNER JOIN department AS de ON d.department_number = de.id_department\nINNER JOIN pacients AS p ON d.id_doctors = p.physician\nGROUP BY d.last_name, p.physician\nORDER BY d.id_doctors
client_cs_name=utf8mb4
connection_cl_name=utf8mb4_unicode_ci
view_body_utf8=select `d`.`id_doctors` AS `DoctorID`,`d`.`first_name` AS `first_name`,`d`.`last_name` AS `last_name`,`h`.`since` AS `works_since`,`h`.`until` AS `works_until`,`de`.`name` AS `workplace`,count(`p`.`physician`) AS `number_of_pacients` from (((`hospital`.`doctors` `d` join `hospital`.`hours` `h` on((`d`.`work_hours` = `h`.`id_hours`))) join `hospital`.`department` `de` on((`d`.`department_number` = `de`.`id_department`))) join `hospital`.`pacients` `p` on((`d`.`id_doctors` = `p`.`physician`))) group by `d`.`last_name`,`p`.`physician` order by `d`.`id_doctors`
