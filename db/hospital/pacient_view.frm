TYPE=VIEW
query=select `p`.`id_pacients` AS `PacientID`,`p`.`first_name` AS `pacient_first_name`,`p`.`last_name` AS `pacient_last_name`,`p`.`allergies` AS `allergies`,`p`.`health_issue` AS `health_issue`,`p`.`health_description` AS `health_description`,`p`.`state` AS `state`,`p`.`ordered_since` AS `ordered_since`,`p`.`ordered_until` AS `ordered_until`,`p`.`practitioner` AS `practitioner`,`a`.`last_name` AS `agent_name`,`a`.`insurance_company_number` AS `insurance_agency_number`,`d`.`last_name` AS `physician_name` from ((`hospital`.`pacients` `p` join `hospital`.`agent` `a` on((`p`.`insurance_agent` = `a`.`id_agent`))) join `hospital`.`doctors` `d` on((`p`.`physician` = `d`.`id_doctors`))) order by `p`.`id_pacients`
md5=0d29988dcb7a0709646adffdd78d605d
updatable=1
algorithm=0
definer_user=root
definer_host=localhost
suid=2
with_check_option=0
timestamp=2020-11-16 11:44:35
create-version=1
source=SELECT p.id_pacients AS PacientID, p.first_name AS pacient_first_name, p.last_name AS pacient_last_name, p.allergies, p.health_issue, p.health_description, p.state, p.ordered_since, p.ordered_until, p.practitioner, a.last_name AS agent_name, a.insurance_company_number AS insurance_agency_number, d.last_name AS physician_name\nFROM pacients AS p\nINNER JOIN agent AS a ON p.insurance_agent = a.id_agent\nINNER JOIN doctors AS d ON p.physician = d.id_doctors\nORDER BY p.id_pacients
client_cs_name=utf8mb4
connection_cl_name=utf8mb4_unicode_ci
view_body_utf8=select `p`.`id_pacients` AS `PacientID`,`p`.`first_name` AS `pacient_first_name`,`p`.`last_name` AS `pacient_last_name`,`p`.`allergies` AS `allergies`,`p`.`health_issue` AS `health_issue`,`p`.`health_description` AS `health_description`,`p`.`state` AS `state`,`p`.`ordered_since` AS `ordered_since`,`p`.`ordered_until` AS `ordered_until`,`p`.`practitioner` AS `practitioner`,`a`.`last_name` AS `agent_name`,`a`.`insurance_company_number` AS `insurance_agency_number`,`d`.`last_name` AS `physician_name` from ((`hospital`.`pacients` `p` join `hospital`.`agent` `a` on((`p`.`insurance_agent` = `a`.`id_agent`))) join `hospital`.`doctors` `d` on((`p`.`physician` = `d`.`id_doctors`))) order by `p`.`id_pacients`
