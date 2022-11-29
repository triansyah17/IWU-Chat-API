CREATE TABLE chats
(
  id           VARCHAR   NOT NULL,
  sender       VARCHAR   NOT NULL,
  receiver     VARCHAR   NOT NULL,
  chat         VARCHAR   NOT NULL,
  chat_type    VARCHAR   NULL    ,
  is_deleted   TEXT NULL,
  date         TIMESTAMP NULL    ,
  UNIQUE(id)
);

CREATE TABLE users
(
  id       VARCHAR   NOT NULL,
  username VARCHAR   NOT NULL,
  email    VARCHAR   NOT NULL,
  password VARCHAR   NOT NULL,
  photo    TEXT      NULL    ,
  phone    VARCHAR   NULL    ,
  bio      VARCHAR   NULL    ,
  is_verified TEXT NOT NULL DEFAULT 'false',
  email_token TEXT NULL   ,
  date     TIMESTAMP NULL    ,
  CHECK(is_verified IN ('false', 'true')),
  UNIQUE(id,email, password)
);