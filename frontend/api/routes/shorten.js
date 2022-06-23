var express = require("express");
var router = express.Router();
const request = require("request")
  
router.get('/', (req, res) => {
    request(
        { url: 'https://cutt.ly/api/api.php', qs: {key: req.query.key, short: req.query.short} },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json(error);
            }
            try {
                res.json(response);
            } catch (err) {
                console.log(err)
            }
        }
    )
});

module.exports = router;