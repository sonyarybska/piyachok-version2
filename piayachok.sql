PGDMP         .                {           PiyachokWeb    14.7    14.7 ,    (           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            )           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            *           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            +           1262    16420    PiyachokWeb    DATABASE     k   CREATE DATABASE "PiyachokWeb" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Ukraine.1251';
    DROP DATABASE "PiyachokWeb";
                postgres    false            �            1259    16421 #   establishments_establishment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.establishments_establishment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.establishments_establishment_id_seq;
       public          postgres    false            �            1259    16422    establishments    TABLE     �  CREATE TABLE public.establishments (
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
 "   DROP TABLE public.establishments;
       public         heap    postgres    false    209            �            1259    65602 	   favorites    TABLE     �   CREATE TABLE public.favorites (
    favorite_id integer NOT NULL,
    user_id integer,
    establishment_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
    DROP TABLE public.favorites;
       public         heap    postgres    false            �            1259    65607    favorites_favorite_id_seq    SEQUENCE     �   CREATE SEQUENCE public.favorites_favorite_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.favorites_favorite_id_seq;
       public          postgres    false    219            ,           0    0    favorites_favorite_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.favorites_favorite_id_seq OWNED BY public.favorites.favorite_id;
          public          postgres    false    220            �            1259    57408    reviews    TABLE       CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    text character varying(150),
    "check" integer,
    user_id integer,
    establishment_id integer,
    rating double precision,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
    DROP TABLE public.reviews;
       public         heap    postgres    false            �            1259    57417    reviews_review_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.reviews_review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.reviews_review_id_seq;
       public          postgres    false    217            -           0    0    reviews_review_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;
          public          postgres    false    218            �            1259    16476    token_id_seq    SEQUENCE     u   CREATE SEQUENCE public.token_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.token_id_seq;
       public          postgres    false            �            1259    16461    tokens    TABLE     �   CREATE TABLE public.tokens (
    token_id integer DEFAULT nextval('public.token_id_seq'::regclass) NOT NULL,
    refresh_token character varying,
    created_at date,
    updated_at date,
    user_id integer
);
    DROP TABLE public.tokens;
       public         heap    postgres    false    216            �            1259    16431    type_establishments    TABLE     �   CREATE TABLE public.type_establishments (
    type_id integer NOT NULL,
    title character varying(255),
    created_at date,
    updated_at date
);
 '   DROP TABLE public.type_establishments;
       public         heap    postgres    false            �            1259    16430    type_establishments_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.type_establishments_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.type_establishments_type_id_seq;
       public          postgres    false    212            .           0    0    type_establishments_type_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.type_establishments_type_id_seq OWNED BY public.type_establishments.type_id;
          public          postgres    false    211            �            1259    65618 	   type_news    TABLE     �   CREATE TABLE public.type_news (
    type_news_id integer NOT NULL,
    type character varying,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);
    DROP TABLE public.type_news;
       public         heap    postgres    false            �            1259    16438    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false            �            1259    16439    users    TABLE     B  CREATE TABLE public.users (
    user_id integer DEFAULT nextval('public.users_user_id_seq'::regclass) NOT NULL,
    name character varying(50),
    email character varying(45),
    picture character varying(200),
    admin boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false    213            ~           2604    65608    favorites favorite_id    DEFAULT     ~   ALTER TABLE ONLY public.favorites ALTER COLUMN favorite_id SET DEFAULT nextval('public.favorites_favorite_id_seq'::regclass);
 D   ALTER TABLE public.favorites ALTER COLUMN favorite_id DROP DEFAULT;
       public          postgres    false    220    219            }           2604    57418    reviews review_id    DEFAULT     v   ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);
 @   ALTER TABLE public.reviews ALTER COLUMN review_id DROP DEFAULT;
       public          postgres    false    218    217            z           2604    16434    type_establishments type_id    DEFAULT     �   ALTER TABLE ONLY public.type_establishments ALTER COLUMN type_id SET DEFAULT nextval('public.type_establishments_type_id_seq'::regclass);
 J   ALTER TABLE public.type_establishments ALTER COLUMN type_id DROP DEFAULT;
       public          postgres    false    212    211    212                      0    16422    establishments 
   TABLE DATA           �   COPY public.establishments (establishment_id, title, created_at, updated_at, type, tags, avatar, start_work, end_work, location, average_check, approved, pending, rejected, user_id, photos, phone) FROM stdin;
    public          postgres    false    210   �4       #          0    65602 	   favorites 
   TABLE DATA           c   COPY public.favorites (favorite_id, user_id, establishment_id, created_at, updated_at) FROM stdin;
    public          postgres    false    219   �?       !          0    57408    reviews 
   TABLE DATA           v   COPY public.reviews (review_id, text, "check", user_id, establishment_id, rating, created_at, updated_at) FROM stdin;
    public          postgres    false    217   �@                 0    16461    tokens 
   TABLE DATA           Z   COPY public.tokens (token_id, refresh_token, created_at, updated_at, user_id) FROM stdin;
    public          postgres    false    215   B                 0    16431    type_establishments 
   TABLE DATA           U   COPY public.type_establishments (type_id, title, created_at, updated_at) FROM stdin;
    public          postgres    false    212   �B       %          0    65618 	   type_news 
   TABLE DATA           O   COPY public.type_news (type_news_id, type, created_at, updated_at) FROM stdin;
    public          postgres    false    221   C                 0    16439    users 
   TABLE DATA           ]   COPY public.users (user_id, name, email, picture, admin, created_at, updated_at) FROM stdin;
    public          postgres    false    214   VC       /           0    0 #   establishments_establishment_id_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.establishments_establishment_id_seq', 1000, true);
          public          postgres    false    209            0           0    0    favorites_favorite_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.favorites_favorite_id_seq', 357, true);
          public          postgres    false    220            1           0    0    reviews_review_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.reviews_review_id_seq', 703, true);
          public          postgres    false    218            2           0    0    token_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.token_id_seq', 15073, true);
          public          postgres    false    216            3           0    0    type_establishments_type_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.type_establishments_type_id_seq', 1, true);
          public          postgres    false    211            4           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 47, true);
          public          postgres    false    213            �           2606    16428    establishments PRIMARY 
   CONSTRAINT     d   ALTER TABLE ONLY public.establishments
    ADD CONSTRAINT "PRIMARY" PRIMARY KEY (establishment_id);
 B   ALTER TABLE ONLY public.establishments DROP CONSTRAINT "PRIMARY";
       public            postgres    false    210            �           2606    16437     type_establishments PRIMARY00000 
   CONSTRAINT     e   ALTER TABLE ONLY public.type_establishments
    ADD CONSTRAINT "PRIMARY00000" PRIMARY KEY (type_id);
 L   ALTER TABLE ONLY public.type_establishments DROP CONSTRAINT "PRIMARY00000";
       public            postgres    false    212            �           2606    16445    users PRIMARY00001 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PRIMARY00001" PRIMARY KEY (user_id);
 >   ALTER TABLE ONLY public.users DROP CONSTRAINT "PRIMARY00001";
       public            postgres    false    214            �           2606    65606    favorites favorites_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (favorite_id);
 B   ALTER TABLE ONLY public.favorites DROP CONSTRAINT favorites_pkey;
       public            postgres    false    219            �           2606    57416    reviews reviews_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);
 >   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
       public            postgres    false    217            �           2606    16469    tokens tokens_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (token_id);
 <   ALTER TABLE ONLY public.tokens DROP CONSTRAINT tokens_pkey;
       public            postgres    false    215            �           2606    65624    type_news type_news_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.type_news
    ADD CONSTRAINT type_news_pkey PRIMARY KEY (type_news_id);
 B   ALTER TABLE ONLY public.type_news DROP CONSTRAINT type_news_pkey;
       public            postgres    false    221            �           1259    16429    establishment_id_UNIQUE    INDEX     g   CREATE UNIQUE INDEX "establishment_id_UNIQUE" ON public.establishments USING btree (establishment_id);
 -   DROP INDEX public."establishment_id_UNIQUE";
       public            postgres    false    210               �
  x��ZKo�<��Kq����[�,��1�N�"@��kI4H�����ꙑl�H-9T���<�������L�ÿo6�,~Z��v�KŸf\,-�_r?�Gn�M���6v_~�z�(�3^���~�\��=;���iggDgge{��j{qU�o��.�7�3���?�2�g.�c�eQX�$I"k��>����/J|�y����v�a�Y_߬�1x�y���?~^}~.�/�w��qVץ#ͻ���Q���}�����+w,���_��?�8�ܸ�(3�`�f�h�W���?�<�����Y9�$�I���i�%\N����b��R��'�ބ�������n�c�DU�)*I�̝d�X�0���%_�	�:ף�͈��#��C^��
