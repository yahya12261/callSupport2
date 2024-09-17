personOperation
Person
setup
government
caza
town
status
mngService
mngStatusFlow
administrator
department
positions
rule
users

INSERT INTO `rule`( `arabicLabel`, `type`,`name`) VALUES (DEFAULT, ?, DEFAULT, DEFAULT, DEFAULT, 1, DEFAULT, ?, ?, DEFAULT, ?, ?, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, ?, DEFAULT, DEFAULT) -- PARAMETERS: ["ba56aec3-1cff-4782-bb57-5041fd8d757d","صفحة الخدمات","page","","personOperation",3]
query: SELECT `Rule`.`id` AS `Rule_id`, `Rule`.`uuid` AS `Rule_uuid`, `Rule`.`createdAt` AS `Rule_createdAt`, `Rule`.`updatedAt` AS `Rule_updatedAt`, `Rule`.`deletedAt` AS `Rule_deletedAt`, `Rule`.`version` AS `Rule_version`, `Rule`.`isActive` AS `Rule_isActive`, `Rule`.`isDefault` AS `Rule_isDefault` FROM `rule` `Rule` WHERE (`Rule`.`id` = ? AND `Rule`.`uuid` = ?) AND `Rule`.`deletedAt` IS NULL