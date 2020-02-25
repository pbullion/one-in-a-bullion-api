DROP TABLE invitations;

CREATE TABLE invitations(
  id serial,
  first_name_a character varying(50),
  last_name_a character varying(50),
  first_name_b character varying(50),
  last_name_b character varying(50),
  plus_one boolean,
  num_kids int,
  address character varying(50),
  address_apt_number character varying(50),
  address_city character varying(50),
  address_state character varying(50),
  address_zip int,
  relation character varying(50),
  side character varying(50),
  email character varying(50),
  email_alt character varying(50),
  total_adults int,
  total_kids int,
  rsvp_yes_adults int,
  rsvp_yes_kids int,
  rsvp_no_adults int,
  rsvp_no_kids int
);

INSERT INTO invitations(first_name_a, last_name_a, first_name_b, last_name_b, plus_one, num_kids, address, address_apt_number, address_city, address_state, address_zip, relation, side, email, email_alt, total_adults, total_kids, rsvp_yes_adults, rsvp_yes_kids, rsvp_no_adults, rsvp_no_kids)
VALUES
('Kenneth','Bullion', 'Jan','Bullion', false, 0, '736 Sierra Dr.', null, 'Port Neches', 'TX', 77651, 'family', 'bullion', 'kjpm4bulls@aol.com', 'kenneth.bullion@icloud.com', 2, 0, 2, 0, 0, 0),
('Mark','Angelle', 'Connie','Angelle', false, 0, '420 Something Dr.', null, 'Bridge City', 'TX', 77882, 'family', 'angelle', 'something@aol.com', 'mark.angelle@icloud.com', 2, 0, 2, 0, 0, 0);