�$���a����<V9��R�dEf�$�(���$�<ɐ-���x�(�\VC���l��ѕ�6(�xp���1��ݻp\�Ҕ@�H-%�'Ч�GI"� I΋,���Ĉ�\��e�_t����N!�|��D��<^1�Hk��t��B�Q�^�5���1���u���/�o׵�2�.�zpO/_*׽�@���Px��"���R/��D�]`�(p2�g�pń2���toP;v���?��xdiT����,�V.H�dXM6@�,1g�g%O�Ή�:�<�=%��d�<#
<GVc�l�1��Ao�B�޺��_׫	s�[��0}ZQ����c�Xİ�^�׍8���mź���<&_s�JF6av�!�O
��l⸑/����K�W���ɂTO�G�̝V�1u�CuE��$�Ԑ�X�%���x�I�LQrr��o%~:ey�&����I��!˼�i����9N_�Lԇs���>\����6�f��2�2��H����Mc�v@�e�ӑ��AKWm����H��{ŭ�х�tCK��QO���t����A�>S���l����Ԝ-̼�8$�$/u�.4du���2/�#E<
NCܼ}"~���T���P��������4�9�<�֠�*j��Y�8]Z���<N=��|)���D�
^�ѳ�J��ʃ+���������h�n'_��j=��ܭ���s���I�kp�!	��{����?���j/4;��n6���;�����܃랉.���VKhB@��u!S�s�$��8���Y� ^0��@�����8S�XO�j����<P{�i=���z�qj���6��@�lf��z�}��jf�5C�s	A��ߤjs��s��&�����t�{��	�|����gv�Q�C�m#A3�#�f$���*LPE'�	���Bd��`�d��=�#=�
Z���:wx����7�mZ��L�&���#��S�Y���GJ���>���L��"&�9t_\� �t��I(���t@q���xsh�3�@��2ƐubF�xd>� �'*�Z��!h$ϻ7�lo���	z��P�m!I�GT�}���S�S߷_�j�R��F	�7FXvYy��T��S1^�����ه�yr���I-y���"�m1� ����&��	�S� ��:�2��"���M���v׎��Z�i.lv�Nvf�$�6A�+N5$fm#��������hJ���~^��yu<�ƻSש0=�����b�{<D]��ST�y�8��p�U���Qk>���At��`�Gf�>�Kˑo\+W�ORr�T�] 5l*J��ehի�Z���T(�Xh�3�c����90ۢ��C�n0h(}P��Gr�(���\��v*�hW�DW?���{�UG-����O1�&�6���%��������O�q��g*️K�Ԝ�6��Z���gF���z�x��	/8�vR�m����j�3���-:�$�a��麽��>���}���k���e���A�UX�Ct
�#����YD�a(2�7СQ�E{X����F�Ŵڣ�&�c���B|h�� >dq^��+F`��1���,�p��UE��^��m>��bu����*O�,��w�{�{��5�j�C��X��5�"CL	)gt�gBY>ʣFZ�L�G�FK�1s'j9�W�$Vtq5T�tڧѾ�k*�O۫�B5L��{v��%�'�r�^�Ț 7� ��E�$}5�?%�%y�9�C�8��x���Кg�9�c�bM�r�&��0�]8VA����GxJE�S��ܯ�]kU��Oȝ}�n��k�Cw���I��$��}�>�F��$�&�'��j�|N�8w��V=�ӎ��\�h�������
-v	i�v���Vu������_���귲�³i�qx��:�P��LĈ�!��H�@��l�Md���G����qh�3��!���X�\��1ߴ���r�B���-л3��ζ���!s������쏽M28�DӶ�}s{����%*�u�?�T#�|FX}4�S�Ck���xꭂqh��9�oe'�YBa���h�;�g�W�n���)�X���ٰ4{�ͼF��W�T*r��H2#8TKLU�	&�ΥФ��B��XѺ?8V��*��n:�CZ��n:�C!�@ћ�7�Ph8��׾������|����&�����(�\c"Y��A"����k/�H01��/x�7-|&�㛊���}[U]�{�yiM���V?5مo{�t���{b�n
O�w��؟�{��@�v"A�T.�}-�JX<EvԶQ�;\�y ������q�>��Y[NwÈ󒡻5LPq�����S�);����/^���6      #     x�u�ّ!E��(&�G!�[,/�8��v����S� 
���r�V.B���O.q(A�|�/���}�⑛�]� �A��M�K$�*:� ����Tv�]��0�7U\��鉛��JQ�h��X�X[�(�sTprS���A�B��3&7����Ƚ{��M]���o]-��Ҷ��+N�c!�5�:���޶g�ȶ��M}n)�@5*9���-EՋ-~[���-� �-gqS�[�N�"����wn�_SX�A/Q��M�k�����PT9���/����      !   J  x���;n�0��:�/B$E���鐵K�f(�E�/� �c[��?�����Sߟ@�����
�Y6^7�:ҪTɣPnuS�����}���#�R�V7-���{[q��I��c�T�`I����k�R}D������?����D����]��
�W�����Je��F�^��.+�M��J��	_�)�r�u4^\�0f�0�k7H�C%7�Aq-$H�[���C�٘<z����L	RU��逆�b����o��|΄�If̭S���"X`���fw�?�������X��Ė�G�錇n�5��zE*��9tS�NY؉VV̳�9t��ι?W�C         �   x�M��
�0 �s{es��5����(N&RV8%SB���u��8���*�˱���7 ��c��|&S�b�~�T��f}�ep�X�z�G�~Q�5���*�U��i�����R�8��%��,�c���F%�w�>w������?C'!��5/�         ]   x�3�J-.�/J,�+��".cN�ĴT(Ǆ�)��6�tJM-R �OL��,��M��1���K-��r�9�sJ��CN������$�I1z\\\ |!�      %   ,   x�3�tO�K-J���".#��ĜT(ǘӵ,5�ʋ���� 9��         P  x���ON�@��u{
.�?3�v�&&ZE@�����M[J�N��;�&���pgH��		Mp���}�'/B�`�l].*�}��r^��[r4�HhH��1	"щ��0M�)I�P�8�#wF�ĉ'�;I��Nj���IThzf�V���ԁڵ�/	�1�ڱ�?\�G���K9(CE�� ��,��0�&�����iK/_�W���� o������vLݠce�rN�m�<"���ў����۩TA��22��+�4���U9gK�ޔ�CJ&DL����v��-/:S�����U-0��Ű[M����l/V5lUT��g׷i�.X��E�� Z��     