# Node server deploy

1. Build docker
docker build -t node-nominatim .
docker tag node-nominatim danghung/node-nominatim
docker push danghung/node-nominatim

2. Deploy to k8s
kubectl apply -f deploy.yml

kubectl patch deployment node-nominatim -p '{"spec":{"template":{"metadata":{"labels":{"date":"1569404789"}}}}}' -n openst
kubectl rollout status deployment node-nominatim -n openst