--
-- PostgreSQL database cluster dump
--

-- Started on 2023-05-02 20:45:38

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:zs54WGpCa0ssIr5lOjgL2Q==$uus6awlHi+FiJeJIHKdkpEPRCl49tL+LkH/7u8FUqrI=:TZZhsxObsiPt/o4bLLAtjGhbnkwPmnSq2asPYIYm3FM=';






--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7
-- Dumped by pg_dump version 14.7

-- Started on 2023-05-02 20:45:38

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2023-05-02 20:45:38

--
-- PostgreSQL database dump complete
--

--
-- Database "PiyachokWeb" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7
-- Dumped by pg_dump version 14.7

-- Started on 2023-05-02 20:45:39

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3371 (class 1262 OID 16420)
-- Name: PiyachokWeb; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "PiyachokWeb" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Ukraine.1251';


ALTER DATABASE "PiyachokWeb" OWNER TO postgres;

\connect "PiyachokWeb"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 209 (class 1259 OID 16421)
-- Name: establishments_establishment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.establishments_establishment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.establishments_establishment_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 16422)
-- Name: establishments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.establishments (
    establishment_id integer DEFAULT nextval('public.establishments_establishment_id_seq'::regclass) NOT NULL,
    title character varying(45),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    type character varying(45),
    tags character varying[],
    avatar character varying(2000),
    start_work time without time zone,
    end_work time without time zone,
    location character varying(100),
    average_check integer,
    approved boolean,
    pending boolean,
    rejected boolean,
    user_id integer,
    photos character varying(200)[],
    phone character varying
);


ALTER TABLE public.establishments OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 65602)
-- Name: favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorites (
    favorite_id integer NOT NULL,
    user_id integer,
    establishment_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.favorites OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 65607)
-- Name: favorites_favorite_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favorites_favorite_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favorites_favorite_id_seq OWNER TO postgres;

--
-- TOC entry 3372 (class 0 OID 0)
-- Dependencies: 220
-- Name: favorites_favorite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favorites_favorite_id_seq OWNED BY public.favorites.favorite_id;


--
-- TOC entry 217 (class 1259 OID 57408)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    text character varying(150),
    "check" integer,
    user_id integer,
    establishment_id integer,
    rating double precision,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 57417)
-- Name: reviews_review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_review_id_seq OWNER TO postgres;

--
-- TOC entry 3373 (class 0 OID 0)
-- Dependencies: 218
-- Name: reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;


--
-- TOC entry 216 (class 1259 OID 16476)
-- Name: token_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.token_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.token_id_seq OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16461)
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    token_id integer DEFAULT nextval('public.token_id_seq'::regclass) NOT NULL,
    refresh_token character varying,
    created_at date,
    updated_at date,
    user_id integer
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16431)
-- Name: type_establishments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type_establishments (
    type_id integer NOT NULL,
    title character varying(255),
    created_at date,
    updated_at date
);


ALTER TABLE public.type_establishments OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16430)
-- Name: type_establishments_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.type_establishments_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.type_establishments_type_id_seq OWNER TO postgres;

--
-- TOC entry 3374 (class 0 OID 0)
-- Dependencies: 211
-- Name: type_establishments_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.type_establishments_type_id_seq OWNED BY public.type_establishments.type_id;


--
-- TOC entry 221 (class 1259 OID 65618)
-- Name: type_news; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type_news (
    type_news_id integer NOT NULL,
    type character varying,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.type_news OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16438)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16439)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer DEFAULT nextval('public.users_user_id_seq'::regclass) NOT NULL,
    name character varying(50),
    email character varying(45),
    picture character varying(200),
    admin boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3198 (class 2604 OID 65608)
-- Name: favorites favorite_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites ALTER COLUMN favorite_id SET DEFAULT nextval('public.favorites_favorite_id_seq'::regclass);


--
-- TOC entry 3197 (class 2604 OID 57418)
-- Name: reviews review_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);


--
-- TOC entry 3194 (class 2604 OID 16434)
-- Name: type_establishments type_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_establishments ALTER COLUMN type_id SET DEFAULT nextval('public.type_establishments_type_id_seq'::regclass);


