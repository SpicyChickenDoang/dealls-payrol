create database payroll;

create TABLE logs (
	id serial PRIMARY key,
	ip_address VARCHAR(255) not null,
	request_id TEXT NOT NULL,
	body TEXT NOT NULL,
	endpoint VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE overtime (
  id SERIAL PRIMARY KEY,
  start_ot TIMESTAMP NOT NULL,
  end_ot TIMESTAMP NOT NULL,
  count_ot INTEGER NOT NULL DEFAULT 0,
  status INTEGER DEFAULT 0,
  payroll_period_id INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by INT NOT NULL DEFAULT 0
);

CREATE TABLE reimburse (
  id SERIAL PRIMARY KEY,
  account_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  reason VARCHAR(255) NOT NULL,
  payroll_period_id INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payroll_period (
  id SERIAL PRIMARY KEY,
  start_period Date NOT NULL,
  end_period Date NOT NULL,
  status SMALLINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INT NOT NULL
);

create table account (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email varchar(255) NOT NULL,
    salary BIGINT NOT NULL DEFAULT 1000000,
    types SMALLINT NOT NULL DEFAULT 2,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

insert into account (id, email, password, name, salary, types) values (1001, 'admin@admin.com', 'asdf', 'admin', 0, 1);

create table attendance (
    id SERIAL PRIMARY KEY,
    account_id INTEGER NOT NULL,
    payroll_period_id INTEGER NOT NULL DEFAULT 0,
    types SMALLINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

create table payroll (
  id SERIAL PRIMARY KEY,
  total_salary FLOAT NOT NULL DEFAULT 0,
  payroll_period_id INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by INTEGER NOT NULL
)

create table payslip (
  id SERIAL PRIMARY KEY,
  account_id INTEGER NOT NULL DEFAULT 0,
  types BIGINT NOT NULL DEFAULT 0,
  data JSON NOT NULL,
  total FLOAT NOT NULL DEFAULT 0,
  payroll_period_id INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by INTEGER NOT NULL
)

insert into account (id, email, password, name, salary, types) values (1, 'ahuison0@unesco.org', 'asdf', 'Annie Huison', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (2, 'hkyteley1@sourceforge.net', 'asdf', 'Heidi Kyteley', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (3, 'aperrin2@state.tx.us', 'asdf', 'Allene Perrin', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (4, 'dpaulusch3@prnewswire.com', 'asdf', 'Darelle Paulusch', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (5, 'ghodjetts4@netscape.com', 'asdf', 'Giselbert Hodjetts', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (6, 'dlivingston5@google.pl', 'asdf', 'Durand Livingston', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (7, 'afalvey6@ebay.com', 'asdf', 'Adham Falvey', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (8, 'jcroote7@rambler.ru', 'asdf', 'Jackie Croote', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (9, 'hlawrie8@mapquest.com', 'asdf', 'Harrie Lawrie', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (10, 'mcoombs9@reddit.com', 'asdf', 'Margarita Coombs', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (11, 'amacgilpatricka@diigo.com', 'asdf', 'Adey MacGilpatrick', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (12, 'sgrzesiewiczb@businessinsider.com', 'asdf', 'Sunny Grzesiewicz', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (13, 'halessandrinic@nature.com', 'asdf', 'Haven Alessandrini', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (14, 'sgillerd@barnesandnoble.com', 'asdf', 'Shirleen Giller', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (15, 'fbabbe@nationalgeographic.com', 'asdf', 'Frazier Babb', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (16, 'fnutbrownf@lycos.com', 'asdf', 'Ferris Nutbrown', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (17, 'hwarhamg@cmu.edu', 'asdf', 'Holly-anne Warham', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (18, 'hashwellh@hao123.com', 'asdf', 'Henrie Ashwell', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (19, 'cparradinei@usnews.com', 'asdf', 'Cyril Parradine', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (20, 'jpetzj@ftc.gov', 'asdf', 'Jerald Petz', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (21, 'anuccik@geocities.com', 'asdf', 'Adara Nucci', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (22, 'mcestardl@jugem.jp', 'asdf', 'Mathew Cestard', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (23, 'pmacvicarm@wix.com', 'asdf', 'Pat MacVicar', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (24, 'rtinsonn@latimes.com', 'asdf', 'Rozalin Tinson', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (25, 'oedneyo@themeforest.net', 'asdf', 'Odilia Edney', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (26, 'geldridp@yellowbook.com', 'asdf', 'Gregor Eldrid', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (27, 'horwellq@dropbox.com', 'asdf', 'Hube Orwell', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (28, 'tshielr@mysql.com', 'asdf', 'Tremain Shiel', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (29, 'jbrunis@salon.com', 'asdf', 'Jobina Bruni', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (30, 'tdevinnt@networksolutions.com', 'asdf', 'Thorstein Devinn', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (31, 'ppercyu@stumbleupon.com', 'asdf', 'Pearline Percy', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (32, 'bcrowdacev@4shared.com', 'asdf', 'Barnabe Crowdace', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (33, 'cmacknessw@whitehouse.gov', 'asdf', 'Carlie Mackness', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (34, 'mnailx@ovh.net', 'asdf', 'Mariana Nail', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (35, 'mlejeuney@google.co.uk', 'asdf', 'Minetta Lejeune', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (36, 'obovisz@github.com', 'asdf', 'Otho Bovis', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (37, 'rbirtonshaw10@exblog.jp', 'asdf', 'Renault Birtonshaw', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (38, 'dtootal11@jugem.jp', 'asdf', 'Delbert Tootal', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (39, 'tcallery12@netvibes.com', 'asdf', 'Tadd Callery', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (40, 'djellis13@jalbum.net', 'asdf', 'Dermot Jellis', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (41, 'cney14@howstuffworks.com', 'asdf', 'Che Ney', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (42, 'dweight15@twitpic.com', 'asdf', 'Darelle Weight', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (43, 'jharrington16@utexas.edu', 'asdf', 'Julius Harrington', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (44, 'asalatino17@parallels.com', 'asdf', 'Annadiana Salatino', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (45, 'abursell18@cnet.com', 'asdf', 'Andie Bursell', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (46, 'tsainte19@nifty.com', 'asdf', 'Thatcher Sainte Paul', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (47, 'sband1a@google.nl', 'asdf', 'Stephenie Band', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (48, 'dsimm1b@ucoz.com', 'asdf', 'Danell Simm', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (49, 'mgrantham1c@bbc.co.uk', 'asdf', 'Melisse Grantham', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (50, 'taxten1d@dmoz.org', 'asdf', 'Theobald Axten', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (51, 'fmapstone1e@sina.com.cn', 'asdf', 'Fayina Mapstone', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (52, 'emcmurrugh1f@w3.org', 'asdf', 'Emmey McMurrugh', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (53, 'iwallbanks1g@imdb.com', 'asdf', 'Izak Wallbanks', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (54, 'gbolderson1h@nature.com', 'asdf', 'Gustie Bolderson', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (55, 'bdunphie1i@shop-pro.jp', 'asdf', 'Ben Dunphie', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (56, 'afinnigan1j@pbs.org', 'asdf', 'Andrea Finnigan', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (57, 'scurcher1k@twitpic.com', 'asdf', 'Salli Curcher', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (58, 'elucia1l@china.com.cn', 'asdf', 'Electra Lucia', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (59, 'aspehr1m@ocn.ne.jp', 'asdf', 'Ariela Spehr', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (60, 'bhoggan1n@rambler.ru', 'asdf', 'Bartholemy Hoggan', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (61, 'lmedlicott1o@home.pl', 'asdf', 'Lorettalorna Medlicott', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (62, 'bburvill1p@goodreads.com', 'asdf', 'Beck Burvill', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (63, 'tlintot1q@loc.gov', 'asdf', 'Tami Lintot', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (64, 'gbeevers1r@goo.ne.jp', 'asdf', 'Ginnifer Beevers', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (65, 'griall1s@ucsd.edu', 'asdf', 'Gertrud Riall', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (66, 'dboleyn1t@loc.gov', 'asdf', 'Denna Boleyn', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (67, 'rdominguez1u@storify.com', 'asdf', 'Rhett Dominguez', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (68, 'qborless1v@freewebs.com', 'asdf', 'Quentin Borless', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (69, 'mmcgougan1w@nymag.com', 'asdf', 'Melisent McGougan', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (70, 'mcooch1x@ustream.tv', 'asdf', 'Maggee Cooch', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (71, 'bpilgrim1y@theguardian.com', 'asdf', 'Bernadine Pilgrim', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (72, 'lfaux1z@ifeng.com', 'asdf', 'Lavena Faux', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (73, 'svear20@so-net.ne.jp', 'asdf', 'Sully Vear', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (74, 'uwinterbourne21@amazon.co.jp', 'asdf', 'Urbanus Winterbourne', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (75, 'bcreeber22@uiuc.edu', 'asdf', 'Bronnie Creeber', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (76, 'bgoshawk23@theglobeandmail.com', 'asdf', 'Booth Goshawk', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (77, 'kmardee24@bbc.co.uk', 'asdf', 'Kirk Mardee', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (78, 'pkissock25@shutterfly.com', 'asdf', 'Peg Kissock', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (79, 'dtaunton26@hexun.com', 'asdf', 'Dunn Taunton', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (80, 'atabourier27@nih.gov', 'asdf', 'Allsun Tabourier', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (81, 'hdawney28@jiathis.com', 'asdf', 'Hester Dawney', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (82, 'snovello29@hc360.com', 'asdf', 'Siegfried Novello', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (83, 'malpine2a@nature.com', 'asdf', 'Mahmud Alpine', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (84, 'perratt2b@dmoz.org', 'asdf', 'Pippo Erratt', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (85, 'elawley2c@hp.com', 'asdf', 'Emelyne Lawley', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (86, 'mgoodsir2d@washington.edu', 'asdf', 'Marylee Goodsir', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (87, 'mkillelea2e@cargocollective.com', 'asdf', 'Margalo Killelea', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (88, 'mdonovin2f@prweb.com', 'asdf', 'Melissa Donovin', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (89, 'mgrout2g@java.com', 'asdf', 'Mignonne Grout', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (90, 'bblachford2h@meetup.com', 'asdf', 'Bernardo Blachford', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (91, 'icousin2i@trellian.com', 'asdf', 'Ingunna Cousin', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (92, 'dhammatt2j@xrea.com', 'asdf', 'Devlin Hammatt', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (93, 'jclarycott2k@com.com', 'asdf', 'Jeremy Clarycott', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (94, 'hpennycord2l@unc.edu', 'asdf', 'Helaine Pennycord', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (95, 'leisikowitch2m@themeforest.net', 'asdf', 'Lesly Eisikowitch', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (96, 'rtidcombe2n@mapy.cz', 'asdf', 'Remus Tidcombe', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (97, 'rdomm2o@sciencedaily.com', 'asdf', 'Roman Domm', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (98, 'jdownham2p@wiley.com', 'asdf', 'Job Downham', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (99, 'serswell2q@sogou.com', 'asdf', 'Swen Erswell', 10000000, 2);
insert into account (id, email, password, name, salary, types) values (100, 'ltwittey2r@ameblo.jp', 'asdf', 'Lucie Twittey', 10000000, 2);


