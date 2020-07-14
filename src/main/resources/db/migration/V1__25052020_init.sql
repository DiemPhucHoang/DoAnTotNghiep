CREATE TABLE `users` (
  `id_user` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `UKdu5v5sr43g5bfnji4vb8hg5s3` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `roles` (
  `id_role` bigint NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_role` (
  `id_user` bigint NOT NULL,
  `id_role` bigint NOT NULL,
  PRIMARY KEY (`id_user`,`id_role`),
  KEY `FK2yqlxhjhgilevh7qvt2ve6udh` (`id_role`),
  CONSTRAINT `FK2yqlxhjhgilevh7qvt2ve6udh` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_role`),
  CONSTRAINT `FKr53t650tbjk5yipcm228wf1nc` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tutors` (
  `id_tutor` bigint NOT NULL AUTO_INCREMENT,
  `gender` varchar(11) NOT NULL,
  `year_of_birth` varchar(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `major` varchar(255) NOT NULL,
  `college` varchar(255) NOT NULL,
  `graduation_year` varchar(11) NOT NULL,
  `more_info` longtext,
  `level` varchar(255) NOT NULL,
  `salary_per_hour` double NOT NULL,
  `status` varchar(255) NOT NULL,
  `id_user` bigint DEFAULT NULL,
  PRIMARY KEY (`id_tutor`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `tutors_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `subjects` (
  `id_subject` bigint NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id_subject`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `districts` (
  `id_district` bigint NOT NULL AUTO_INCREMENT,
  `district_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id_district`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tutor_subject` (
  `id_tutor` bigint NOT NULL,
  `id_subject` bigint NOT NULL,
  PRIMARY KEY (`id_tutor`,`id_subject`),
  KEY `FK1mcj7wubbpbeuqesf84edt5x8` (`id_subject`),
  CONSTRAINT `FK1mcj7wubbpbeuqesf84edt5x8` FOREIGN KEY (`id_subject`) REFERENCES `subjects` (`id_subject`),
  CONSTRAINT `FKhgy4ivf295dbbwt3203cpx0u8` FOREIGN KEY (`id_tutor`) REFERENCES `tutors` (`id_tutor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `free_time` (
  `id_free_time` bigint NOT NULL AUTO_INCREMENT,
  `afternoon` bit(1) NOT NULL,
  `day_name` varchar(50) NOT NULL,
  `evening` bit(1) NOT NULL,
  `morning` bit(1) NOT NULL,
  PRIMARY KEY (`id_free_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `class_teach` (
  `id_class_teach` bigint NOT NULL AUTO_INCREMENT,
  `class_teach_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id_class_teach`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `tutor_free_time` (
  `id_tutor` bigint NOT NULL,
  `id_free_time` bigint NOT NULL,
  PRIMARY KEY (`id_tutor`,`id_free_time`),
  KEY `FK87emhdfd93yl1ywi835mkqkdt` (`id_free_time`),
  CONSTRAINT `FK87emhdfd93yl1ywi835mkqkdt` FOREIGN KEY (`id_free_time`) REFERENCES `free_time` (`id_free_time`),
  CONSTRAINT `FKc1ljhcwm75nt2baiiow4xx08p` FOREIGN KEY (`id_tutor`) REFERENCES `tutors` (`id_tutor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tutor_district` (
  `id_tutor` bigint NOT NULL,
  `id_district` bigint NOT NULL,
  PRIMARY KEY (`id_tutor`,`id_district`),
  KEY `FKjp1qu9jbit4em3ujofsnd9sdv` (`id_district`),
  CONSTRAINT `FKfj53yiiff8wkt9eu2yiw6wb1c` FOREIGN KEY (`id_tutor`) REFERENCES `tutors` (`id_tutor`),
  CONSTRAINT `FKjp1qu9jbit4em3ujofsnd9sdv` FOREIGN KEY (`id_district`) REFERENCES `districts` (`id_district`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tutor_class_teach` (
  `id_tutor` bigint NOT NULL,
  `id_class_teach` bigint NOT NULL,
  PRIMARY KEY (`id_tutor`,`id_class_teach`),
  KEY `FKnurmca5j2opax1tpk96xgl7jf` (`id_class_teach`),
  CONSTRAINT `FKddbqum96wg0fviwhnyladuchj` FOREIGN KEY (`id_tutor`) REFERENCES `tutors` (`id_tutor`),
  CONSTRAINT `FKnurmca5j2opax1tpk96xgl7jf` FOREIGN KEY (`id_class_teach`) REFERENCES `class_teach` (`id_class_teach`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `classes` (
  `id_class` bigint NOT NULL AUTO_INCREMENT,
  `class_teach` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `level_requirement` varchar(255) DEFAULT NULL,
  `gender_requirement` varchar(255) DEFAULT NULL,
  `district` varchar(255) NOT NULL,
  `time_teach` varchar(255) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `tuition_fee` double NOT NULL,
  `status` varchar(255) NOT NULL,
  `id_parent` bigint DEFAULT NULL,
  PRIMARY KEY (`id_class`),
  KEY `id_parent` (`id_parent`),
  CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`id_parent`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `parent_register_tutor` (
  `id_parent` bigint NOT NULL,
  `id_tutor` bigint NOT NULL,
  `id_class` bigint DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_parent`,`id_tutor`),
  KEY `id_tutor` (`id_tutor`),
  KEY `id_class` (`id_class`),
  CONSTRAINT `parent_register_tutor_ibfk_1` FOREIGN KEY (`id_parent`) REFERENCES `users` (`id_user`),
  CONSTRAINT `parent_register_tutor_ibfk_2` FOREIGN KEY (`id_tutor`) REFERENCES `tutors` (`id_tutor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tutor_register_class` (
  `id_register` bigint NOT NULL AUTO_INCREMENT,
  `date_receive` datetime DEFAULT NULL,
  `more_require` longtext,
  `payment` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `id_class` bigint DEFAULT NULL,
  `id_tutor` bigint DEFAULT NULL,
  PRIMARY KEY (`id_register`),
  KEY `id_class` (`id_class`),
  KEY `id_tutor` (`id_tutor`),
  CONSTRAINT `tutor_register_class_ibfk_1` FOREIGN KEY (`id_class`) REFERENCES `classes` (`id_class`),
  CONSTRAINT `tutor_register_class_ibfk_2` FOREIGN KEY (`id_tutor`) REFERENCES `tutors` (`id_tutor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `invoice` (
  `id_invoice` bigint NOT NULL,
  `id_register` bigint DEFAULT NULL,
  `service_fee` double DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id_invoice`),
  KEY `id_register` (`id_register`),
  CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`id_register`) REFERENCES `tutor_register_class` (`id_register`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;