--
-- TOC entry 3354 (class 0 OID 16422)
-- Dependencies: 210
-- Data for Name: establishments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.establishments (establishment_id, title, created_at, updated_at, type, tags, avatar, start_work, end_work, location, average_check, approved, pending, rejected, user_id, photos, phone) FROM stdin;
982	Royal	2023-05-01 14:14:39	2023-05-02 17:43:43	Restoraunt	{restoraunt," royal"}	uploads\\users\\44\\establishments_photo\\982\\0_07c3eb58-06cb-4d3c-90e8-a9b7e5e179ba.jpg	06:10:00	22:07:00	Sadova Street, 11, Lviv, Lviv Oblast, Ukraine	3000	t	f	f	44	{"uploads\\\\users\\\\44\\\\establishments_photo\\\\982\\\\0_07c3eb58-06cb-4d3c-90e8-a9b7e5e179ba.jpg","uploads\\\\users\\\\44\\\\establishments_photo\\\\982\\\\1_d6fbc8a4-b30f-4098-bd17-ada4f805216b.jpg"}	+380976649512
981	Panoramic	2023-05-01 14:12:14	2023-05-01 14:53:24	Restoraunt	{restoraunt," panoramic"}	uploads\\users\\44\\establishments_photo\\981\\0_c891d227-c42c-4066-8c7c-d471b8eedd38.jpg	12:10:00	22:07:00	Sadova Street, 11, Lviv, Lviv Oblast, Ukraine	2000	t	f	f	44	{"uploads\\\\users\\\\44\\\\establishments_photo\\\\981\\\\0_c891d227-c42c-4066-8c7c-d471b8eedd38.jpg","uploads\\\\users\\\\44\\\\establishments_photo\\\\981\\\\1_550cb28c-9e4f-4da1-a0e1-0fbe3356bbd5.jpg"}	+380986649512
984	Area Coffee	2023-05-01 14:17:13	2023-05-01 15:30:38	Cafe	{cofee," area"," cafe"}	uploads\\users\\44\\establishments_photo\\984\\0_0f6b258a-763d-4b49-be03-136be2c0cf34.jpg	07:10:00	22:07:00	Toronto Street, 19, Lviv, Lviv Oblast, Ukraine	1000	t	f	f	44	{"uploads\\\\users\\\\44\\\\establishments_photo\\\\984\\\\0_0f6b258a-763d-4b49-be03-136be2c0cf34.jpg","uploads\\\\users\\\\44\\\\establishments_photo\\\\984\\\\1_f01437c6-fc7a-4574-8659-ece94d6e0040.jpg","uploads\\\\users\\\\44\\\\establishments_photo\\\\984\\\\2_dd921d4d-d7c9-41ca-a0db-fbc079867bc6.jpg"}	+380982497121
978	Enjoi	2023-05-01 14:08:45	2023-05-01 15:05:34	Hookah bar	{hookah," cool"}	uploads\\users\\44\\establishments_photo\\978\\0_150bc9fc-8872-47c4-8c64-9f9c371be2d7.jpg	08:07:00	22:07:00	Lychakivska Street, 23, Lviv, Lviv Oblast, Ukraine	500	t	f	f	44	{"uploads\\\\users\\\\44\\\\establishments_photo\\\\978\\\\0_150bc9fc-8872-47c4-8c64-9f9c371be2d7.jpg","uploads\\\\users\\\\44\\\\establishments_photo\\\\978\\\\1_bc1e25e1-bedb-4ec0-887d-2186c1b20487.webp","uploads\\\\users\\\\44\\\\establishments_photo\\\\978\\\\2_5d0c17b5-29b8-4947-990e-59c665188049.jpeg"}	+380986649500
989	The Secret Place	2023-05-01 15:36:34	2023-05-01 15:36:48	Bar	{street," bar"}	uploads\\users\\44\\establishments_photo\\989\\0_a528f7cb-ae95-4625-bd21-0732b8ac35c1.jpg	10:34:00	20:34:00	Lychakivska Street, 23, Lviv, Lviv Oblast, Ukraine	1400	t	f	f	44	{"uploads\\\\users\\\\44\\\\establishments_photo\\\\989\\\\0_a528f7cb-ae95-4625-bd21-0732b8ac35c1.jpg","uploads\\\\users\\\\44\\\\establishments_photo\\\\989\\\\1_d6d24b58-5448-4b8a-95ca-c987dac230ef.jpg"}	+380982497120
985	Wild Sides	2023-05-01 14:18:36	2023-05-01 14:49:17	Club	{club," wild"}	uploads\\users\\44\\establishments_photo\\985\\0_4af150c4-72b6-4263-8140-f76230f1fe2f.jpg	19:10:00	05:07:00	Toronto Street, 7, Lviv, Lviv Oblast, Ukraine	1500	t	f	f	44	{"uploads\\\\users\\\\44\\\\establishments_photo\\\\985\\\\0_4af150c4-72b6-4263-8140-f76230f1fe2f.jpg","uploads\\\\users\\\\44\\\\establishments_photo\\\\985\\\\1_39eee06a-1b53-4a6e-bcaf-3cbc1f0a8e6f.jpg"}	+380972495418
980	Lounge Bar	2023-05-01 14:10:46	2023-05-01 15:06:42	Hookah bar	{hookah," lounge"}	uploads\\users\\44\\establishments_photo\\980\\0_f7cfa849-ac13-45fc-88ff-6e9e2522982f.jpeg	12:10:00	22:07:00	Teatralna Street, 15, Lviv, Lviv Oblast, Ukraine	1500	t	f	f	44	{"uploads\\\\users\\\\44\\\\establishments_photo\\\\980\\\\0_f7cfa849-ac13-45fc-88ff-6e9e2522982f.jpeg","uploads\\\\users\\\\44\\\\establishments_photo\\\\980\\\\1_9b7f8bea-bd24-436e-8ad4-3690931c3575.jpg","uploads\\\\users\\\\44\\\\establishments_photo\\\\980\\\\2_bd19a249-3d35-4fed-8490-3be794bc9d01.webp"}	+380986649532
979	Parnik	2023-05-01 14:09:43	2023-05-01 15:06:13	Hookah bar	{hookah," cool"}	uploads\\users\\44\\establishments_photo\\979\\0_599dbff5-7c76-450f-8c5f-e867cf7ddd88.webp	10:10:00	22:07:00	Pasuchna Street, 21, Lviv, Lviv Oblast, Ukraine	1000	t	f	f	44	{"uploads\\\\users\\\\44\\\\establishments_photo\\\\979\\\\0_599dbff5-7c76-450f-8c5f-e867cf7ddd88.webp","uploads\\\\users\\\\44\\\\establishments_photo\\\\979\\\\1_acb5ed35-19ba-4f11-882d-7f16a3e5682e.jpg","uploads\\\\users\\\\44\\\\establishments_photo\\\\979\\\\2_211d7581-7910-4b09-8429-c5fa531ed0db.jpeg"}	+380986649532
983	Biscotti	2023-05-01 14:15:59	2023-05-01 15:31:00	Cafe	{cafe," biscotti"}	uploads\\users\\44\\establishments_photo\\983\\0_047fb089-2e2c-4b2d-88cb-4102fa112830.jpg	07:10:00	22:07:00	Sadova Street, 19, Lviv, Lviv Oblast, Ukraine	800	t	f	f	44	{"uploads\\\\users\\\\44\\\\establishments_photo\\\\983\\\\0_047fb089-2e2c-4b2d-88cb-4102fa112830.jpg","uploads\\\\users\\\\44\\\\establishments_photo\\\\983\\\\1_22bbad5c-616c-4a0b-9ca9-d7ab5e4eef72.jpg"}	+380982497151
990	Beer Belly	2023-05-01 15:46:33	2023-05-01 16:10:24	Beer establishment	{beer}	uploads\\users\\46\\establishments_photo\\990\\0_9f73f762-4303-4cb6-bb9a-d8d3999a48cf.jpg	10:45:00	21:45:00	Sadova Street, 19, Lviv, Lviv Oblast, Ukraine	900	t	f	f	46	{"uploads\\\\users\\\\46\\\\establishments_photo\\\\990\\\\0_9f73f762-4303-4cb6-bb9a-d8d3999a48cf.jpg","uploads\\\\users\\\\46\\\\establishments_photo\\\\990\\\\1_7babcda2-1754-4fc2-86b5-dcf4a2b3f5d9.jpeg"}	+380986649532
987	Sarah's Coffee	2023-05-01 15:33:25	2023-05-01 15:36:47	Cafe	{cofee," cafe"}	uploads\\users\\44\\establishments_photo\\987\\0_80304fac-772c-42f9-89c5-bc58c529a062.jpg	10:32:00	20:33:00	Sadova Street, 19, Lviv, Lviv Oblast, Ukraine	698	t	f	f	44	{"uploads\\\\users\\\\44\\\\establishments_photo\\\\987\\\\0_80304fac-772c-42f9-89c5-bc58c529a062.jpg","uploads\\\\users\\\\44\\\\establishments_photo\\\\987\\\\1_b2d96a91-828a-4b33-90b4-9c701fef35bb.jpg"}	+380986649500
988	Bravo	2023-05-01 15:35:57	2023-05-01 15:36:48	Bar	{bravo," bar"}	uploads\\users\\44\\establishments_photo\\988\\0_27028f81-8230-4472-a74f-dd8aafe7ce35.jpg	10:34:00	20:34:00	Pasichna Street, 21, Lviv, Lviv Oblast, Ukraine	1197	t	f	f	44	{"uploads\\\\users\\\\44\\\\establishments_photo\\\\988\\\\0_27028f81-8230-4472-a74f-dd8aafe7ce35.jpg","uploads\\\\users\\\\44\\\\establishments_photo\\\\988\\\\1_891f0049-3795-418a-9553-055e2ca398a3.jpg"}	+380982497151
991	Beer Bizness	2023-05-01 15:47:03	2023-05-01 16:10:25	Beer establishment	{beer}	uploads\\users\\46\\establishments_photo\\991\\0_f5b5272f-8921-40db-8afd-7d3586450320.jpeg	10:45:00	21:45:00	Pasichna Street, 21, Lviv, Lviv Oblast, Ukraine	1699	t	f	f	46	{"uploads\\\\users\\\\46\\\\establishments_photo\\\\991\\\\0_f5b5272f-8921-40db-8afd-7d3586450320.jpeg","uploads\\\\users\\\\46\\\\establishments_photo\\\\991\\\\1_47efdc33-a89e-4238-a859-62e1c911af97.jpg"}	+380976649532
997	The Premium Wine Cellar	2023-05-01 16:40:57	2023-05-01 16:40:57	Winery	{winery," tasty"}	uploads\\users\\47\\establishments_photo\\997\\0_1a59ab83-36c6-40c9-b82f-b7f2c9aba912.jpg	11:40:00	20:40:00	Pasuchna Street, 21, Lviv, Lviv Oblast, Ukraine	1500	f	t	f	47	{"uploads\\\\users\\\\47\\\\establishments_photo\\\\997\\\\0_1a59ab83-36c6-40c9-b82f-b7f2c9aba912.jpg","uploads\\\\users\\\\47\\\\establishments_photo\\\\997\\\\1_f954f36c-106b-478a-8763-1869540f3b3a.jpg"}	+380982497151
998	Grapes in Time Wine Cellar	2023-05-01 16:41:15	2023-05-01 16:41:15	Winery	{winery," tasty"}	uploads\\users\\47\\establishments_photo\\998\\0_dfd7f7b4-13f1-4eeb-8a3b-c76acdd1fe44.jpg	11:40:00	20:40:00	Pasuchna Street, 21, Lviv, Lviv Oblast, Ukraine	2500	f	t	f	47	{"uploads\\\\users\\\\47\\\\establishments_photo\\\\998\\\\0_dfd7f7b4-13f1-4eeb-8a3b-c76acdd1fe44.jpg","uploads\\\\users\\\\47\\\\establishments_photo\\\\998\\\\1_3042bd02-8410-4442-8dec-e5e8faf5c5c3.jpg"}	+380982497151
1001	Bar	2023-05-02 17:42:38	2023-05-02 17:42:38	Bar	{bar}	uploads\\users\\44\\establishments_photo\\1001\\0_4cf82b51-b317-448a-a543-12e10eb7c1a7.jpg	21:42:00	22:42:00	Lychakivska Street, 23, Lviv, Lviv Oblast, Ukraine	1500	f	t	f	44	{"uploads\\\\users\\\\44\\\\establishments_photo\\\\1001\\\\0_4cf82b51-b317-448a-a543-12e10eb7c1a7.jpg","uploads\\\\users\\\\44\\\\establishments_photo\\\\1001\\\\1_0205140d-73d5-4f08-832d-92d3bb4bc00c.jpg","uploads\\\\users\\\\44\\\\establishments_photo\\\\1001\\\\2_4b0e50de-3f1d-4eb9-bb24-ca3febf5b823.jpg"}	+380986649500
999	Disco Cosmo	2023-05-01 16:43:00	2023-05-01 16:43:00	Club	{club," cool"}	uploads\\users\\47\\establishments_photo\\999\\0_b0090086-7d1b-4a2a-b71b-4be5cc29f6ec.jpg	21:40:00	00:40:00	Sadova Street, 19, Lviv, Lviv Oblast, Ukraine	2500	f	t	f	47	{"uploads\\\\users\\\\47\\\\establishments_photo\\\\999\\\\0_b0090086-7d1b-4a2a-b71b-4be5cc29f6ec.jpg","uploads\\\\users\\\\47\\\\establishments_photo\\\\999\\\\1_0cbfc9f0-13ba-457d-a718-ec4abad20760.jpg"}	+380982497234
992	The Grape Cellar	2023-05-01 15:48:52	2023-05-01 16:10:25	Winery	{beer}	uploads\\users\\46\\establishments_photo\\992\\0_e4b54133-e281-4d35-b29d-4971f8220746.jpg	10:45:00	21:45:00	Pasichna Street, 21, Lviv, Lviv Oblast, Ukraine	2700	t	f	f	46	{"uploads\\\\users\\\\46\\\\establishments_photo\\\\992\\\\0_e4b54133-e281-4d35-b29d-4971f8220746.jpg","uploads\\\\users\\\\46\\\\establishments_photo\\\\992\\\\1_050b644c-0259-4a00-841a-88b88b43994c.jpg"}	+380976649532
993	Taste the Vines	2023-05-01 15:49:17	2023-05-01 16:10:25	Winery	{wine}	uploads\\users\\46\\establishments_photo\\993\\0_5b7ae53d-1bb1-44a9-b406-c7b2abcd1d41.jpg	10:45:00	21:45:00	Pasichna Street, 19, Lviv, Lviv Oblast, Ukraine	2000	t	f	f	46	{"uploads\\\\users\\\\46\\\\establishments_photo\\\\993\\\\0_5b7ae53d-1bb1-44a9-b406-c7b2abcd1d41.jpg","uploads\\\\users\\\\46\\\\establishments_photo\\\\993\\\\1_551b9544-cf0d-47a8-9a2a-9ca3a03db511.jpg"}	+380976649534
994	HookahBar	2023-05-01 16:03:39	2023-05-01 16:10:25	Hookah bar	{hookah}	uploads\\users\\46\\establishments_photo\\994\\0_6c12a840-eb63-4a98-a8cf-f3c718b3095a.jpg	08:03:00	21:03:00	Sadova Street, 19, Lviv, Lviv Oblast, Ukraine	2000	t	f	f	46	{"uploads\\\\users\\\\46\\\\establishments_photo\\\\994\\\\0_6c12a840-eb63-4a98-a8cf-f3c718b3095a.jpg","uploads\\\\users\\\\46\\\\establishments_photo\\\\994\\\\1_3a6842bc-8624-43c8-9eae-5f9b8e284105.jpg"}	+380986649532
995	BarBeer	2023-05-01 16:05:40	2023-05-01 16:10:26	Beer establishment	{beer," cool"}	uploads\\users\\47\\establishments_photo\\995\\0_ec3ce71a-3ca8-42df-8f74-3f09a6a6b477.jpg	13:04:00	22:05:00	Lychakivska Street, 78, Lviv, Lviv Oblast, Ukraine	1450	t	f	f	47	{"uploads\\\\users\\\\47\\\\establishments_photo\\\\995\\\\0_ec3ce71a-3ca8-42df-8f74-3f09a6a6b477.jpg","uploads\\\\users\\\\47\\\\establishments_photo\\\\995\\\\1_c3329d9d-48cf-4a8a-8dae-eb5459fce590.jpg"}	+380686649532
996	BarBeer	2023-05-01 16:05:52	2023-05-01 16:10:26	Beer establishment	{beer," cool"}	uploads\\users\\47\\establishments_photo\\996\\0_5dfbc42e-35a2-4127-b282-8dd2b4999bc5.jpg	13:04:00	22:05:00	Lychakivska Street, 78, Lviv, Lviv Oblast, Ukraine	1450	t	f	f	47	{"uploads\\\\users\\\\47\\\\establishments_photo\\\\996\\\\0_5dfbc42e-35a2-4127-b282-8dd2b4999bc5.jpg","uploads\\\\users\\\\47\\\\establishments_photo\\\\996\\\\1_de9d3435-3f5e-4ec7-9276-b71b60098a75.jpg"}	+380686649532
1000	BarBeer	2023-05-01 18:56:30	2023-05-01 18:56:31	Bar	{bar," cool"}	uploads\\users\\44\\establishments_photo\\1000\\0_a95d2138-81c3-43de-8ffe-9c32ac4a3475.jpg	17:56:00	00:56:00	Lychakivska Street, 23, Lviv, Lviv Oblast, Ukraine	1399	f	t	f	44	{"uploads\\\\users\\\\44\\\\establishments_photo\\\\1000\\\\0_a95d2138-81c3-43de-8ffe-9c32ac4a3475.jpg","uploads\\\\users\\\\44\\\\establishments_photo\\\\1000\\\\1_edb8e304-14b2-4f9f-95d6-5a12ad2bfe6e.jpg"}	+380982497151
986	Extreme Riders	2023-05-01 14:19:09	2023-05-02 17:41:44	Club	{club," extreme"}	uploads\\users\\44\\establishments_photo\\986\\0_2abf7b54-0c89-44e0-97b9-87ad907b7418.jpg	19:10:00	05:07:00	Toronto Street, 7, Lviv, Lviv Oblast, Ukraine	450	t	f	f	44	{"uploads\\\\users\\\\44\\\\establishments_photo\\\\986\\\\0_2abf7b54-0c89-44e0-97b9-87ad907b7418.jpg","uploads\\\\users\\\\44\\\\establishments_photo\\\\986\\\\1_98130d52-17a3-4124-a1f3-d4373f19f093.jpg","uploads\\\\users\\\\44\\\\establishments_photo\\\\986\\\\2_dec49626-8ad8-430b-ad7e-cdc2628bfeb1.webp"}	+380972495418
\.


