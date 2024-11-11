insert into USERS(id, username, password, role) values (100, 'ana@email.com', '$2a$10$Z7/3dclbuOLEOKUt5EMdG.lzK4bYlbUtVjAehj2Y45QxTJ/mwAg3.', 'ROLE_ADMIN');
insert into USERS(id, username, password, role) values (101, 'bia@email.com', '$2a$10$Z7/3dclbuOLEOKUt5EMdG.lzK4bYlbUtVjAehj2Y45QxTJ/mwAg3.', 'ROLE_CLIENT');
insert into USERS(id, username, password, role) values (102, 'bob@email.com', '$2a$10$Z7/3dclbuOLEOKUt5EMdG.lzK4bYlbUtVjAehj2Y45QxTJ/mwAg3.', 'ROLE_CLIENT');

INSERT INTO MESSAGES (id, sender_user, message_text, recipient_name, opening_date_time, narrative_theme, status, link_token)
VALUES (100, 100, 'Oi', 'Bob', '2025-10-10 10:00:00', 'Geral', 'PENDING', 'a4f8c1d2-5b6e-4a7f-9b8c-0d1e2f3a4b5c');

INSERT INTO MESSAGES (id, sender_user, message_text, recipient_name, opening_date_time, narrative_theme, status, link_token)
VALUES (101, 101, 'Oi', 'Bob', '2025-10-10 10:00:00', 'Geral', 'PENDING', 'a4f9c1d2-5b6e-4a7f-9b8c-0d1e2f3a4b5c');

INSERT INTO MESSAGES (id, sender_user, message_text, recipient_name, opening_date_time, narrative_theme, status, link_token)
VALUES (102, 101, 'Oi', 'Joao', '2025-10-10 10:00:00', 'Geral', 'PENDING', 'a4f0c1d2-5b6e-4a7f-9b8c-0d1e2f3a4b5c');

INSERT INTO MESSAGES (id, sender_user, message_text, recipient_name, opening_date_time, narrative_theme, status, link_token)
VALUES (103, 101, 'Oi', 'Maria', '2025-10-10 10:00:00', 'Geral', 'PENDING', 'a4f1c1d2-5b6e-4a7f-9b8c-0d1e2f3a4b5c');

INSERT INTO MESSAGES (id, sender_user, message_text, recipient_name, opening_date_time, narrative_theme, status, link_token)
VALUES (104, 101, 'Oi', 'Ana', '2025-10-10 10:00:00', 'Geral', 'PENDING', 'a4f2c1d2-5b6e-4a7f-9b8c-0d1e2f3a4b5c');

INSERT INTO MESSAGES (id, sender_user, message_text, recipient_name, opening_date_time, narrative_theme, status, link_token)
VALUES (105, 101, 'Oi', 'Talis', '2025-10-10 10:00:00', 'Geral', 'PENDING', 'a4f3c1d2-5b6e-4a7f-9b8c-0d1e2f3a4b5c');

INSERT INTO MESSAGES (id, sender_user, message_text, recipient_name, opening_date_time, narrative_theme, status, link_token)
VALUES (106, 102, 'Oi', 'Bruna', '2025-10-10 10:00:00', 'Geral', 'PENDING', 'a4f3c1d2-5b6e-4a7f-9b8c-0d1e2f3a4b5c');