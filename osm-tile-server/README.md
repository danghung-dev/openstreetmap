## How to run

1. Import data 
docker volume create openstreetmap-data
docker run     -v /Users/hung/projects/smartlog/openst/nominatim-data/vietnam-latest.osm.pbf:/data.osm.pbf     -v openstreetmap-data:/var/lib/postgresql/10/main     overv/openstreetmap-tile-server     import

2. Run 
docker volume create openstreetmap-rendered-tiles
docker run \
    -p 8084:80 \
    -v openstreetmap-data:/var/lib/postgresql/10/main \
    -v /Users/hung/projects/smartlog/openst/openstreetmap-tile-server/mod_tile:/var/lib/mod_tile \
    -d overv/openstreetmap-tile-server \
    run

## Error word around
docker exec -it <docker_id> /bin/bash
service postgresql start
sudo -u renderer renderd -f -c /usr/local/etc/renderd.conf

Nếu bị lỗi thì chạy lại thử, vì có thể postgres chưa mở lên kịp 

## Render all tiles 

1. Go into docker container & Install nano
sudo apt-get install nano
2. Create and Copy render_list_geo.pl
3. chmod +x render_list_geo.pl
4. Render all vietnam map tiles
./render_list_geo.pl -n 4 -m ajt -z 0 -Z 15 -x 101.095778 -X 110.451792 -y 7.896840 -Y 23.880332


## Deploy to k8s
1. Create pvc
kubectl apply -f deploy-create-pv.yml
2. Copy data to pvc
kubectl apply -f deploy-temp-pod-to-copy.yml
kubectl cp <mod-tile>.zip <pod-name>:/var/lib/mod_tile
kubectl exec -it <pod-name> /bin/bash
unzip <mod-tile>.zip
3. Delete temporary pod
kubectl delete -f deploy-temp-pod-to-copy.yml
4. Run
kubectl apply -f deploy.yml