--
-- TOC entry 3363 (class 0 OID 65602)
-- Dependencies: 219
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorites (favorite_id, user_id, establishment_id, created_at, updated_at) FROM stdin;
339	46	986	2023-05-01 16:00:52.801	2023-05-01 16:00:52.801
340	47	986	2023-05-01 16:39:40.506	2023-05-01 16:39:40.506
341	47	982	2023-05-01 16:39:41.532	2023-05-01 16:39:41.532
342	44	986	2023-05-01 16:45:42.181	2023-05-01 16:45:42.181
343	44	982	2023-05-01 16:45:43.207	2023-05-01 16:45:43.207
344	44	981	2023-05-01 16:45:44.225	2023-05-01 16:45:44.225
345	44	984	2023-05-01 16:45:45.02	2023-05-01 16:45:45.02
346	44	978	2023-05-01 16:45:46.914	2023-05-01 16:45:46.914
347	44	989	2023-05-01 16:45:47.891	2023-05-01 16:45:47.891
348	44	983	2023-05-01 16:46:00.201	2023-05-01 16:46:00.201
349	44	979	2023-05-01 16:46:01.726	2023-05-01 16:46:01.726
350	44	990	2023-05-01 16:46:02.771	2023-05-01 16:46:02.771
351	44	987	2023-05-01 16:46:03.775	2023-05-01 16:46:03.775
352	44	980	2023-05-01 16:46:05.277	2023-05-01 16:46:05.277
353	44	985	2023-05-01 16:46:06.222	2023-05-01 16:46:06.222
354	44	992	2023-05-01 16:46:55.891	2023-05-01 16:46:55.891
355	44	988	2023-05-01 16:46:57.899	2023-05-01 16:46:57.899
356	44	991	2023-05-01 16:46:58.968	2023-05-01 16:46:58.968
357	44	995	2023-05-01 18:35:50.054	2023-05-01 18:35:50.054
\.


