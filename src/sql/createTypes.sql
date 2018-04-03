CREATE TYPE auth.jwt_token AS (
  token text,
  role text,
  username text,
  exp integer
);
CREATE TYPE tax_filter AS (
    comparator text,
    pname text,
    taxname text,
    value text
);
CREATE TYPE pco_filter AS (
    comparator text,
    pname text,
    pcname text,
    value text
);
CREATE TYPE rco_filter AS (
    comparator text,
    pname text,
    pcname text,
    value text
);
CREATE TYPE pco_property AS (
    pname text,
    pcname text
);
CREATE TYPE rco_property AS (
    pname text,
    relationtype text,
    pcname text
);
-- for function alt_fields
CREATE TYPE ae.taxonomy_with_level1_count AS (
    taxonomy_id uuid,
    count bigint
);
-- for function alt_fields
CREATE TYPE ae.collection_type AS ENUM ('tax', 'pco', 'rco');
CREATE TYPE ae.collection_property AS (
    ctype ae.collection_type,
    cname text,
    property text,
    value text
);