select
    ae.taxonomy.name as taxonomy_name,
    ae.object.name as object_name,
    ae.property_collection_object.id as pc_id
from
    ae.object
    inner join ae.taxonomy
    on ae.object.taxonomy_id = ae.taxonomy.id
    inner join ae.property_collection_object
        inner join ae.property_collection
        on ae.property_collection_object.property_collection_id = ae.property_collection.id
    on ae.object.id = ae.property_collection_object.object_id
order by
    taxonomy_name,
    object_name

