export default {
    clientUrl: "http://localhost:3000",
    host: "localhost",
    port: 5000,
    dbUri: "mongodb+srv://mongo:123QWEasd!@cluster0.nxmbp.mongodb.net/todos_graphql",
    saltWorkFactor: 10,
    accessTokenTtl: "15m",
    refreshTokenTtl: "30d",
    cookieAccessTokenTtl: 1000 * 60 * 60 * 24 * 30, //30 days
    cookieRefreshTokenTtl: 1000 * 60 * 60 * 24 * 30, // 30 days
    accessTokenPublicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC2JFne28clDjE+o9du8OMdJluT
1+VbxmvShPt2AeHRnX+oRrbpddM3FJJgunk6Jkw/iAUUkWTbGDf5Oy1JL9nxbp1S
JQvBZTdZ2xPSw4plLU6Ar15UUY6m3qxqyWQJZzCShPgKJggactJoJnvSDwPls2zu
9CZtycy+bNpkYW5TBwIDAQAB
-----END PUBLIC KEY-----`,
    accessTokenPrivateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQC2JFne28clDjE+o9du8OMdJluT1+VbxmvShPt2AeHRnX+oRrbp
ddM3FJJgunk6Jkw/iAUUkWTbGDf5Oy1JL9nxbp1SJQvBZTdZ2xPSw4plLU6Ar15U
UY6m3qxqyWQJZzCShPgKJggactJoJnvSDwPls2zu9CZtycy+bNpkYW5TBwIDAQAB
AoGBAIeVnbSwo5io7O11Jzw1YsrjL85pKxnbJY4rYcihdAkGle2c3jIBfH4G+UO5
693mfmHYjfeWl54kdB459+cAENpMS7+B4baJHdENh3nDVJv427m8lXkUz18xcnX1
n4K9PajCYvL5JhUvZ/oPGppv88gj51+NEk9PW1sILrRds44xAkEA+LCY2Bfamivx
Xjbq6PpcIVy065hXTLmtUET1F2kALbf8Pcd8vfxFBR8zbPZJZfgnR4ilY0Tkuc5U
mfNdF/nnrwJBALt++nSnfttEnZyc48RXu7DKoXEhEjur3EwNFxUFDTgaxvbbY3kY
WOcFjtmvdsC+FIOKI08pb1HmKvYGhBNxSCkCQQC3DcZzyZsvQIk6QFJJi3+lTwgd
ItWftEzOePOvd6qZ/IO/NcesULS9QGoqGl+Mn0zKatrSZzO1URsU9v3fWCQhAkBn
K6HpWtlFEmaf7Pyv547R404ekBIWX6Ui+/j9igASJTniUCpWUf1pcfd+9TwlJvLm
xrZTMvucV0jAhCldAXKxAkAsirK63p4cOOw2XltInb2cD0w56hYleeAu5ADryR2b
S+IhQKba6UYMejNAV6PpyrcX9bpg7b3/mMxQ1qyPZ4GX
-----END RSA PRIVATE KEY-----`,
    refreshTokenPublicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCCyBSFj/THlA7r/iyoWhzFTtP/
GsQgqHoCz2WWlxMllbWZrFeeTzNAlzyR1zaIO/ceSBB8tHJAH82cea1GXpfcuUfw
2u+iECKOwwbbOpJk+YHia/3erkdRkjDzayFqzyew4MErCo7uMD7c+XHlWPKxow4U
G9vLlAaOhistHcpM9wIDAQAB
-----END PUBLIC KEY-----`,
    refreshTokenPrivateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQCCyBSFj/THlA7r/iyoWhzFTtP/GsQgqHoCz2WWlxMllbWZrFee
TzNAlzyR1zaIO/ceSBB8tHJAH82cea1GXpfcuUfw2u+iECKOwwbbOpJk+YHia/3e
rkdRkjDzayFqzyew4MErCo7uMD7c+XHlWPKxow4UG9vLlAaOhistHcpM9wIDAQAB
AoGAItqj7XySJeZlm6tfx3ZMmKELir9dab681abkUh/tMGUXwt7VcxF0fVBRCiUr
GV+x2lYmXrXQhRp0t7EN5uUq33kqsMpvpvHVkxyu88uwPyytzWge6nNPHrFmfWvk
eHUMraJUsSNRnxRKDSjsdxdODckYtJsG9nOa3nI55CMn5cECQQDwYaHy5EsDDoag
/WEvH5DcHSFg/Sz4aLjayu2lgaepOu/gGi3u2RNR8gFvbo2JtUoNXlAwz5JZZ+N6
tvSTfESHAkEAi0dtK97hL8dNi4IY428m01x0+VnUeUEXhYSVyVk6OqIcNpXght8f
lPgW20b4bMHM6BxR3GWjoX4v99aBdVhAEQJACkYR9uCc+B95z42kxq/RsCaqk4ue
jWtkYy2DJKy67revIuPbjLbIZZszRoDyGa2e4Z1jTgLBHYMcLNV+9IK+JwJADETN
dBjdA0VuKkTahmZLKEEzuKdWFRxLwyIrw6HNhE61Z4WKUrci5A96i/RTe9kSgLvF
5kE5yccA2LcXjkuo0QJAaixSUDNBzZHmRyEFKM45+WIMLrPQ7LYpVHsGjl5fNiVF
OJrSGBz6DMh7yLXKglaFIvjmNsA3SP806RckUJ5HaA==
-----END RSA PRIVATE KEY-----`,
}