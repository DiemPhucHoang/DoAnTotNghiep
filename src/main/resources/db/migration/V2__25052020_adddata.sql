insert into roles (role_name) values (0), (1), (2);

insert into subjects(subject_name)
values('Toán'), ('Vật lý'), ('Hóa học'), ('Ngữ văn'), ('Sinh học'), ('Lịch sử'), ('Địa lý'), ('Báo bài'),
('Tiếng Anh'), ('Tiếng Việt'), ('Tiếng Trung'), ('Tiếng Hàn'), ('Tiếng Nhật'), ('Đàn nhạc'), ('Tin học'), ('Vẽ');

insert into districts(district_name)
values('Quận 1'), ('Quận 2'), ('Quận 3'), ('Quận 4'), ('Quận 5'), ('Quận 6'), ('Quận 7'), ('Quận 8'), ('Quận 9'),
('Quận 10'), ('Quận 11'), ('Quận 12'), ('Quận Thủ Đức'), ('Quận Bình Thạnh'), ('Quận Bình Tân'), ('Quận Bình Chánh'),
('Quận Tân Bình'), ('Quận Tân Phú'), ('Quận Gò Vấp'), ('Quận Phú Nhuận'), ('Huyện Nhà Bè'), ('Huyện Hóc Môn'),
('Huyện Củ Chi'), ('Huyện Cần Giờ');

insert into class_teach(class_teach_name)
values('Lớp 1'), ('Lớp 2'), ('Lớp 3'), ('Lớp 4'), ('Lớp 5'), ('Lớp 6'), ('Lớp 7'), ('Lớp 8'), ('Lớp 9'),
('Lớp 10'), ('Lớp 11'), ('Lớp 12'), ('Ôn đại học'), ('Lớp năng khiếu'), ('Lớp ngoại ngữ'), ('Lớp khác');

insert into users (address, email, name, password, phone)
values ('Quận Thủ Đức', 'admin@gmail.com', 'admin', '$2a$10$.HjolvzOdkTnZGBTN5mc4e7ZUvt3L3IkQO71ZFX/sI9VmCI5oVznm', '0987654321');
-- pass: 123456

insert into user_role (id_user, id_role) values (1,1);