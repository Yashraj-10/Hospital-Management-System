const axios = require('axios')

axios.get("http://127.0.0.1:5000/patient?doc_id=D2", {
    headers: {
        "Content-Type": "application/json",
      },

    data: {
    "access_token" : 'doceyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3Nzk3Nzc2MiwianRpIjoiMGJkZmNhOWEtYmY0Ny00M2IxLWExNjItYTgyMGM1OTQ1ZjVkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkQyIiwibmJmIjoxNjc3OTc3NzYyLCJleHAiOjE2Nzc5Nzg2NjJ9.NIof160XNnqZHyfJWdnixXK0vCmW_N3qA4exPpbvnD4'
      }
})
.then((res) => {
    console.log(res.data)
})
.catch((err) => {
    console.log(err)
})