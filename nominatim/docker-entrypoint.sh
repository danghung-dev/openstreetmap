#!/bin/bash

# Defaults
NOMINATIM_DATA_PATH=${NOMINATIM_DATA_PATH:="/nominatim-data"}
NOMINATIM_DATA_LABEL=${NOMINATIM_DATA_LABEL:="nominatim_data"}
NOMINATIM_PBF_URL=${NOMINATIM_PBF_URL:="http://download.geofabrik.de/asia/maldives-latest.osm.pbf"}
NOMINATIM_POSTGRESQL_DATA_PATH=${NOMINATIM_POSTGRESQL_DATA_PATH:="/var/lib/postgresql/11/main"}
# Google Storage variables
NOMINATIM_GS_BUCKET=${NOMINATIM_GS_BUCKET:=""}

# ========= Copy postgres data from S3 ========= 

# Copy the archive from storage
mkdir -p $NOMINATIM_DATA_PATH
#curl https://osm-nominatim.s3-ap-southeast-1.amazonaws.com/vn/nominatim_data.tgz_aa -o $NOMINATIM_DATA_PATH/nominatim_data.tgz_aa
#gsutil -m cp $NOMINATIM_GS_BUCKET/$NOMINATIM_DATA_LABEL/*.tgz* $NOMINATIM_DATA_PATH

# Remove any files present in the target directory
rm -rf $NOMINATIM_POSTGRESQL_DATA_PATH/*

# Extract the archive
echo "bat dau gia nen $NOMINATIM_DATA_PATH/$NOMINATIM_DATA_LABEL.tgz_* $NOMINATIM_POSTGRESQL_DATA_PATH "
#cat $NOMINATIM_DATA_PATH/$NOMINATIM_DATA_LABEL.tgz_* | tar xz -C $NOMINATIM_POSTGRESQL_DATA_PATH 
tar -xvf $NOMINATIM_DATA_PATH/nominatim_data.tgz_aa -C $NOMINATIM_POSTGRESQL_DATA_PATH/
mv $NOMINATIM_POSTGRESQL_DATA_PATH/postgresdata/* $NOMINATIM_POSTGRESQL_DATA_PATH/
chown -R postgres:postgres $NOMINATIM_POSTGRESQL_DATA_PATH
echo "ket thuc giai nen"
# ========= Copy postgres data from S3 =========

# ========== Start service =================
stopServices() {
        service apache2 stop
        service postgresql stop
}
trap stopServices TERM

service postgresql start
service apache2 start

# fork a process and wait for it
tail -f /var/log/postgresql/postgresql-11-main.log &
wait