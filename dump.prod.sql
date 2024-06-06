--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.3 (Debian 16.3-1.pgdg120+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: phones_lists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.phones_lists (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    storage_size integer,
    storage_type character varying(255),
    has_audio_jack boolean NOT NULL,
    has_wifi boolean NOT NULL,
    has_camera boolean NOT NULL,
    camera_quality integer,
    screen_size integer,
    has_touchscreen boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.phones_lists OWNER TO postgres;

--
-- Name: phones_lists_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.phones_lists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.phones_lists_id_seq OWNER TO postgres;

--
-- Name: phones_lists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.phones_lists_id_seq OWNED BY public.phones_lists.id;


--
-- Name: phones_lists id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phones_lists ALTER COLUMN id SET DEFAULT nextval('public.phones_lists_id_seq'::regclass);


--
-- Data for Name: phones_lists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.phones_lists (id, name, storage_size, storage_type, has_audio_jack, has_wifi, has_camera, camera_quality, screen_size, has_touchscreen, "createdAt", "updatedAt") FROM stdin;
1	iphone 6se	64	gb	t	t	t	6	9	t	2024-06-04 23:09:23.569+00	2024-06-04 23:09:23.569+00
4	iphone 15 Pro Max	1024	gb	f	t	t	15	12	t	2024-06-04 23:35:25.696+00	2024-06-04 23:38:04.535+00
6	Samsung Galaxy S11	256	GB	t	t	t	12	7	t	2024-06-05 12:28:01.164+00	2024-06-05 12:43:50.436+00
7	Samsung Galaxy S10	128	GB	t	t	t	12	6	t	2024-06-05 13:51:13.17+00	2024-06-05 13:51:13.17+00
3	iPhone 15	256	gb	f	t	t	15	12	t	2024-06-04 23:32:16.233+00	2024-06-05 15:57:20.026+00
\.


--
-- Name: phones_lists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.phones_lists_id_seq', 8, true);


--
-- Name: phones_lists phones_lists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phones_lists
    ADD CONSTRAINT phones_lists_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--