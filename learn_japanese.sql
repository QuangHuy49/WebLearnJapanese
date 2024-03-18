CREATE DATABASE IF NOT EXISTS learn_japanese;
USE learn_japanese;

CREATE TABLE IF NOT EXISTS tbl_language (
	language_id int(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    language_name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS tbl_role (
	role_id INT(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    role_type varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS tbl_user (
	user_id INT(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_name varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
    user_email varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    user_password varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
    user_avatar varchar(255),
    user_role_id INT(10) unsigned,
    FOREIGN KEY (user_role_id) REFERENCES tbl_role(role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS tbl_lesson (
	lesson_id INT(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT(10) unsigned,
    lesson_name varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
    lesson_description varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    lesson_img varchar(255),
    FOREIGN KEY (user_id) REFERENCES tbl_user(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS tbl_type (
	type_id INT(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    type_name varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
    type_status TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS tbl_content (
	content_id INT(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    lesson_id INT(10) unsigned,
    content_title varchar(50) COLLATE utf8_unicode_ci NOT NULL,
    content_detail varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    content_note varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
    content_img varchar(255),
    content_audio varchar(255),
    content_status TINYINT(1) DEFAULT 0,
    type_id TINYINT(1) DEFAULT 0,
    is_complete TINYINT(1) DEFAULT 0,
    FOREIGN KEY (lesson_id) REFERENCES tbl_lesson(lesson_id),
    FOREIGN KEY (type_id) REFERENCES tbl_type(type_id) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS tbl_test (
	test_id INT(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    lesson_id INT(10) unsigned,
    test_name varchar(50) COLLATE utf8_unicode_ci NOT NULL,
    is_complete TINYINT(1) DEFAULT 0,
    FOREIGN KEY (lesson_id) REFERENCES tbl_lesson(lesson_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS tbl_question (
	question_id INT(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    test_id INT(10) unsigned,
    question_name varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    question_img varchar(255),
    question_audio varchar(255),
    correct_answer varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    FOREIGN KEY (test_id) REFERENCES tbl_test(test_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS tbl_answer (
	answer_id INT(10) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
    question_id INT(10) unsigned,
    answer_text varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    FOREIGN KEY (question_id) REFERENCES tbl_question(question_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

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