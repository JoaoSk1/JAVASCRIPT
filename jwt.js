const jwt = require("jsonwebtoken")
const fs = require("fs")

const payload = { userId: 123, permissions: ["read", "write"] }

const privatekey = fs.readFileSync("./private_key.pem")

const publickey = fs.readFileSync("./public_key.pem")

token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywicGVybWlzc2lvbnMiOlsicmVhZCIsIndyaXRlIl0sImlhdCI6MTcxMTA2NzAyOH0.qKPndVEh6OYOGRRO07CttTk0KlsYkJUsvI0nNPm-cjdHzWNxn_HtTe0GWjTIvYP20z4StIqbRQowN_h2XPxns3GNMMmIY7NjCqXtvlDy2P8RJtaUXmJ0mD8qTrjHlSIycE_jL0ZZqT5oM7yi5KaTMHdQ0_rFSSRYVmJ0l_U4Rsa7qRXmepZiRxrnwhQ85OiXGYeanT0zReiu5mEQZNsJsk9Tk2OaQho0pRnSQgNZhRF7T8annJGiZz4q8AVDcbE9zI-o1nHIr7-J54OKfhDRweB8QPuRrAndEMVX-NV3QKR7vn03culHMdVsK-7f4T-_nAm4hN7S9JAH2bvlmg8U9A'

try {
    const decoded = jwt.verify(token, publickey, { algorithm: ["RS256"]});
    console.log("Decoded:", decoded)
}catch (err) {
    console.error("Verification failed:", err)
}

// const token = jwt.sign(payload, privatekey, { algorithm: "RS256"})

// console.log(token)