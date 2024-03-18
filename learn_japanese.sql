CREATE DATABASE IF NOT EXISTS learn_japanese;
USE learn_japanese;

-- table tbl_language
CREATE TABLE IF NOT EXISTS tbl_language (
	language_id int(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    language_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    language_img varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

INSERT INTO tbl_language (language_name, language_img) VALUES 
	('Tiếng Việt', './language/vietnam.png'),
	('English', './language/english.png'),
	('日本語', './language/japan.png');
--

-- table tbl_role
CREATE TABLE IF NOT EXISTS tbl_role (
	role_id INT(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    role_type varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

INSERT INTO tbl_role (role_type) VALUES 
    ('admin'),
	('user');
--

-- table tbl_user
CREATE TABLE IF NOT EXISTS tbl_user (
	user_id INT(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_name varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
    user_email varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    user_password varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
    user_avatar varchar(255),
    user_role_id INT(10) unsigned,
    FOREIGN KEY (user_role_id) REFERENCES tbl_role(role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

INSERT INTO tbl_user (user_name, user_email, user_password, user_avatar, user_role_id) VALUES
	('QuangHuy', 'huydq@gmail.com', '1', './avatar/male-student.png', 1),
	('HoaiTrang', 'tranght@gmail.com', '1', './avatar/male-student.png', 1),
	('QuanHy', 'huydq1@gmail.com', '1', './avatar/male-student.png', 2);
--

-- table tbl_type
CREATE TABLE IF NOT EXISTS tbl_type (
	type_id INT(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    type_name varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
    type_status TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

INSERT INTO tbl_type (type_name, type_status) VALUES
	('Bảng chữ cái', 1),
    ('Minna no Nihongo', 1);
--

-- table tbl_lesson
CREATE TABLE IF NOT EXISTS tbl_lesson (
	lesson_id INT(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT(10) unsigned,
    type_id INT(10) unsigned,
    lesson_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    lesson_description varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    lesson_img varchar(255),
    lesson_status TINYINT(1) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES tbl_user(user_id),
    FOREIGN KEY (type_id) REFERENCES tbl_type(type_id) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

INSERT INTO tbl_lesson (user_id, type_id, lesson_name, lesson_description, lesson_img) VALUES 
    (NULL, 2, 'Bài 1 - Minna no Nihongo', NULL, './minna_no_nihongo/minna_no_nihongo_lesson1.png'),
	(NULL, 2, 'Bài 2 - Minna no Nihongo', NULL, './minna_no_nihongo/minna_no_nihongo_lesson2.png'),
	(NULL, 2, 'Bài 3 - Minna no Nihongo', NULL, './minna_no_nihongo/minna_no_nihongo_lesson3.png'),
	(NULL, 2, 'Bài 4 - Minna no Nihongo', NULL, './minna_no_nihongo/minna_no_nihongo_lesson4.png'),
	(NULL, 2, 'Bài 5 - Minna no Nihongo', NULL, './minna_no_nihongo/minna_no_nihongo_lesson5.png'),
	(NULL, 2, 'Bài 6 - Minna no Nihongo', NULL, './minna_no_nihongo/minna_no_nihongo_lesson6.png');
--

-- table tbl_vocabulary
CREATE TABLE IF NOT EXISTS tbl_vocabulary (
	vocabulary_id INT(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    lesson_id INT(10) unsigned,
    vocabulary_name varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    vocabulary_character varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    vocabulary_yin_han varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    vocabulary_mean varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    vocabulary_audio varchar(255),
    FOREIGN KEY (lesson_id) REFERENCES tbl_lesson(lesson_id)  
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

INSERT INTO tbl_vocabulary (lesson_id, vocabulary_name, vocabulary_character, vocabulary_yin_han, vocabulary_mean, vocabulary_audio) VALUES 
    (1, 'わたし', '私', NULL, 'tôi', './audio/watashi.mp3'),
	(1, 'あなた', NULL, NULL, 'anh/chị/ông/bà', './audio/anata.mp3'),
	(1, 'あのひと', 'あの人', 'NHÂN', 'người kia, người đó', './audio/anohito.mp3'),
	(1, 'あのかた', 'あの方', 'PHƯƠNG', 'vị kia, cách nói lịch sự của あのひと', './audio/anokata.mp3'),
	(1, '～さん', NULL, NULL, 'anh, chị, ông, bà', './audio/san.mp3'),
	(1, '～ちゃん', NULL, NULL, 'hậu tố thêm vào sau tên trẻ em (thay cho ～さん)', './audio/chan.mp3'),
    (1, '～じん', '～人', 'NHÂN', 'người nước ~', './audio/jin.mp3'),
    (1, 'せんせい', '先生', 'TIÊN SINH', 'thầy, cô', './audio/sensei.mp3'),
    (1, 'きょうし', '教師', 'GIÁO SƯ', 'giáo viên', './audio/kyoshi.mp3');
--

-- table tbl_kaiwa
CREATE TABLE IF NOT EXISTS tbl_kaiwa (
	kaiwa_id INT(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    lesson_id INT(10) unsigned,
    kaiwa_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    kaiwa_mean varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    kaiwa_audio varchar(255),
    FOREIGN KEY (lesson_id) REFERENCES tbl_lesson(lesson_id)  
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

INSERT INTO tbl_kaiwa (lesson_id, kaiwa_name, kaiwa_mean, kaiwa_audio) VALUES 
    (1, '初めまして。', 'Rất vui được gặp anh/chị.', './audio/hajimemashite.mp3'),
	(1, 'どうぞよろしく「お願いします」。', 'Rất vui khi được làm quen.', './audio/douzo.mp3'),
	(1, '～から来ました。', 'Tôi đến từ ～.', './audio/karakimashita.mp3'),
	(1, 'お名前は？', 'Tên anh/chị là gì?', './audio/onamae.mp3'),
	(1, 'どちらは～さんです。', 'Đây là anh/chị/ông/bà ～.', './audio/dochirawa.mp3');
--

-- table tbl_content
CREATE TABLE IF NOT EXISTS tbl_grammar (
	grammar_id INT(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    lesson_id INT(10) unsigned,
    grammar_title varchar(50) COLLATE utf8_unicode_ci NOT NULL,
    grammar_mean varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    grammar_detail varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    grammar_example varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    grammar_note varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    FOREIGN KEY (lesson_id) REFERENCES tbl_lesson(lesson_id)  
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

INSERT INTO tbl_grammar (lesson_id, grammar_title, grammar_mean, grammar_detail, grammar_example, grammar_note) VALUES 
    (1, 'Danh từ 1 は Danh từ 2 です。', 'Danh từ 1 là Danh từ 2.', 'Trợ từ 「は」 được dừng sau Danh từ 1 để biểu thị Danh từ 1 là chủ đề của câu. です được dùng ở cuối câu khẳng định thì hiện tại dạng “Danh từ 1 là Danh từ 2” và thể hiện sự tôn trọng, lịch sự đối với người nghe. Trợ từ「は」đọc là 「わ」。', '私 は 学生 です。(Tôi là sinh viên.)', NULL),
	(1, 'Danh từ 1 は Danh từ 2 じゃ ありません。', 'Danh từ 1 không phải là Danh từ 2.', 'じゃ ありません là phủ định của です. じゃ ありません sử dụng trong giao tiếp hàng ngày. では ありません sử dụng trong văn viết.', '私 は 銀行員じゃ（では）ありません。(Tôi không phải là nhân viên ngân hàng.)', NULL),
	(1, '～は ～ですか。', '~ là ~ phải không', 'Trợ từ 「か」được đặt ở cuối câu để biến câu đó thành câu nghi vấn. Khi trả lời câu hỏi dạng này, ta phải bắt đầu bằng các từ はい hoặc いいえ.', '例 1 (ví dụ 1) A: ハイさんはいしゃですか。B: はい、いしゃです。例 2 (ví dụ 2) A: やまださんは会社員ですか。B: いいえ、会社員じゃありません。銀行員です。', NULL);
--

-- table tbl_test
CREATE TABLE IF NOT EXISTS tbl_test (
	test_id INT(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    lesson_id INT(10) unsigned,
    test_name varchar(50) COLLATE utf8_unicode_ci NOT NULL,
    is_complete TINYINT(1) DEFAULT 0,
    FOREIGN KEY (lesson_id) REFERENCES tbl_lesson(lesson_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

INSERT INTO tbl_test (lesson_id, test_name, is_complete) VALUES 
    (1, 'あ - い - う - え - お', 0),
	(1, 'か - き - く - け - こ', 0),
	(1, 'さ - し - す - せ - そ', 0),
	(1, 'た - ち - つ - て - と', 0);
--

-- table tbl_question
CREATE TABLE IF NOT EXISTS tbl_question (
	question_id INT(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    test_id INT(10) unsigned,
    question_name varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    question_img varchar(255),
    question_audio varchar(255),
    answer_a varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    answer_b varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    answer_c varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    answer_d varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    answer_correct varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    FOREIGN KEY (test_id) REFERENCES tbl_test(test_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

INSERT INTO tbl_question (test_id, question_name, question_img, question_audio, answer_a, answer_b, answer_c, answer_d, answer_correct) VALUES 
    (1, 'a', NULL, './audio/a.mp3', 'い', 'う', 'あ', 'え', 'C'),
	(1, 'i', NULL, './audio/i.mp3', 'い', 'う', 'あ', 'え', 'A');   
--

-- table tbl_answer
-- CREATE TABLE IF NOT EXISTS tbl_answer (
-- 	answer_id INT(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     question_id INT(10) unsigned,
--     answer_a varchar(255) COLLATE utf8_unicode_ci NOT NULL,
--     answer_b varchar(255) COLLATE utf8_unicode_ci NOT NULL,
--     answer_c varchar(255) COLLATE utf8_unicode_ci NOT NULL,
--     answer_d varchar(255) COLLATE utf8_unicode_ci NOT NULL,
--     answer_correct varchar(255) COLLATE utf8_unicode_ci NOT NULL,
--     FOREIGN KEY (question_id) REFERENCES tbl_question(question_id)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS tbl_post (
	post_id INT(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT(10) unsigned,
    post_title varchar(50) COLLATE utf8_unicode_ci NOT NULL,
    post_content varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    post_img varchar(255),
    post_timestamp DATETIME,
    post_view INT DEFAULT 0,
    post_like INT DEFAULT 0,
    post_comment INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES tbl_user(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;