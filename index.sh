API_ENDPOINT="us-central1-aiplatform.googleapis.com"
PROJECT_ID="cobalt-concord-297418"
MODEL_ID="code-bison"

curl \
-X POST \
-H "Authorization: Bearer ya29.a0AfB_byC8v9dazSuE_PLna7r0x_eMPnH-u7op7X6THLnxdyu7GOSSwAze60FhpQMYou06KXYtKe3kpEVJISpD43iPUKdDigmP8PVpAqQU6Ic-k3vgUzCXNsBYDHls7mDD42MmsYqha-GXD5jkvN2lIkxZ6ASISHEEsWKBuU4NDD5dlC_GUuuvIdILSmTe60mxB5CflWp7rEXc4HV2lct6aFKBeAKTLowcOHrOVCSBi3lQzH0dhSe7taU7amfE0oWUiCaJkct0S5Hqpv7kK4ZzULNJRk4aYB7bwbGPDrgTNxapHuswSy3pqHdAo-jTzpQdBJxECxnLPKVjlrhHqskCTVVu27CIetmfFR6iok07bYxuZ6nGZmY8yHhKZ5BEfLeBSzMgFUmuER8WnE6t14webUPdGCQ3aCgYKAXsSARMSFQGOcNnC_Ks8AfPhphLHjye56dycIg0419" \
-H "Content-Type: application/json" \
"https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/${MODEL_ID}:predict" -d \
$'{
    "instances": [
        {
            "prefix": "explain cat family"
        }
    ],
    "parameters": {
        "candidateCount": 1,
        "maxOutputTokens": 1024,
        "temperature": 0.2
    }
}'

API_ENDPOINT="us-central1-aiplatform.googleapis.com"
PROJECT_ID="cobalt-concord-297418"
MODEL_ID="code-bison"

curl \
-X POST \
-H "Authorization: Bearer ya29.a0AfB_byC8v9dazSuE_PLna7r0x_eMPnH-u7op7X6THLnxdyu7GOSSwAze60FhpQMYou06KXYtKe3kpEVJISpD43iPUKdDigmP8PVpAqQU6Ic-k3vgUzCXNsBYDHls7mDD42MmsYqha-GXD5jkvN2lIkxZ6ASISHEEsWKBuU4NDD5dlC_GUuuvIdILSmTe60mxB5CflWp7rEXc4HV2lct6aFKBeAKTLowcOHrOVCSBi3lQzH0dhSe7taU7amfE0oWUiCaJkct0S5Hqpv7kK4ZzULNJRk4aYB7bwbGPDrgTNxapHuswSy3pqHdAo-jTzpQdBJxECxnLPKVjlrhHqskCTVVu27CIetmfFR6iok07bYxuZ6nGZmY8yHhKZ5BEfLeBSzMgFUmuER8WnE6t14webUPdGCQ3aCgYKAXsSARMSFQGOcNnC_Ks8AfPhphLHjye56dycIg0419" \
-H "Content-Type: application/json" \
"https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/${MODEL_ID}:predict" -d \
$'{
    "instances": [
        {
            "prefix": "explain the dog family"
        }
    ],
    "parameters": {
        "candidateCount": 1,
        "maxOutputTokens": 1024,
        "temperature": 0.2
    }
}'