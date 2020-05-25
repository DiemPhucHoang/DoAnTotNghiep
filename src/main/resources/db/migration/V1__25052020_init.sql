CREATE TABLE `users` (
  `id_user` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `UKdu5v5sr43g5bfnji4vb8hg5s3` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `roles` (
  `id_role` bigint NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_role`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `college` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `graduation_year` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `level` varchar(255) NOT NULL,
  `major` varchar(255) NOT NULL,
  `more_info` longtext,
  `status` varchar(255) NOT NULL,
  `year_of_birth` varchar(255) NOT NULL,
  `id_user` bigint DEFAULT NULL,
  PRIMARY KEY (`id_tutor`),
  KEY `FK9b22mv62w83nmvc2g3toetsg` (`id_user`),
  CONSTRAINT `FK9b22mv62w83nmvc2g3toetsg` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
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
  `address` varchar(255) NOT NULL,
  `class_teach` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `salary` double NOT NULL,
  `service_fee` double NOT NULL,
  `status` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `time_teach` varchar(255) NOT NULL,
  `id_user` bigint NOT NULL,
  PRIMARY KEY (`id_class`),
  KEY `FKolwbx5e2hmj3dwbt1oa8iisyf` (`id_user`),
  CONSTRAINT `FKolwbx5e2hmj3dwbt1oa8iisyf` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `parent_register_tutor` (
  `id_parent` bigint NOT NULL,
  `id_tutor` bigint NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `score` int DEFAULT NULL,
  `status` bit(1) NOT NULL,
  `id_user` bigint NOT NULL,
  PRIMARY KEY (`id_parent`,`id_tutor`),
  KEY `FKa9hlywbw4fj8b8f9bspqayvjo` (`id_tutor`),
  KEY `FKi42x4c4c02sxrkbn6dlj6c6t0` (`id_user`),
  CONSTRAINT `FKa9hlywbw4fj8b8f9bspqayvjo` FOREIGN KEY (`id_tutor`) REFERENCES `tutors` (`id_tutor`),
  CONSTRAINT `FKi42x4c4c02sxrkbn6dlj6c6t0` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `class_register` (
  `id_class_register` bigint NOT NULL AUTO_INCREMENT,
  `date_receive` datetime NOT NULL,
  `more_require` longtext,
  `payment` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `id_class` bigint DEFAULT NULL,
  `id_tutor` bigint DEFAULT NULL,
  PRIMARY KEY (`id_class_register`),
  KEY `FKh7drcvwirsy9err3nmth4116w` (`id_class`),
  KEY `FKgp8tsn0l67gwymuhy7ar1kuuo` (`id_tutor`),
  CONSTRAINT `FKgp8tsn0l67gwymuhy7ar1kuuo` FOREIGN KEY (`id_tutor`) REFERENCES `tutors` (`id_tutor`),
  CONSTRAINT `FKh7drcvwirsy9err3nmth4116w` FOREIGN KEY (`id_class`) REFERENCES `classes` (`id_class`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `invoice` (
  `id_invoice` bigint NOT NULL AUTO_INCREMENT,
  `service_fee` double DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `id_class_register` bigint DEFAULT NULL,
  PRIMARY KEY (`id_invoice`),
  KEY `FKonlvyssa3t3bhw5clm7q33e7b` (`id_class_register`),
  CONSTRAINT `FKonlvyssa3t3bhw5clm7q33e7b` FOREIGN KEY (`id_class_register`) REFERENCES `class_register` (`id_class_register`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;