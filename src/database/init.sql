CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS contact CASCADE;
CREATE TABLE contact
(
	phone VARCHAR(30) NOT NULL UNIQUE,
	name VARCHAR(30) NOT NULL,
	createdAt TIMESTAMP NOT NULL,
	PRIMARY KEY (phone)
);

DROP TABLE IF EXISTS sms CASCADE;
CREATE TABLE sms
(
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	sender VARCHAR(30),
	receiver VARCHAR(30),
	message VARCHAR(255) NOT NULL,
	status VARCHAR(50) NOT NULL,
	createdAt TIMESTAMP NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (sender) REFERENCES contact (phone) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (receiver) REFERENCES contact (phone) ON UPDATE CASCADE ON DELETE SET NULL
);

INSERT INTO contact(phone, name, createdat)
  VALUES ('0703458901', 'Somto Ogene', NOW()),
  ('0703458902', 'Marcus Grey', NOW()),
  ('0703458903', 'Bright Shiv', NOW()),
  ('0703458904', 'Marcus Paul', NOW());

INSERT INTO sms(sender, receiver, message, status, createdat)
  VALUES ('0703458901', '0703458902', 'Can I hold your burse', 'sent', NOW()),
  ('0703458901', '0703458902', 'We know now', 'pending', NOW()),
  ('0703458901', '0703458902', 'Only time will tell', 'sent', NOW()),
  ('0703458902', '0703458901', 'Meet me soon', 'pending', NOW()),
  ('0703458902', '0703458901', 'Can we talk please', 'sent', NOW()),
  ('0703458902', '0703458901', 'Be careful what you wish for', 'pending', NOW()),
  ('0703458903', '0703458904', 'Outta here dear!', 'delivered', NOW()),
  ('0703458904', '0703458903', 'Can we meet tonight?', 'sent', NOW());
