USE hospital;

-- Column order matches the DAO methods that read ResultSet by numeric index.
CREATE TABLE IF NOT EXISTS user_details (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS specialist (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  specialist_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS doctor (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(255) NOT NULL,
  dateOfBirth VARCHAR(30) NOT NULL,
  qualification VARCHAR(255) NOT NULL,
  specialist VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS appointment (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  fullName VARCHAR(255) NOT NULL,
  gender VARCHAR(30) NOT NULL,
  age VARCHAR(30) NOT NULL,
  appointmentDate VARCHAR(30) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  diseases VARCHAR(500) NOT NULL,
  doctorId INT NOT NULL,
  address TEXT NOT NULL,
  status TEXT NOT NULL,
  INDEX idx_appointment_user (userId),
  INDEX idx_appointment_doctor (doctorId)
);