--
-- TOC entry 3361 (class 0 OID 57408)
-- Dependencies: 217
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (review_id, text, "check", user_id, establishment_id, rating, created_at, updated_at) FROM stdin;
675	Cool	500	46	986	3.5	2023-05-01 15:51:10.318	2023-05-01 15:51:10.318
676	Nice place	700	46	986	3.5	2023-05-01 15:51:21.143	2023-05-01 15:51:21.143
677	So so	2000	47	982	3	2023-05-01 16:37:59.979	2023-05-01 16:37:59.979
678	So so	2000	47	982	3	2023-05-01 16:39:06.224	2023-05-01 16:39:06.224
679	Not bad	2000	47	982	3	2023-05-01 16:39:14.086	2023-05-01 16:39:14.086
680	bad	2000	47	982	1	2023-05-01 16:39:23.045	2023-05-01 16:39:23.045
681	bad	2000	47	982	1	2023-05-01 16:39:23.318	2023-05-01 16:39:23.318
682	bad	2000	47	982	1	2023-05-01 16:39:23.558	2023-05-01 16:39:23.558
683	bad	2000	47	982	1	2023-05-01 16:39:23.814	2023-05-01 16:39:23.814
684	Nice	2500	47	982	3.5	2023-05-01 16:39:32.806	2023-05-01 16:39:32.806
685	Nice	2500	47	982	3.5	2023-05-01 16:39:32.985	2023-05-01 16:39:32.985
686	Nice	2500	47	982	3.5	2023-05-01 16:39:33.182	2023-05-01 16:39:33.182
687	Nice	2500	47	982	3.5	2023-05-01 16:39:33.37	2023-05-01 16:39:33.37
688	Cool	500	44	986	4.5	2023-05-01 16:43:53.996	2023-05-01 16:43:53.996
698	Ok	3000	44	982	2.5	2023-05-01 16:44:28.136	2023-05-01 16:44:28.136
699	Cool	2000	44	981	5	2023-05-01 16:44:39.565	2023-05-01 16:44:39.565
700	Super	500	44	984	4	2023-05-01 16:44:50.122	2023-05-01 16:44:50.122
701	Ok	500	44	986	2.5	2023-05-01 16:45:05.191	2023-05-01 16:45:05.191
702	Ok	500	44	984	4	2023-05-01 16:45:25.845	2023-05-01 16:45:25.845
\.


