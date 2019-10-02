# Nominatim

1. Đã tạo xong dockerfile up lên docker hub 
2. Đã tạo xong data up lên s3
3. Đã viết xong script download file S3 bỏ vào docker-entrypoint
4. Giờ phải test
docker run -p 7070:8080 --name nomimatim danghung/osm-nominatim

docker run -p 7070:8080 --name nomimatim -v /Users/hung/projects/smartlog/openst/nominatim-data:/home/nominatim/data danghung/osm-nominatim

5. Đã test xong, giờ phải viết yml để up lên k8s 