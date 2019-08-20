## osrm kubernetes
1. Create pvc, create docker image to keep osrm live
danghung/openst:osrm-prepare
```
FROM osrm/osrm-backend

CMD tail -f /dev/null
```
2. Copy data to pvc
```
# copy pbf file
kubectl cp /Users/hung/projects/docker/osrm/vietnam-latest.osm.pbf osrm-prepare-data-649b48446f-rzrb4:/data

# copy profiles folder (also lib)
kubectl cp /Users/hung/projects/docker/osrm/profiles osrm-prepare-data-649b48446f-rzrb4:/data/
```
4. Go into osrm pod
```
kubectl exec -it <pod-name> /bin/bash
cd /data
osrm-extract -p profiles/car.lua vietnam-latest.osm.pbf
osrm-partition vietnam-latest.osm
osrm-customize vietnam-latest.osm
```

5. Start service by kubectl apply -f

```
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: osrm-api
  namespace: openst
spec:
  replicas: 1
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 25%
  template:
    metadata:
      labels:
        app: osrm-api
    spec:
      containers:
        - name: osrm-api
          image: osrm/osrm-backend
          imagePullPolicy: Always
          ports:
            - containerPort: 5000
          command:
            - /bin/sh
            - -c
            - osrm-routed --algorithm mld /data/vietnam-latest.osm
          volumeMounts:
            - mountPath: /data
              name: osrm
      volumes:
        - name: osrm
          persistentVolumeClaim:
            claimName: osrm-pv-claim
---
apiVersion: v1
kind: Service
metadata:
  name: osrm-api
  labels:
    app: osrm-api
spec:
  selector:
    app: osrm-api
  ports:
    - port: 5000
      protocol: TCP
      targetPort: 5000
  type: ClusterIP
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: osrm-api
  annotations:
    kubernetes.io/ingress.class: "traefik"
spec:
  rules:
    - host: openst.danghung.xyz
      http:
        paths:
          - path: /
            backend:
              serviceName: osrm-api
              servicePort: 5000

```