--
-- TOC entry 3359 (class 0 OID 16461)
-- Dependencies: 215
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tokens (token_id, refresh_token, created_at, updated_at, user_id) FROM stdin;
15076	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODMwNDkyODgsImV4cCI6MTY4MzY1NDA4OH0.ekUKitc8iy0sXxHEJUzdNZxnmpH4hsOMxBsxZAeF4io	2023-05-02	2023-05-02	44
\.


--
-- TOC entry 3356 (class 0 OID 16431)
-- Dependencies: 212
-- Data for Name: type_establishments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type_establishments (type_id, title, created_at, updated_at) FROM stdin;
2	Restoraunt	\N	\N
3	Cafe	\N	\N
4	Bar	\N	\N
5	Beer establishment	\N	\N
6	Winery	\N	\N
7	Club	\N	\N
1	Hookah bar	\N	\N
\.


--
-- TOC entry 3365 (class 0 OID 65618)
-- Dependencies: 221
-- Data for Name: type_news; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type_news (type_news_id, type, created_at, updated_at) FROM stdin;
1	General	\N	\N
2	Sale	\N	\N
3	Event	\N	\N
\.


--
-- TOC entry 3358 (class 0 OID 16439)
-- Dependencies: 214
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, name, email, picture, admin, created_at, updated_at) FROM stdin;
44	Соня Рибська	sofaribska@gmail.com	https://lh3.googleusercontent.com/a/AGNmyxaly68vNaOKK6xsaH1ekNGj7N-fxj-2IufTof8_Lg=s96-c	t	2023-04-28 00:29:26.147	2023-04-28 00:29:26.147
47	София	sofaribska12@gmail.com	https://lh3.googleusercontent.com/a/AGNmyxZJsS0WVTH1qeiUBvqI4cCETBFxwauvBXsXB5bi=s96-c	f	2023-05-01 16:04:14.5	2023-05-01 16:04:14.5
46	Оксана	oksana.rybska@gmail.com	https://lh3.googleusercontent.com/a/AGNmyxba2qUQZOflD39MkBj5cBEy77Y7yhWEr7gokzZv=s96-c	f	2023-05-01 15:37:15.329	2023-05-01 18:29:18.978
\.


