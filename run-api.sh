curl --silent localhost:3000/heroes
# "results":[{"id":"3015490a-ed5c-4f6c-b14b-843ea87601f7","name":"Bruce Wayne","age":50,"power":"rich"},{"id":"bc7039d4-8db9-490e-b606-a027dfeee29b","name":"Bruce Wayne","age":50,"power":"rich"},{"id":"b74f7f5c-1de7-49fb-910a-c406842de53e","name":"Bruce Wayne","age":50,"power":"rich"},{"id":"0a59fd5b-5f99-4e3d-9416-75c3ef4a703a","name":"Bruce Wayne","age":50,"power":"rich"},{"id":"f462e7c5-82c6-4ce7-9d46-58b61d9c289e","name":"Bruce Wayne","age":50,"power":"rich"}]

curl \
--silent -X POST \
-d '{"name": "Flash", "age": 29, "power": "speed"}' \
localhost:3000/heroes
# {"success":"User created with success!","id":"252ae8ad-fd41-4c0e-b835-2ebaffb0919c"}

curl \
--silent -X POST \
-d '{"invalid json payload"}' \
localhost:3000/heroes
# {"error":"internet server error!"}

curl \
-X PATCH \
-d '{ "id": "3015490a-ed5c-4f6c-b14b-843ea87601f7", "name": "Batman" }' \
localhost:3000/hero
# {"succes":"Hero altered with success!","id":"3015490a-ed5c-4f6c-b14b-843ea87601f7"}