--
-- TOC entry 3375 (class 0 OID 0)
-- Dependencies: 209
-- Name: establishments_establishment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.establishments_establishment_id_seq', 1001, true);


--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 220
-- Name: favorites_favorite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favorites_favorite_id_seq', 357, true);


--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 218
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_review_id_seq', 703, true);


--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 216
-- Name: token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.token_id_seq', 15076, true);


--
-- TOC entry 3379 (class 0 OID 0)
-- Dependencies: 211
-- Name: type_establishments_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.type_establishments_type_id_seq', 1, true);


--
-- TOC entry 3380 (class 0 OID 0)
-- Dependencies: 213
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 47, true);


--
-- TOC entry 3200 (class 2606 OID 16428)
-- Name: establishments PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.establishments
    ADD CONSTRAINT "PRIMARY" PRIMARY KEY (establishment_id);


--
-- TOC entry 3203 (class 2606 OID 16437)
-- Name: type_establishments PRIMARY00000; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_establishments
    ADD CONSTRAINT "PRIMARY00000" PRIMARY KEY (type_id);


--
-- TOC entry 3205 (class 2606 OID 16445)
-- Name: users PRIMARY00001; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PRIMARY00001" PRIMARY KEY (user_id);


--
-- TOC entry 3211 (class 2606 OID 65606)
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (favorite_id);


--
-- TOC entry 3209 (class 2606 OID 57416)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);


--
-- TOC entry 3207 (class 2606 OID 16469)
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (token_id);


--
-- TOC entry 3213 (class 2606 OID 65624)
-- Name: type_news type_news_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_news
    ADD CONSTRAINT type_news_pkey PRIMARY KEY (type_news_id);


--
-- TOC entry 3201 (class 1259 OID 16429)
-- Name: establishment_id_UNIQUE; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "establishment_id_UNIQUE" ON public.establishments USING btree (establishment_id);


-- Completed on 2023-05-02 20:45:39

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7
-- Dumped by pg_dump version 14.7

-- Started on 2023-05-02 20:45:39

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 3304 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


-- Completed on 2023-05-02 20:45:39

--
-- PostgreSQL database dump complete
--

-- Completed on 2023-05-02 20:45:39

--
-- PostgreSQL database cluster dump complete
--

